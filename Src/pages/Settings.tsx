import { useState } from "react";
import React from "react";
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Globe, 
  Facebook, 
  Instagram,
  CheckCircle2,
  ChevronRight,
  X,
  Layout,
  Zap,
  Lock,
  Smartphone,
  MessageCircle,
  Store,
  LogOut
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Settings({ user, onLogout }: { user: any, onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState("Profile");
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const tabs = [
    { name: "Profile", icon: User },
    { name: "Store", icon: Globe },
    { name: "Integrations", icon: Facebook },
    { name: "Payments", icon: CreditCard },
    { name: "Security", icon: Shield },
    { name: "Notifications", icon: Bell },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20">
      <header>
        <h1 className="text-4xl font-black text-gray-900 tracking-tighter">Settings</h1>
        <p className="text-gray-500 mt-1 font-medium">Manage your account and store preferences.</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Tabs */}
        <div className="lg:w-72 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={cn(
                "w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all text-left",
                activeTab === tab.name 
                  ? "bg-black text-white shadow-xl shadow-black/10" 
                  : "text-gray-400 hover:bg-gray-100 hover:text-black"
              )}
            >
              <tab.icon className="w-5 h-5" />
              {tab.name}
            </button>
          ))}

          <div className="pt-8 mt-8 border-t border-gray-100">
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all text-left text-red-500 hover:bg-red-50"
            >
              <LogOut className="w-5 h-5" />
              Log out
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              {activeTab === "Integrations" && (
                <section className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm space-y-10">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-black tracking-tight">Meta Integrations</h3>
                      <p className="text-gray-500 font-medium">Connect your Facebook & Instagram accounts.</p>
                    </div>
                    <div className="flex -space-x-3">
                      <div className="w-12 h-12 bg-[#1877F2] rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                        <Facebook className="text-white w-6 h-6 fill-current" />
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                        <Instagram className="text-white w-6 h-6" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-8 bg-gray-50 rounded-[32px] border border-gray-100 space-y-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                        <Zap className="text-blue-600 w-6 h-6" />
                      </div>
                      <h4 className="text-lg font-black tracking-tight">Facebook Pixel</h4>
                      <p className="text-sm text-gray-500 font-medium leading-relaxed">Track conversions and optimize your ad spend automatically with our AI.</p>
                      <button className="text-xs font-black uppercase tracking-widest text-blue-600 hover:underline">Configure Pixel</button>
                    </div>
                    <div className="p-8 bg-gray-50 rounded-[32px] border border-gray-100 space-y-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
                        <Layout className="text-purple-600 w-6 h-6" />
                      </div>
                      <h4 className="text-lg font-black tracking-tight">Instagram Shop</h4>
                      <p className="text-sm text-gray-500 font-medium leading-relaxed">Tag your products in posts and stories to drive direct sales from IG.</p>
                      <button className="text-xs font-black uppercase tracking-widest text-purple-600 hover:underline">Sync Catalog</button>
                    </div>
                  </div>

                  <button 
                    onClick={() => { setIsWizardOpen(true); setWizardStep(1); }}
                    className="w-full py-6 bg-black text-white rounded-3xl font-black text-lg flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl shadow-black/10"
                  >
                    <Facebook className="w-6 h-6 fill-current" />
                    Launch Meta Connection Wizard
                  </button>
                </section>
              )}

              {activeTab === "Profile" && (
                <section className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm space-y-10">
                  <div className="flex items-center gap-8">
                    <div className="w-28 h-28 bg-gray-100 rounded-[32px] flex items-center justify-center text-gray-400 relative group overflow-hidden">
                      <User className="w-12 h-12" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                        <span className="text-white text-[10px] font-black uppercase tracking-widest">Change</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-2xl font-black tracking-tight">{user.store_name}</h3>
                      <p className="text-gray-500 font-medium">{user.email}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full">Store Live</span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full">Pro Plan</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Store Name</label>
                      <input type="text" defaultValue={user.store_name} className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-black font-bold" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">WhatsApp Number</label>
                      <input type="text" defaultValue={user.whatsapp_number} className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-black font-bold" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                      <input type="email" defaultValue={user.email} className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-black font-bold" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Language</label>
                      <select className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-black font-bold">
                        <option>English</option>
                        <option>Arabic</option>
                        <option>French</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button className="bg-black text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-black/10 hover:scale-[1.02] active:scale-[0.98] transition-all">
                      Save Changes
                    </button>
                  </div>
                </section>
              )}

              {activeTab === "Store" && (
                <section className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm space-y-10">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-black tracking-tight">Store Preferences</h3>
                    <p className="text-gray-500 font-medium">Customize your public landing pages.</p>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-4">
                      <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Branding</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Primary Color</label>
                          <div className="flex gap-2">
                            <input type="color" defaultValue="#10b981" className="w-12 h-12 rounded-xl border-none p-0 overflow-hidden cursor-pointer" />
                            <input type="text" defaultValue="#10b981" className="flex-1 px-6 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-black font-bold" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Store URL Slug</label>
                          <div className="flex items-center bg-gray-50 rounded-2xl px-6 py-3">
                            <span className="text-gray-400 font-bold">/p/</span>
                            <input type="text" defaultValue={user.store_name?.toLowerCase().replace(/ /g, '-')} className="flex-1 bg-transparent border-none focus:ring-0 font-bold" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Checkout Options</h4>
                      <div className="space-y-4">
                        <label className="flex items-center justify-between p-6 bg-gray-50 rounded-[24px] cursor-pointer group">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                              <Shield className="text-emerald-600 w-5 h-5" />
                            </div>
                            <div>
                              <p className="font-black text-sm uppercase tracking-widest">Cash on Delivery (COD)</p>
                              <p className="text-xs text-gray-500 font-medium">Enable COD as the default payment method.</p>
                            </div>
                          </div>
                          <input type="checkbox" defaultChecked className="w-6 h-6 rounded-lg border-gray-200 text-black focus:ring-black" />
                        </label>
                        <label className="flex items-center justify-between p-6 bg-gray-50 rounded-[24px] cursor-pointer group">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                              <MessageCircle className="text-blue-600 w-5 h-5" />
                            </div>
                            <div>
                              <p className="font-black text-sm uppercase tracking-widest">WhatsApp Checkout</p>
                              <p className="text-xs text-gray-500 font-medium">Allow customers to order via WhatsApp chat.</p>
                            </div>
                          </div>
                          <input type="checkbox" defaultChecked className="w-6 h-6 rounded-lg border-gray-200 text-black focus:ring-black" />
                        </label>
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Meta Wizard Modal */}
      <AnimatePresence>
        {isWizardOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-2xl rounded-[48px] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.3)]"
            >
              <div className="p-12 space-y-10">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[#1877F2]">
                      <Facebook className="w-6 h-6 fill-current" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">Meta Business</span>
                    </div>
                    <h2 className="text-4xl font-black tracking-tighter">Connect Account</h2>
                    <p className="text-gray-500 font-medium">Step {wizardStep} of 3 • {wizardStep === 1 ? "Authentication" : wizardStep === 2 ? "Permissions" : "Success"}</p>
                  </div>
                  <button onClick={() => setIsWizardOpen(false)} className="p-3 hover:bg-gray-100 rounded-full transition-colors">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden flex">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(wizardStep / 3) * 100}%` }}
                    className="h-full bg-black"
                  />
                </div>

                <div className="min-h-[300px]">
                  {wizardStep === 1 && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-8"
                    >
                      <div className="bg-blue-50 p-8 rounded-[32px] border border-blue-100 flex items-center gap-6">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                          <Facebook className="text-[#1877F2] w-8 h-8 fill-current" />
                        </div>
                        <div>
                          <h4 className="text-lg font-black tracking-tight">Connect Facebook</h4>
                          <p className="text-sm text-blue-800 font-medium">Link your personal account to access your business pages.</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h5 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Why connect?</h5>
                        <ul className="space-y-3">
                          {[
                            "Automated ad launching in 1 click",
                            "Real-time pixel tracking & optimization",
                            "Direct catalog sync with Meta Shop",
                            "Advanced AI-powered audience targeting"
                          ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-600">
                              <CheckCircle2 className="text-emerald-500 w-5 h-5" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}

                  {wizardStep === 2 && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-8"
                    >
                      <div className="space-y-4">
                        <h4 className="text-xl font-black tracking-tight">Confirm Permissions</h4>
                        <p className="text-gray-500 font-medium">SellerSaaS needs the following access to automate your ads:</p>
                      </div>

                      <div className="space-y-3">
                        {[
                          { title: "Manage your Ads", desc: "Required to launch and stop campaigns." },
                          { title: "Manage your Pages", desc: "Required to post ads on your behalf." },
                          { title: "Access Insights", desc: "Required to show you ROI analytics." },
                          { title: "Manage Catalog", desc: "Required to sync your products." }
                        ].map((item, i) => (
                          <div key={i} className="p-5 bg-gray-50 rounded-2xl flex items-center justify-between">
                            <div>
                              <p className="font-black text-sm uppercase tracking-widest">{item.title}</p>
                              <p className="text-[10px] text-gray-500 font-medium">{item.desc}</p>
                            </div>
                            <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                              <CheckCircle2 className="text-white w-4 h-4" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {wizardStep === 3 && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-10 space-y-6"
                    >
                      <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/20">
                        <CheckCircle2 className="text-white w-12 h-12" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-3xl font-black tracking-tighter">Connection Successful!</h3>
                        <p className="text-gray-500 font-medium">Your Meta account is now fully synced with SellerSaaS.</p>
                      </div>
                      <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 flex items-center justify-center gap-4">
                        <div className="flex -space-x-2">
                          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center border-2 border-white">
                            <Store className="text-white w-4 h-4" />
                          </div>
                          <div className="w-8 h-8 bg-[#1877F2] rounded-full flex items-center justify-center border-2 border-white">
                            <Facebook className="text-white w-4 h-4 fill-current" />
                          </div>
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest text-gray-400">Sync Active</span>
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className="pt-8 border-t border-gray-100 flex justify-between items-center">
                  <button 
                    onClick={() => wizardStep > 1 ? setWizardStep(wizardStep - 1) : setIsWizardOpen(false)}
                    className="text-gray-400 font-black uppercase tracking-widest text-xs hover:text-black"
                  >
                    {wizardStep === 1 ? "Cancel" : "Back"}
                  </button>
                  <button 
                    onClick={() => wizardStep < 3 ? setWizardStep(wizardStep + 1) : setIsWizardOpen(false)}
                    className="bg-black text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-black/10 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
                  >
                    {wizardStep === 3 ? "Finish" : "Continue"}
                    {wizardStep < 3 && <ChevronRight className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-md rounded-[40px] overflow-hidden shadow-2xl"
            >
              <div className="p-10 text-center space-y-6">
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto">
                  <LogOut className="text-red-500 w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black tracking-tighter">Log out</h3>
                  <p className="text-gray-500 font-medium">Are you sure you want to log out?</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <button 
                    onClick={() => setShowLogoutConfirm(false)}
                    className="py-4 bg-gray-100 text-gray-900 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-gray-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={onLogout}
                    className="py-4 bg-red-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-red-600 shadow-lg shadow-red-500/20 transition-all"
                  >
                    Log out
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
