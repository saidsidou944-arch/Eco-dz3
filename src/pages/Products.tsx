import { useState, useEffect } from "react";
import { Plus, Search, MoreVertical, ExternalLink, Trash2, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Products({ user }: { user: any }) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/products?sellerId=${user.id}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, [user.id]);

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter">Products</h1>
          <p className="text-gray-500 mt-1 font-medium">Manage your landing pages and ad creatives.</p>
        </div>
        <Link 
          to="/products/new"
          className="bg-black text-white px-8 py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-black/10 uppercase text-xs tracking-widest"
        >
          <Plus className="w-5 h-5" />
          Create New Landing Page
        </Link>
      </header>

      <div className="bg-white rounded-[32px] border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between bg-gray-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search products by title or slug..." 
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/5 text-sm font-medium"
            />
          </div>
          <div className="flex gap-2">
            <button className="px-5 py-3 text-[10px] font-black uppercase tracking-widest border border-gray-200 rounded-xl hover:bg-white transition-all bg-white shadow-sm">Filter</button>
            <button className="px-5 py-3 text-[10px] font-black uppercase tracking-widest border border-gray-200 rounded-xl hover:bg-white transition-all bg-white shadow-sm">Export CSV</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 text-[10px] font-black uppercase tracking-widest text-gray-400">
                <th className="px-8 py-4">Product</th>
                <th className="px-8 py-4">Price</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Performance</th>
                <th className="px-8 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                [1,2,3,4].map(i => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-8 py-6"><div className="h-12 w-48 bg-gray-100 rounded-xl"></div></td>
                    <td className="px-8 py-6"><div className="h-6 w-24 bg-gray-100 rounded-xl"></div></td>
                    <td className="px-8 py-6"><div className="h-6 w-20 bg-gray-100 rounded-xl"></div></td>
                    <td className="px-8 py-6"><div className="h-6 w-32 bg-gray-100 rounded-xl"></div></td>
                    <td className="px-8 py-6"></td>
                  </tr>
                ))
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <div className="max-w-xs mx-auto space-y-4">
                      <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto">
                        <Package className="w-8 h-8 text-gray-300" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-black text-gray-900">No products yet</p>
                        <p className="text-xs text-gray-500 font-medium">Create your first landing page to start selling.</p>
                      </div>
                      <Link to="/products/new" className="inline-block text-xs font-black text-blue-600 underline uppercase tracking-widest">Add Product</Link>
                    </div>
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <motion.tr 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={product.id} 
                    className="hover:bg-gray-50/50 transition-colors group cursor-pointer"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gray-100 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-200 shadow-sm">
                          {JSON.parse(product.images)?.[0] ? (
                            <img src={JSON.parse(product.images)[0]} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400"><Package className="w-6 h-6" /></div>
                          )}
                        </div>
                        <div>
                          <p className="font-black text-gray-900 text-sm">{product.title}</p>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">/p/{product.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-sm font-black text-gray-900">{product.price.toLocaleString()} DZD</span>
                    </td>
                    <td className="px-8 py-5">
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase rounded-full">Active</span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="text-[8px] font-black uppercase text-gray-400 tracking-widest">Visitors</p>
                          <p className="text-xs font-black">{Math.floor(Math.random() * 1000)}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-[8px] font-black uppercase text-gray-400 tracking-widest">Orders</p>
                          <p className="text-xs font-black">{Math.floor(Math.random() * 50)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => window.open(`/p/${product.slug}`, '_blank')} className="p-2 bg-white rounded-lg border border-gray-200 text-gray-400 hover:text-black shadow-sm">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-white rounded-lg border border-gray-200 text-gray-400 hover:text-red-600 shadow-sm">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
