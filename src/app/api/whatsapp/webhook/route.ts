import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET handler: Meta Webhook Subscription Handshake Verification
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN || "agentsapp_bot_verify_token";

  if (mode && token) {
    if (mode === "subscribe" && token === verifyToken) {
      console.log("WhatsApp Webhook Handshake verified successfully.");
      return new NextResponse(challenge, { status: 200 });
    } else {
      return new NextResponse("Forbidden", { status: 403 });
    }
  }
  return new NextResponse("Bad Request", { status: 400 });
}

// POST handler: Receives incoming chat prompts from brokers
export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    console.log("WhatsApp Webhook Payload Received:", JSON.stringify(payload));

    const entry = payload.entry?.[0];
    const change = entry?.changes?.[0]?.value;
    const message = change?.messages?.[0];

    if (!message) {
      return NextResponse.json({ status: "ignored" });
    }

    const fromPhoneRaw = message.from; // e.g., "919876543210"
    const textBody = message.text?.body?.trim();

    if (!textBody) {
      return NextResponse.json({ status: "ignored" });
    }

    // Format phone number to match the database profile representation: "+91 98765 43210"
    const last10Digits = fromPhoneRaw.slice(-10);
    const formattedPhone = `+91 ${last10Digits.slice(0, 5)} ${last10Digits.slice(5)}`;

    // Query profiles in database to identify the broker
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("phone", formattedPhone)
      .single();

    if (!profile) {
      console.log(`No registered broker profile found for: ${formattedPhone}`);
      return NextResponse.json({ status: "error", message: "User phone not registered" });
    }

    const lowerText = textBody.toLowerCase();
    
    // Command 1: Add Lead
    // Example format: "Add lead Amit Kumar phone 9912345678 budget 1.8cr location Kokapet"
    if (lowerText.startsWith("add lead") || lowerText.includes("add lead")) {
      const nameMatch = textBody.match(/add\s+lead\s+([a-zA-Z\s]+)/i);
      const phoneMatch = textBody.match(/phone\s+([\d\s]+)/i);
      const budgetMatch = textBody.match(/budget\s+([^\s]+)/i);
      const locMatch = textBody.match(/location\s+([a-zA-Z\s]+)/i);

      const leadName = nameMatch?.[1]?.replace(/(phone|budget|location).*/i, "")?.trim() || "New Lead";
      const leadPhone = phoneMatch?.[1]?.replace(/\s+/g, "") || "9876500000";
      const leadBudget = budgetMatch?.[1] || "₹1.50 Cr";
      const leadLoc = locMatch?.[1]?.trim() || "Kokapet";

      // Insert lead into Supabase
      const { data: newLead, error } = await supabase
        .from("leads")
        .insert([{
          agent_id: profile.id,
          name: leadName,
          phone: leadPhone,
          status: "new",
          requirement: "3 BHK",
          location: leadLoc,
          budget: leadBudget,
          details: {
            propertyType: "Apartment",
            aiScore: 85,
            lastInteraction: "WhatsApp bot logged"
          }
        }])
        .select()
        .single();

      if (error) {
        console.error("Failed to insert lead via WhatsApp bot:", error);
      } else {
        console.log("Successfully logged lead via WhatsApp bot:", newLead);
      }
    } 
    // Command 2: Reminders/Follow-ups
    // Example format: "Remind me to call Ramesh time Tomorrow, 5:00 PM"
    else if (lowerText.startsWith("remind") || lowerText.includes("remind")) {
      const match = textBody.match(/remind\s+(?:me\s+to\s+)?([a-zA-Z0-9\s,.-]+)\s+time\s+(.*)/i);
      const title = match?.[1]?.trim() || "WhatsApp Follow-up Task";
      const scheduledTime = match?.[2]?.trim() || "Today, 6:00 PM";

      // Find if there is a matching lead to link
      const { data: matchingLeads } = await supabase
        .from("leads")
        .select("id")
        .eq("agent_id", profile.id)
        .limit(1);

      const leadId = matchingLeads && matchingLeads.length > 0 ? matchingLeads[0].id : null;

      // Insert reminder in Supabase
      const { data: newReminder, error } = await supabase
        .from("reminders")
        .insert([{
          agent_id: profile.id,
          lead_id: leadId,
          title: title,
          scheduled_time: scheduledTime,
          is_completed: false,
          priority: "high"
        }])
        .select()
        .single();

      if (error) {
        console.error("Failed to insert reminder via WhatsApp bot:", error);
      } else {
        console.log("Successfully logged reminder via WhatsApp bot:", newReminder);
      }
    }

    return NextResponse.json({ status: "success", parsed: textBody });
  } catch (err: any) {
    console.error("Error processing WhatsApp POST Webhook:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
