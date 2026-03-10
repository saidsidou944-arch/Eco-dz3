import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { Store, ArrowRight, Mail, Lock, Facebook } from "lucide-react";
import { motion } from "framer-motion";

export default function Login({ onLogin }: { onLogin: (user: any) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      if (res.ok) {
        onLogin(data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F5F7] flex items-center justify-center p-4 font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-black rounded-[24px] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-black/20">
            <Store className="text-white w-10 h-10" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter">Welcome Back</h1>
          <p className="text-gray-500 mt-2 font-medium">Log in to your automated ad platform.</p>
        </div>

        <div className="bg-white p-10 rounded-[40px] shadow-2xl shadow-black/5 border border-gray-100 space-y-8">
          <div className="space-y-4">
            <button className="w-full bg-[#1877F2] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#166fe5] transition-all">
              <Facebook className="w-5 h-5 fill-current" />
              Continue with Facebook
            </button>
            <div className="flex items-center gap-4 text-gray-300">
              <div className="h-[1px] flex-1 bg-gray-100" />
              <span className="text-[10px] font-black uppercase tracking-widest">OR EMAIL</span>
              <div className="h-[1px] flex-1 bg-gray-100" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-xs font-black uppercase tracking-widest border border-red-100">
                {error}
              </div>
            )}
            
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  required
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-black transition-all font-bold"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  required
                  type="password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-black transition-all font-bold"
                />
              </div>
            </div>

            <button 
              disabled={loading}
              type="submit"
              className="w-full bg-black text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-black/10 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              {loading ? "Logging in..." : "Continue"}
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>

          <div className="text-center">
            <p className="text-gray-500 text-sm font-medium">
              New to SellerSaaS?{" "}
              <Link to="/signup" className="text-black font-black hover:underline">
                Sign up for free
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

