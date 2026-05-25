"use client";

import { useState } from "react";
import { 
  Award, Gift, Trophy, Check, 
  HelpCircle, ChevronRight, Sparkles 
} from "lucide-react";

interface Badge {
  name: string;
  desc: string;
  icon: string;
  unlocked: boolean;
}

interface Coupon {
  id: string;
  title: string;
  code: string;
  sponsor: string;
  expiry: string;
  isClaimed: boolean;
}

export default function AgentRewards() {
  const [badges, setBadges] = useState<Badge[]>([
    { name: "Launch Expert", desc: "RSVPed to 5+ LaunchCP Meets", icon: "🚀", unlocked: true },
    { name: "Webinar Pro", desc: "Attended 3 virtual webinars", icon: "🎓", unlocked: true },
    { name: "Active Partner", desc: "Logged 10+ leads in pipeline", icon: "🤝", unlocked: true },
    { name: "Premium Broker", desc: "Reach 5,000 engagement points", icon: "⭐", unlocked: false }
  ]);

  const [coupons, setCoupons] = useState<Coupon[]>([
    { id: "1", title: "₹500 Amazon Gift Voucher", code: "AMZ-9912-GET", sponsor: "Prestige Group", expiry: "June 10, 2026", isClaimed: false },
    { id: "2", title: "₹1,000 Uber Ride Coupon", code: "UBR-COMM-RIDE", sponsor: "Lodha Builders", expiry: "June 25, 2026", isClaimed: true }
  ]);

  const leaderboard = [
    { rank: 1, name: "Prasad Goud", points: 4200, location: "Gachibowli" },
    { rank: 2, name: "Sreenivas Rao", points: 1240, location: "Kokapet" },
    { rank: 3, name: "Vikas Sharma", points: 890, location: "Ameerpet" },
  ];

  const handleClaimCoupon = (id: string) => {
    setCoupons(coupons.map(c => c.id === id ? { ...c, isClaimed: true } : c));
    alert("Coupon code copied to clipboard! Enter it on sponsor site.");
  };

  return (
    <div className="space-y-6 text-slate-800">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Rewards & Badges</h1>
        <p className="text-[#64748b] text-xs font-semibold mt-0.5">Gamify pipeline activity. Earn partner badges and gift vouchers.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left - Vouchers & Badges */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Active Rewards / Coupons */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Earned Vouchers</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {coupons.map(cop => (
                <div key={cop.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col justify-between h-40">
                  <div className="space-y-1">
                    <div className="flex justify-between items-start">
                      <span className="text-[9px] font-extrabold px-2 py-0.5 rounded bg-amber-50 text-amber-600 border border-amber-250">
                        {cop.sponsor}
                      </span>
                      <Gift className="w-4 h-4 text-amber-500" />
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 mt-2">{cop.title}</h4>
                    <p className="text-[10px] text-slate-500 font-semibold">Expires: {cop.expiry}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs font-bold">
                    {cop.isClaimed ? (
                      <>
                        <span className="text-slate-450 text-[10px] line-through font-semibold">{cop.code}</span>
                        <span className="text-slate-400 text-[10px]">Claimed</span>
                      </>
                    ) : (
                      <>
                        <span className="text-slate-700 text-xs font-extrabold">{cop.code}</span>
                        <button 
                          onClick={() => handleClaimCoupon(cop.id)}
                          className="px-3 py-1 bg-[#25d366] hover:bg-[#16c47f] text-white rounded-lg text-[10px]"
                        >
                          Claim Code
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Badges list */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Partner Badges</h3>
            <div className="grid grid-cols-2 gap-4">
              {badges.map(bad => (
                <div 
                  key={bad.name} 
                  className={`p-4 rounded-xl border flex items-center space-x-3.5 ${
                    bad.unlocked 
                      ? "bg-white border-slate-200" 
                      : "bg-slate-50 border-slate-200/60 opacity-50"
                  }`}
                >
                  <span className="text-2xl">{bad.icon}</span>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">{bad.name}</h4>
                    <p className="text-[9px] text-slate-500 leading-normal mt-0.5">{bad.desc}</p>
                    <span className="text-[8px] font-bold text-[#16c47f] block mt-1 uppercase tracking-wider">
                      {bad.unlocked ? "Unlocked ✓" : "Locked"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right - Leaderboard */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>Broker Leaderboard</span>
          </h3>

          <div className="space-y-4">
            {leaderboard.map(agent => (
              <div 
                key={agent.rank} 
                className={`p-3.5 rounded-xl border flex justify-between items-center text-xs ${
                  agent.rank === 2 
                    ? "bg-[#25d366]/5 border-[#25d366]/40" 
                    : "bg-slate-50 border-slate-200/80"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] ${
                    agent.rank === 1 ? "bg-amber-100 text-amber-700" :
                    agent.rank === 2 ? "bg-emerald-100 text-[#16c47f]" :
                    "bg-slate-200 text-slate-600"
                  }`}>
                    #{agent.rank}
                  </span>
                  <div>
                    <div className="font-bold text-slate-900">{agent.name}</div>
                    <div className="text-[9px] text-slate-400 mt-0.5">{agent.location}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-extrabold text-slate-800">{agent.points} pts</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
