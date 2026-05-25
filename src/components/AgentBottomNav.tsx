"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, Users, Briefcase, Calendar, 
  Award, User, MessageSquare, X 
} from "lucide-react";
import { useState } from "react";

export default function AgentBottomNav() {
  const pathname = usePathname();
  const [showBotModal, setShowBotModal] = useState(false);
  const [chatHistory, setChatHistory] = useState<string[]>([
    "🤖 Bot: Welcome Sreenivas! How can I help you today? You can write in natural English or Hinglish.",
  ]);
  const [chatInput, setChatInput] = useState("");

  const menuItems = [
    { name: "Home", href: "/agent/dashboard", icon: Home },
    { name: "Leads", href: "/agent/pipeline", icon: Users },
    { name: "Inventory", href: "/agent/inventory", icon: Briefcase },
    { name: "Events", href: "/agent/launches", icon: Calendar },
    { name: "Rewards", href: "/agent/rewards", icon: Award },
    { name: "Profile", href: "/agent/profile", icon: User },
  ];

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput) return;

    const userMsg = `👤 You: ${chatInput}`;
    let botReply = "🤖 Bot: I didn't catch that command. Type 'help' to see what I can do.";

    const inputLower = chatInput.toLowerCase();
    if (inputLower.includes("add lead") || inputLower.includes("add ramesh")) {
      botReply = "🤖 Bot: ✅ Lead Ravi created! I parsed: Name = Ravi, requirement = 3 BHK. Scheduled follow-up nudge.";
    } else if (inputLower.includes("show plots") || inputLower.includes("inventory")) {
      botReply = "🤖 Bot: 🔍 Match found: Skyline Heights, Kokapet (12 units available starting at ₹1.82 Cr).";
    } else if (inputLower.includes("remind") || inputLower.includes("tomorrow")) {
      botReply = "🤖 Bot: ⏰ Reminder set! Scheduled Celery task on Monday 5:00 PM.";
    } else if (inputLower.includes("help") || inputLower.includes("command")) {
      botReply = "🤖 Bot: Try writing:\n- Add lead Ravi looking for 3BHK\n- Show plots in Gachibowli\n- Remind me tomorrow 5pm about Ravi";
    }

    setChatHistory([...chatHistory, userMsg, botReply]);
    setChatInput("");
  };

  return (
    <>
      {/* Bottom Nav Bar - Mobile Only */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200/90 py-2 px-3 flex justify-around items-center shadow-lg">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex flex-col items-center space-y-1 text-[#64748b] hover:text-[#16c47f] transition ${
                isActive ? "text-[#25d366]" : ""
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="text-[9px] font-bold tracking-tight">{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Floating WhatsApp Action Button */}
      <button 
        onClick={() => setShowBotModal(true)}
        className="fixed bottom-16 lg:bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[#25d366] hover:bg-[#16c47f] text-white flex items-center justify-center shadow-xl shadow-[#25d366]/35 transition animate-bounce"
        style={{ animationDuration: "5s" }}
        title="Open WhatsApp Chat Simulator"
      >
        <MessageSquare className="w-5 h-5" />
      </button>

      {/* WhatsApp Chat Simulation Modal */}
      {showBotModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm glass-panel rounded-2xl border border-slate-200 shadow-2xl overflow-hidden relative flex flex-col h-[450px] animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-[#075e54] text-white px-4 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-full bg-[#128c7e] flex items-center justify-center font-bold text-xs">
                  WA
                </div>
                <div>
                  <div className="font-bold text-xs">agentsapp Bot</div>
                  <div className="text-[8px] text-[#4ade80]">online · GallaBox API</div>
                </div>
              </div>
              <button 
                onClick={() => setShowBotModal(false)}
                className="text-slate-200 hover:text-white p-1 hover:bg-[#128c7e] rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-3 overflow-y-auto bg-[#efeae2] text-[10px] space-y-2">
              {chatHistory.map((msg, i) => {
                const isBot = msg.startsWith("🤖");
                return (
                  <div key={i} className={`flex flex-col ${isBot ? "items-start" : "items-end"}`}>
                    <div className={`max-w-[85%] rounded-lg p-2.5 shadow-sm whitespace-pre-line leading-relaxed ${
                      isBot ? "bg-white text-slate-800 rounded-tl-none" : "bg-[#d9fdd3] text-slate-800 rounded-tr-none font-medium"
                    }`}>
                      {msg}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Chat Footer Input */}
            <form onSubmit={handleSendChat} className="p-2 bg-[#f0f2f5] border-t border-slate-200 flex items-center space-x-2 shrink-0">
              <input 
                type="text"
                placeholder="e.g. add lead Ravi 3BHK"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 bg-white border border-slate-200 rounded-full py-1.5 px-3 text-[10px] text-slate-800 outline-none focus:border-[#25d366] transition"
              />
              <button 
                type="submit"
                className="w-7 h-7 rounded-full bg-[#25d366] text-white flex items-center justify-center text-xs font-bold shrink-0 hover:bg-[#16c47f]"
              >
                ➔
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
