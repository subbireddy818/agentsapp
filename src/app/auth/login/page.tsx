"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  Smartphone, ShieldAlert, ArrowLeft, 
  CheckCircle2, Loader2, KeyRound 
} from "lucide-react";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Set default role from URL param or default to agent
  const initialRole = searchParams.get("role") || "agent";
  
  const [role, setRole] = useState(initialRole);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [step, setStep] = useState(1); // 1: Enter Phone, 2: Enter OTP
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      setMessage("Please enter a valid phone number.");
      return;
    }
    
    setLoading(true);
    setMessage("");
    
    // Simulate sending OTP via SMS
    setTimeout(() => {
      setLoading(false);
      setStep(2);
      setMessage("OTP sent successfully to " + phone + ". (Use code: 123456)");
    }, 1500);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value !== "" && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredCode = otp.join("");
    if (enteredCode.length < 6) {
      setMessage("Please enter all 6 digits.");
      return;
    }

    setLoading(true);
    setMessage("");

    // Simulate OTP verification and login
    setTimeout(() => {
      setLoading(false);
      if (enteredCode === "123456") {
        setMessage("");
        // Route based on selected role
        if (role === "builder") {
          router.push("/builder/dashboard");
        } else if (role === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/agent/dashboard");
        }
      } else {
        setMessage("Invalid OTP. Please enter the correct code (123456).");
      }
    }, 1500);
  };

  return (
    <div className="w-full max-w-md glass-panel p-8 rounded-2xl border border-card-border shadow-2xl relative">
      {/* Back Link */}
      <Link href="/" className="inline-flex items-center space-x-2 text-slate-400 hover:text-white transition text-xs mb-6">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Home</span>
      </Link>

      {/* Logo */}
      <div className="flex items-center space-x-2 mb-8 justify-center">
        <div className="w-8 h-8 rounded-lg bg-brand-green flex items-center justify-center font-bold text-white shadow-lg">
          a
        </div>
        <span className="text-xl font-bold tracking-tight text-white">
          agents<span className="text-brand-green">app</span>
        </span>
      </div>

      {step === 1 ? (
        <div>
          <h2 className="text-2xl font-bold text-center text-white mb-2">Welcome Back</h2>
          <p className="text-slate-400 text-sm text-center mb-6">
            Enter your mobile number to sign in with OTP.
          </p>

          {/* Role Tabs */}
          <div className="grid grid-cols-3 gap-2 bg-slate-900/60 p-1.5 rounded-lg border border-slate-800 mb-6 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setRole("agent")}
              className={`py-2 rounded-md transition ${
                role === "agent" 
                  ? "bg-brand-green text-slate-950 font-bold" 
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Agent / CP
            </button>
            <button
              type="button"
              onClick={() => setRole("builder")}
              className={`py-2 rounded-md transition ${
                role === "builder" 
                  ? "bg-indigo-600 text-white font-bold" 
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Builder
            </button>
            <button
              type="button"
              onClick={() => setRole("admin")}
              className={`py-2 rounded-md transition ${
                role === "admin" 
                  ? "bg-emerald-600 text-white font-bold" 
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Verification
            </button>
          </div>

          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 text-sm font-semibold">
                  +91
                </div>
                <input
                  type="tel"
                  placeholder="98765 43210"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  className="w-full bg-slate-950/80 border border-slate-800 focus:border-brand-green focus:ring-1 focus:ring-brand-green rounded-xl py-3 pl-12 pr-4 text-slate-100 placeholder-slate-650 outline-none text-sm font-medium transition"
                />
              </div>
            </div>

            {message && (
              <div className="p-3 bg-red-950/40 border border-red-800/50 rounded-lg text-xs text-red-400 flex items-center space-x-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{message}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 ${
                role === "builder" 
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/25" 
                  : role === "admin"
                  ? "bg-emerald-700 hover:bg-emerald-800 text-white shadow-emerald-700/25"
                  : "bg-brand-green hover:bg-brand-green-hover text-slate-950 font-bold shadow-brand-green/25"
              } rounded-xl text-sm font-bold shadow-lg transition flex items-center justify-center space-x-2`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sending OTP...</span>
                </>
              ) : (
                <>
                  <span>Send Verification Code</span>
                </>
              )}
            </button>
          </form>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold text-center text-white mb-2">Verify OTP</h2>
          <p className="text-slate-400 text-sm text-center mb-6">
            Enter the 6-digit verification code sent to <span className="text-white font-semibold">{phone}</span>
          </p>

          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div className="flex justify-between gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className="w-12 h-12 bg-slate-950/80 border border-slate-800 focus:border-brand-green focus:ring-1 focus:ring-brand-green rounded-xl text-center text-white text-lg font-bold outline-none transition"
                />
              ))}
            </div>

            {message && (
              <div className={`p-3 rounded-lg text-xs flex items-center space-x-2 ${
                message.includes("sent successfully") 
                  ? "bg-brand-green/10 border border-brand-green/30 text-brand-green-light" 
                  : "bg-red-950/40 border border-red-800/50 text-red-400"
              }`}>
                {message.includes("sent successfully") ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                ) : (
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                )}
                <span>{message}</span>
              </div>
            )}

            <div className="space-y-3">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3.5 ${
                  role === "builder" 
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white" 
                    : role === "admin"
                    ? "bg-emerald-700 hover:bg-emerald-800 text-white"
                    : "bg-brand-green hover:bg-brand-green-hover text-slate-950 font-bold"
                } rounded-xl text-sm font-bold shadow-lg transition flex items-center justify-center space-x-2`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying OTP...</span>
                  </>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4" />
                    <span>Verify & Sign In</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setOtp(["", "", "", "", "", ""]);
                  setMessage("");
                }}
                className="w-full py-2.5 bg-transparent text-slate-400 hover:text-white transition text-xs font-semibold"
              >
                Change Phone Number
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#070b13] flex flex-col justify-center items-center px-6 relative">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-green/10 blur-[120px] rounded-full -z-10 animate-pulse"></div>
      
      <Suspense fallback={
        <div className="glass-panel p-8 rounded-2xl border border-card-border shadow-2xl w-full max-w-md flex flex-col items-center justify-center py-20 text-slate-100">
          <Loader2 className="w-8 h-8 animate-spin text-brand-green mb-4" />
          <span className="text-xs text-slate-400 font-bold">Loading secure authentication portal...</span>
        </div>
      }>
        <LoginContent />
      </Suspense>
    </div>
  );
}
