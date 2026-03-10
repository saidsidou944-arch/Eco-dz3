import { useState } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Settings, 
  LogOut, 
  Store,
  HelpCircle,
  PlusCircle,
  BarChart3,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface LayoutProps {
  user: any;
  onLogout: () => void;
}

export default function Layout({ user, onLogout }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Products", path: "/products", icon: Package },
    { name: "Orders", path: "/orders", icon: ShoppingCart },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  const mobileNavItems = [
    { name: "Home", path: "/dashboard", icon: LayoutDashboard },
    { name: "Ads", path: "/products", icon: BarChart3 },
    { name: "Add", path: "/products/new", icon: PlusCircle },
    { name: "Orders", path: "/orders", icon: ShoppingCart },
    { name: "More", path: "/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F4F5F7] flex flex-col">
      {/* Top Navigation - Desktop */}
      <header className="hidden md:flex h-16 bg-white border-b border-gray-200 sticky top-0 z-50 px-8 items-center justify-between">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/dashboard")}>
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <Store className="text-white w-5 h-5" />
            </div>
            <span className="font-black text-xl tracking-tighter">SellerSaaS</span>
          </div>

          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200",
                    isActive 
                      ? "text-black bg-gray-100" 
                      : "text-gray-500 hover:text-black hover:bg-gray-50"
                  )
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-black px-3 py-2">
            <HelpCircle className="w-4 h-4" />
            Support
          </button>
          <div className="h-4 w-[1px] bg-gray-200 mx-2" />
          <div className="flex items-center gap-3">
            <div className="text-right hidden lg:block">
              <p className="text-xs font-bold text-gray-900">{user.store_name}</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Pro Seller</p>
            </div>
            <button 
              onClick={() => setShowLogoutConfirm(true)}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Top Bar */}
      <header className="md:hidden bg-white border-b border-gray-100 px-4 h-14 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2" onClick={() => navigate("/dashboard")}>
          <div className="w-7 h-7 bg-black rounded-lg flex items-center justify-center">
            <Store className="text-white w-4 h-4" />
          </div>
          <span className="font-black text-lg tracking-tighter">SellerSaaS</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-gray-500"><HelpCircle className="w-5 h-5" /></button>
          <button 
            onClick={() => setShowLogoutConfirm(true)}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-20 md:pb-0">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8">
          <Outlet />
        </div>
      </main>

      {/* Bottom Navigation - Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 h-16 flex items-center justify-around px-2 z-50">
        {mobileNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition-all",
                isActive ? "text-black" : "text-gray-400"
              )
            }
          >
            <item.icon className={cn("w-5 h-5", location.pathname === item.path && "fill-current")} />
            <span className="text-[10px] font-bold uppercase tracking-tighter">{item.name}</span>
          </NavLink>
        ))}
      </nav>

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

