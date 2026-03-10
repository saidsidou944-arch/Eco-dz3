import { useState, useEffect } from "react";
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  Package, 
  ArrowUpRight, 
  Plus, 
  CheckCircle2, 
  Facebook, 
  Rocket, 
  ChevronRight,
  Search,
  MoreHorizontal,
  Upload,
  BarChart3
} from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard({ user }: { user: any }) {
  const navigate = useNavigate();
  const [stats, setStats] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("Orders");
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, ordersRes, productsRes] = await Promise.all([
          fetch(`/api/stats/${user.id}`),
          fetch(`/api/orders?sellerId=${user.id}`),
          fetch(`/api/products?sellerId=${user.id}`)
        ]);
        
        const statsData = await statsRes.json();
        const ordersData = await ordersRes.json();
        const productsData = await productsRes.json();
        
        setStats(statsData);
        setOrders(ordersData);
        setProducts(productsData);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [user.id]);

  const steps = [
    { name: "Create Account", status: "completed" },
    { name: "Connect Meta", status: "active", action: () => navigate("/settings") },
    { name: "Launch Ads", status: "pending" },
    { name: "Manage Orders", status: "pending" },
  ];

  if (loading) return <div className="animate-pulse space-y-8">
    <div className="h-40 bg-gray-200 rounded-3xl w-full"></div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 h-96 bg-gray-200 rounded-3xl"></div>
      <div className="lg:col-span-2 h-96 bg-gray-200 rounded-3xl"></div>
    </div>
  </div>;

  return (
    <div className="space-y-8">
      {/* Hero / Welcome Section */}
      <section className="bg-white p-8 rounded-[32px] border border-gray-200 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-gray-900">Welcome back, {user.store_name}</h1>
            <p className="text-gray-500 mt-1 font-medium">Your automated ad platform is ready for action.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse" />
              Store Live
            </div>
          </div>
        </div>

        {/* 4-Step Visual Flow */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 relative">
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gray-100 -translate-y-1/2 hidden md:block z-0" />
          {steps.map((step, i) => (
            <div key={step.name} className="flex flex-col items-center gap-3 relative z-10 bg-white px-4">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300",
                step.status === "completed" ? "bg-black text-white" : 
                step.status === "active" ? "bg-black text-white ring-4 ring-black/10" : 
                "bg-gray-100 text-gray-400"
              )}>
                {step.status === "completed" ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
              </div>
              <span className={cn(
                "text-xs font-bold uppercase tracking-wider",
                step.status === "pending" ? "text-gray-400" : "text-black"
              )}>{step.name}</span>
              {step.status === "active" && step.action && (
                <button onClick={step.action} className="text-[10px] font-black text-blue-600 underline">START NOW</button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT SIDE: Add Product Card (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-[32px] border border-gray-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black tracking-tight uppercase">Launch New Ad</h3>
              <Rocket className="w-5 h-5 text-black" />
            </div>
            
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); navigate("/products/new"); }}>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Product Name</label>
                <input type="text" placeholder="e.g. Premium Watch" className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-black transition-all text-sm font-bold" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Price (DZD)</label>
                  <input type="number" placeholder="4500" className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-black transition-all text-sm font-bold" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Daily Budget</label>
                  <input type="number" placeholder="2000" className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-black transition-all text-sm font-bold" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Targeting / Wilaya</label>
                <select className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-black transition-all text-sm font-bold">
                  <option>All Algeria (58 Wilayas)</option>
                  <option>North Only</option>
                  <option>South Only</option>
                  <option>Specific Wilayas...</option>
                </select>
              </div>
              <div className="border-2 border-dashed border-gray-100 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-black hover:text-black transition-all cursor-pointer bg-gray-50/50">
                <Upload className="w-5 h-5" />
                <span className="text-[10px] font-black uppercase tracking-widest">Upload Creative</span>
              </div>
              
              <button type="submit" className="w-full bg-black text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-black/10 hover:scale-[1.02] active:scale-[0.98] transition-all">
                Launch Campaign
              </button>
            </form>
          </div>

          {/* Quick Stats Mini Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Revenue</p>
                <TrendingUp className="w-3 h-3 text-emerald-500" />
              </div>
              <h4 className="text-lg font-black">{stats.revenue.toLocaleString()} <span className="text-[10px] text-gray-400">DZD</span></h4>
            </div>
            <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Orders</p>
                <ShoppingBag className="w-3 h-3 text-blue-500" />
              </div>
              <h4 className="text-lg font-black">{stats.orders}</h4>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Tabs for Landing Pages and Manage Orders (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-[32px] border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full min-h-[550px]">
            <div className="flex border-b border-gray-100 bg-gray-50/50">
              {["Manage Orders", "Landing Pages"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-all",
                    activeTab === tab ? "text-black bg-white border-b-2 border-black" : "text-gray-400 hover:text-gray-600"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex-1 p-5">
              {activeTab === "Manage Orders" ? (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <div className="relative flex-1 min-w-[200px]">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3 h-3" />
                      <input type="text" placeholder="Search by name or phone..." className="w-full pl-9 pr-4 py-2 bg-gray-50 border-none rounded-xl text-xs focus:ring-1 focus:ring-black font-medium" />
                    </div>
                    <div className="flex gap-1 overflow-x-auto pb-1 no-scrollbar">
                      {["All", "New", "Confirmed", "Shipped", "Delivered", "Returned"].map(s => (
                        <button key={s} className="px-3 py-1.5 text-[9px] font-black uppercase tracking-tighter bg-gray-100 rounded-lg hover:bg-black hover:text-white transition-all whitespace-nowrap">{s}</button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    {orders.slice(0, 6).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50/50 rounded-2xl border border-transparent hover:border-gray-200 transition-all group cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center font-black text-[10px] shadow-sm border border-gray-100">
                            {order.customer_name[0]}
                          </div>
                          <div>
                            <p className="text-xs font-black text-gray-900">{order.customer_name}</p>
                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tight">{order.customer_phone} • {order.customer_wilaya}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right hidden sm:block">
                            <p className="text-[8px] font-black uppercase text-gray-400 tracking-widest">Status</p>
                            <span className={cn(
                              "text-[9px] font-black uppercase px-2 py-0.5 rounded-full",
                              order.status === "New" ? "bg-blue-50 text-blue-600" : 
                              order.status === "Confirmed" ? "bg-emerald-50 text-emerald-600" : 
                              "bg-gray-100 text-gray-600"
                            )}>{order.status}</span>
                          </div>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1.5 bg-white rounded-lg border border-gray-100 text-gray-400 hover:text-black shadow-sm"><CheckCircle2 className="w-3.5 h-3.5" /></button>
                            <button className="p-1.5 bg-white rounded-lg border border-gray-100 text-gray-400 hover:text-black shadow-sm"><MoreHorizontal className="w-3.5 h-3.5" /></button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {orders.length === 0 && (
                      <div className="text-center py-20 text-gray-400">
                        <ShoppingBag className="w-10 h-10 mx-auto mb-4 opacity-20" />
                        <p className="text-xs font-bold">No orders found</p>
                      </div>
                    )}
                  </div>
                  
                  {orders.length > 0 && (
                    <button onClick={() => navigate("/orders")} className="w-full py-3 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-all border-t border-gray-50 mt-2">
                      View Full Order Manager
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50/50 rounded-2xl border border-transparent hover:border-gray-200 transition-all group">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                          <img src={JSON.parse(product.images)[0]} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <p className="text-xs font-black text-gray-900">{product.title}</p>
                          <div className="flex items-center gap-2">
                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tight">/p/{product.slug}</p>
                            <span className="w-1 h-1 bg-gray-200 rounded-full" />
                            <span className="text-[9px] font-black text-emerald-600 uppercase">Live</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                          <p className="text-[8px] font-black uppercase text-gray-400 tracking-widest">Visitors</p>
                          <p className="text-xs font-black">{Math.floor(Math.random() * 500)}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button onClick={() => window.open(`/p/${product.slug}`, '_blank')} className="p-2 bg-white rounded-lg border border-gray-100 text-gray-400 hover:text-black shadow-sm">
                            <ArrowUpRight className="w-4 h-4" />
                          </button>
                          <button onClick={() => navigate(`/products/edit/${product.id}`)} className="p-2 bg-white rounded-lg border border-gray-100 text-gray-400 hover:text-black shadow-sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {products.length === 0 && (
                    <div className="text-center py-20 text-gray-400">
                      <Package className="w-10 h-10 mx-auto mb-4 opacity-20" />
                      <p className="text-xs font-bold">No landing pages created</p>
                    </div>
                  )}
                  <button onClick={() => navigate("/products/new")} className="w-full py-4 border-2 border-dashed border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:border-black hover:text-black transition-all">
                    + Create New Landing Page
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: Product / Landing Pages Detailed List */}
      <section className="bg-white rounded-[32px] border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-xl font-black tracking-tight">Active Campaigns</h3>
          <div className="flex gap-2">
            <button className="p-2 bg-gray-50 rounded-lg text-gray-400 hover:text-black"><Search className="w-4 h-4" /></button>
            <button className="p-2 bg-gray-50 rounded-lg text-gray-400 hover:text-black"><BarChart3 className="w-4 h-4" /></button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 text-[10px] font-black uppercase tracking-widest text-gray-400">
                <th className="px-8 py-4">Product</th>
                <th className="px-8 py-4">Daily Budget</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Visitors</th>
                <th className="px-8 py-4">Orders</th>
                <th className="px-8 py-4">CTR</th>
                <th className="px-8 py-4">CPC</th>
                <th className="px-8 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                        <img src={JSON.parse(product.images)[0]} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-gray-900">{product.title}</span>
                        <span className="text-[9px] font-bold text-gray-400 uppercase">/p/{product.slug}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm font-bold">2,000 DZD</td>
                  <td className="px-8 py-5">
                    <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase rounded-full">Active</span>
                  </td>
                  <td className="px-8 py-5 text-sm font-bold">{Math.floor(Math.random() * 1000)}</td>
                  <td className="px-8 py-5 text-sm font-bold">{Math.floor(Math.random() * 50)}</td>
                  <td className="px-8 py-5 text-sm font-bold">{(Math.random() * 5 + 1).toFixed(2)}%</td>
                  <td className="px-8 py-5 text-sm font-bold">{(Math.random() * 10 + 5).toFixed(0)} DZD</td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-black"><ArrowUpRight className="w-4 h-4" /></button>
                      <button className="p-2 text-gray-400 hover:text-black"><MoreHorizontal className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}

