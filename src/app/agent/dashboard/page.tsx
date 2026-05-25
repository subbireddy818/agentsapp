"use client";

import { 
  Calendar, Eye, ChevronRight, FileText, 
  MapPin, CheckCircle2, Clock, Building, 
  ArrowUpRight, Award, Sparkles, MessageSquare,
  Gift, ShieldCheck, Users, HelpCircle 
} from "lucide-react";
import Link from "next/link";

export default function AgentDashboard() {
  const followUps = [
    { name: "Ramesh Kumar", bhk: "3 BHK", location: "Kokapet", time: "Today, 5:00 PM", priority: "High", color: "bg-red-500" },
    { name: "Neha Singh", bhk: "2 BHK", location: "Financial Dist", time: "Today, 6:30 PM", priority: "Medium", color: "bg-amber-500" },
  ];

  const recentInventory = [
    { name: "Skyline Heights", type: "Apartment", location: "Kokapet", price: "₹1.82 Cr Onwards", units: 12 },
    { name: "Gachibowli plots", type: "Plot", location: "Gachibowli", price: "₹1.40 Cr Onwards", units: 5 },
  ];

  const webinars = [
    { title: "Prestige Highrise launch", time: "Today, 8:00 PM", reward: "₹500 Amazon Voucher" },
  ];

  return (
    <div className="space-y-6 text-slate-800">
      
      {/* Greeting Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-5 bg-[#f8fafc]">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Good Morning, Sreenivas 👋</h1>
          <p className="text-[#64748b] text-xs font-semibold mt-0.5">WhatsApp-native Broker OS. Everything is running smoothly.</p>
        </div>
        
        {/* Profile Card */}
        <div className="flex items-center space-x-3 bg-white p-1.5 pr-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="w-8 h-8 rounded-lg bg-[#25d366]/10 text-[#16c47f] flex items-center justify-center font-bold text-xs">
            S
          </div>
          <div>
            <div className="text-xs font-extrabold text-[#0f172a]">Sreenivas Rao</div>
            <div className="text-[9px] text-[#16c47f] font-extrabold flex items-center space-x-1 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#25d366] inline-block animate-pulse"></span>
              <span>Verified Agent</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column - Core Operational Widgets */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Quick Actions Row */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quick Actions</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-bold">
              <Link href="/agent/pipeline" className="p-3 bg-slate-50 hover:bg-[#25d366]/5 rounded-xl border border-slate-250/70 text-slate-700 flex flex-col items-center text-center transition">
                <span className="text-lg mb-1">👤</span>
                <span>Add Lead</span>
              </Link>
              <Link href="/agent/inventory" className="p-3 bg-slate-50 hover:bg-[#25d366]/5 rounded-xl border border-slate-250/70 text-slate-700 flex flex-col items-center text-center transition">
                <span className="text-lg mb-1">🔍</span>
                <span>Search Inventory</span>
              </Link>
              <Link href="/agent/documents" className="p-3 bg-slate-50 hover:bg-[#25d366]/5 rounded-xl border border-slate-250/70 text-slate-700 flex flex-col items-center text-center transition">
                <span className="text-lg mb-1">📄</span>
                <span>Share Brochure</span>
              </Link>
              <Link href="/agent/reminders" className="p-3 bg-slate-50 hover:bg-[#25d366]/5 rounded-xl border border-slate-250/70 text-slate-700 flex flex-col items-center text-center transition">
                <span className="text-lg mb-1">⏰</span>
                <span>Set Reminder</span>
              </Link>
            </div>
          </div>

          {/* Follow-ups & Hot Leads */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
                    <span>Follow-ups Today</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block animate-ping"></span>
                  </h3>
                  <Link href="/agent/reminders" className="text-[10px] text-[#16c47f] font-bold uppercase hover:underline">View</Link>
                </div>
                <div className="space-y-2.5">
                  {followUps.map((item, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex justify-between items-center text-xs">
                      <div>
                        <div className="font-bold text-slate-800">{item.name}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">{item.bhk} · {item.location}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-slate-700">{item.time.split(",")[1]}</div>
                        <span className={`inline-block w-1.5 h-1.5 rounded-full ${item.color} mt-1`}></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">AI Recommendations</h3>
                <div className="p-3 bg-[#25d366]/5 border border-[#25d366]/20 rounded-xl text-xs space-y-2">
                  <div className="flex items-center space-x-1 text-[#16c47f] font-bold">
                    <Sparkles className="w-4 h-4" />
                    <span>Inventory Match Nudge</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    Ramesh Kumar (3BHK Kokapet) matches **Skyline Heights** (Plot 42 is now AVAILABLE). Tap to share broker pass.
                  </p>
                  <Link href="/agent/inventory/skyline-heights" className="text-[10px] font-bold text-[#16c47f] hover:underline flex items-center">
                    <span>Send details to client</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Inventory */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Recent Inventory</h3>
            <div className="space-y-3">
              {recentInventory.map((item, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 hover:border-[#16c47f]/40 transition flex justify-between items-center text-xs">
                  <div className="flex items-center space-x-2.5">
                    <span className="text-xl">{item.type === "Plot" ? "🚜" : "🏢"}</span>
                    <div>
                      <div className="font-bold text-slate-800">{item.name}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{item.location} · {item.type}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-[#16c47f]">{item.price}</div>
                    <div className="text-[9px] text-slate-500 mt-0.5">{item.units} Units left</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - webinars, launch countdowns & rewards engagement */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Rewards Summary engagement points */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Rewards Summary</div>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-3xl font-extrabold text-slate-900">1,240</div>
                <div className="text-[9px] text-[#16c47f] font-bold uppercase tracking-wider mt-0.5">Engagement Points</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#25d366]/10 text-[#16c47f] flex items-center justify-center font-bold text-sm">
                🏆
              </div>
            </div>
            
            {/* Target Progress slider */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-[10px] text-slate-500 font-bold">
                <span>Fast Responder Badge</span>
                <span>1240 / 1500 XP</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-[#25d366] h-full" style={{ width: "82%" }}></div>
              </div>
            </div>
            
            <Link href="/agent/rewards" className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-[10px] rounded-lg text-center flex items-center justify-center transition">
              <span>View Rewards Vault</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          {/* Upcoming webinars & countdowns */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1">
              <span>Upcoming Webinars</span>
              <span className="w-2 h-2 rounded-full bg-[#25d366] inline-block animate-ping"></span>
            </h3>

            {webinars.map((meet, idx) => (
              <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5 text-xs">
                <div>
                  <div className="font-bold text-slate-800">{meet.title}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{meet.time}</div>
                </div>
                <div className="p-2 bg-emerald-50 rounded border border-[#25d366]/20 text-[9px] text-[#16c47f] font-bold flex items-center">
                  <Gift className="w-3.5 h-3.5 mr-1" />
                  <span>{meet.reward}</span>
                </div>
                
                <button 
                  onClick={() => alert("Registration confirmed! A pass code and magic link has been shared via WhatsApp.")}
                  className="w-full py-2 bg-[#25d366] hover:bg-[#16c47f] text-white font-bold text-[10px] rounded-lg transition"
                >
                  Register RSVP
                </button>
              </div>
            ))}
          </div>

          {/* CP verification summary badge */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-3.5">
            <ShieldCheck className="w-8 h-8 text-[#16c47f] shrink-0" />
            <div>
              <div className="text-xs font-bold text-slate-900">RERA Approved profile</div>
              <div className="text-[9px] text-slate-500">ID: CP-8402 · Active Partner status</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
