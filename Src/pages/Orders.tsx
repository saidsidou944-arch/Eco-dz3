import { useState, useEffect } from "react";
import { Search, Filter, CheckCircle, Clock, Truck, XCircle, MoreHorizontal } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";

const STATUS_COLORS: any = {
  'New': 'bg-blue-50 text-blue-600',
  'Confirmed': 'bg-purple-50 text-purple-600',
  'Shipped': 'bg-orange-50 text-orange-600',
  'Delivered': 'bg-emerald-50 text-emerald-600',
  'Cancelled': 'bg-red-50 text-red-600',
};

export default function Orders({ user }: { user: any }) {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = () => {
    fetch(`/api/orders?sellerId=${user.id}`)
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, [user.id]);

  const updateStatus = async (orderId: number, newStatus: string) => {
    await fetch(`/api/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus })
    });
    fetchOrders();
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-500 mt-1">Track and manage your customer orders.</p>
      </header>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by customer or phone..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-black/5"
            />
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm font-medium border border-gray-200 rounded-xl hover:bg-gray-50 flex items-center gap-2">
              <Filter className="w-4 h-4" /> All Statuses
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Order ID</th>
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Product</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                [1,2,3].map(i => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={6} className="px-6 py-4"><div className="h-12 bg-gray-100 rounded-lg w-full"></div></td>
                  </tr>
                ))
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No orders yet. Share your product link to get started!
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <motion.tr 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={order.id} 
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-mono text-xs font-bold text-gray-400">#ORD-{order.id.toString().padStart(4, '0')}</td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-bold text-gray-900">{order.customer_name}</p>
                        <p className="text-xs text-gray-500">{order.customer_phone}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{order.customer_wilaya}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-700">{order.product_title}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {format(new Date(order.created_at), 'MMM dd, HH:mm')}
                    </td>
                    <td className="px-6 py-4">
                      <select 
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className={cn(
                          "text-xs font-bold px-3 py-1.5 rounded-full border-none focus:ring-0 cursor-pointer",
                          STATUS_COLORS[order.status]
                        )}
                      >
                        <option value="New">New</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-gray-400 hover:text-black rounded-lg transition-colors">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
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

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
