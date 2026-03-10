import { useState, useEffect } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import { 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  MessageCircle, 
  Star, 
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Store,
  Phone,
  Clock,
  Award,
  Users
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PublicProduct() {
  const { slug } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [orderStatus, setOrderStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    wilaya: "Alger"
  });

  useEffect(() => {
    fetch(`/api/products/${slug}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      });
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOrderStatus('submitting');
    
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          customerName: formData.name,
          customerPhone: formData.phone,
          customerAddress: formData.address,
          customerWilaya: formData.wilaya
        })
      });
      
      if (res.ok) {
        setOrderStatus('success');
      }
    } catch (err) {
      console.error(err);
      setOrderStatus('idle');
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
    </div>
  );

  if (!product) return <div className="p-20 text-center">Product not found</div>;

  const images = JSON.parse(product.images || "[]");

  return (
    <div className="min-h-screen bg-white pb-20 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <Store className="text-white w-5 h-5" />
            </div>
            <span className="font-black text-xl tracking-tighter">SellerSaaS</span>
          </div>
          <a 
            href={`https://wa.me/${product.whatsapp_number}`}
            className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-full text-xs font-black shadow-lg shadow-emerald-500/20"
          >
            <Phone className="w-3 h-3" />
            {product.whatsapp_number}
          </a>
        </div>
      </header>

      <div className="max-w-6xl mx-auto md:pt-12 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left: Images */}
          <div className="space-y-6">
            <div className="aspect-square bg-gray-50 md:rounded-[40px] overflow-hidden relative group">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  src={images[currentImage]} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              
              {images.length > 1 && (
                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                    className="p-3 bg-white/90 backdrop-blur rounded-full shadow-xl"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={() => setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                    className="p-3 bg-white/90 backdrop-blur rounded-full shadow-xl"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              )}

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_: any, i: number) => (
                  <div key={i} className={cn("w-2 h-2 rounded-full transition-all", currentImage === i ? "bg-black w-6" : "bg-black/20")} />
                ))}
              </div>
            </div>
            
            <div className="hidden md:flex gap-4 overflow-x-auto pb-2">
              {images.map((img: string, i: number) => (
                <button 
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={cn(
                    "w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 border-2 transition-all",
                    currentImage === i ? "border-black scale-105" : "border-transparent opacity-50"
                  )}
                >
                  <img src={img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Content & Form */}
            <div className="px-6 md:px-0 space-y-10">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex text-orange-400">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">4.9/5 (120+ Reviews)</span>
                </div>
                <div className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1 animate-pulse">
                  <Users className="w-3 h-3" />
                  12 يشاهدون الآن
                </div>
              </div>
              
              <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tighter">{product.title}</h1>
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-black text-emerald-600 tracking-tighter">{product.price.toLocaleString()} DZD</span>
                  <div className="flex flex-col">
                    <span className="text-gray-400 line-through text-sm font-bold">{(product.price * 1.4).toLocaleString()} DZD</span>
                    <span className="text-[10px] font-black uppercase text-red-500 bg-red-50 px-2 py-0.5 rounded-full">تخفيض -40%</span>
                  </div>
                </div>
              </div>

              {/* Countdown Timer */}
              <div className="bg-gray-900 text-white p-4 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-orange-400" />
                  <span className="text-xs font-black uppercase tracking-widest">ينتهي العرض خلال:</span>
                </div>
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-black">02</span>
                    <span className="text-[8px] uppercase opacity-50">ساعة</span>
                  </div>
                  <span className="text-lg font-black opacity-30">:</span>
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-black">45</span>
                    <span className="text-[8px] uppercase opacity-50">دقيقة</span>
                  </div>
                  <span className="text-lg font-black opacity-30">:</span>
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-black">12</span>
                    <span className="text-[8px] uppercase opacity-50">ثانية</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed text-lg font-medium whitespace-pre-line">
                {product.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-5 rounded-3xl flex flex-col items-center text-center gap-3 border border-gray-100">
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <Truck className="text-blue-600 w-6 h-6" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-black uppercase tracking-widest">توصيل سريع</p>
                    <p className="text-[9px] text-gray-400 font-bold">لـ 58 ولاية</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-5 rounded-3xl flex flex-col items-center text-center gap-3 border border-gray-100">
                  <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center">
                    <ShieldCheck className="text-emerald-600 w-6 h-6" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-black uppercase tracking-widest">الدفع عند الاستلام</p>
                    <p className="text-[9px] text-gray-400 font-bold">COD Algeria</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-5 rounded-3xl flex flex-col items-center text-center gap-3 border border-gray-100">
                  <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
                    <Award className="text-purple-600 w-6 h-6" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-black uppercase tracking-widest">ضمان الجودة</p>
                    <p className="text-[9px] text-gray-400 font-bold">100% أصلي</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Form */}
            <div id="order-form" className="bg-black text-white p-8 md:p-12 rounded-[48px] shadow-2xl shadow-black/30 space-y-10 relative overflow-hidden border border-white/10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px]" />
              
              {orderStatus === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10 space-y-6"
                >
                  <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/20">
                    <CheckCircle2 className="text-white w-12 h-12" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-4xl font-black tracking-tighter">تم استلام طلبك!</h3>
                    <p className="text-gray-400 font-medium">سنتصل بك قريبا لتأكيد الطلب وإرسال المنتج.</p>
                  </div>
                  <button 
                    onClick={() => setOrderStatus('idle')}
                    className="bg-white text-black px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-gray-100 transition-all shadow-xl"
                  >
                    اطلب مرة أخرى
                  </button>
                </motion.div>
              ) : (
                <>
                  <div className="space-y-4 text-center">
                    <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full">
                      <ShoppingBag className="w-4 h-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">الكمية محدودة - اطلب الآن</span>
                    </div>
                    <h3 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight">املأ المعلومات لإتمام الطلب</h3>
                    <p className="text-gray-400 font-medium text-lg">الدفع يكون عند استلام المنتج</p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">الاسم الكامل / Full Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="مثال: أحمد بن علي"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-3xl focus:ring-2 focus:ring-emerald-500 transition-all text-white placeholder:text-gray-700 font-bold text-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">رقم الهاتف / Phone Number</label>
                      <input 
                        required
                        type="tel" 
                        placeholder="05XX XX XX XX"
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-3xl focus:ring-2 focus:ring-emerald-500 transition-all text-white placeholder:text-gray-700 font-bold text-lg"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">الولاية / Wilaya</label>
                        <select 
                          value={formData.wilaya}
                          onChange={e => setFormData({...formData, wilaya: e.target.value})}
                          className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-3xl focus:ring-2 focus:ring-emerald-500 transition-all text-white font-bold text-lg"
                        >
                          {["Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Bejaia", "Biskra", "Bechar", "Blida", "Bouira", "Tamanrasset", "Tebessa", "Tlemcen", "Tiaret", "Tizi Ouzou", "Alger", "Djelfa", "Jijel", "Setif", "Saida", "Skikda", "Sidi Bel Abbes", "Anaba", "Guelma", "Constantine", "Medea", "Mostaganem", "MSila", "Mascara", "Ouargla", "Oran", "El Bayadh", "Illizi", "Bordj Bou Arreridj", "Boumerdes", "El Tarf", "Tindouf", "Tissemsilt", "El Oued", "Khenchela", "Souk Ahras", "Tipaza", "Mila", "Ain Defla", "Naama", "Ain Temouchent", "Ghardaia", "Relizane"].map(w => (
                            <option key={w} className="text-black">{w}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">العنوان / Address</label>
                        <input 
                          required
                          type="text" 
                          placeholder="البلدية، الحي..."
                          value={formData.address}
                          onChange={e => setFormData({...formData, address: e.target.value})}
                          className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-3xl focus:ring-2 focus:ring-emerald-500 transition-all text-white placeholder:text-gray-700 font-bold text-lg"
                        />
                      </div>
                    </div>

                    <div className="pt-4">
                      <button 
                        disabled={orderStatus === 'submitting'}
                        type="submit"
                        className="w-full bg-emerald-500 text-white py-7 rounded-[32px] font-black text-2xl shadow-[0_20px_50px_rgba(16,185,129,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all flex flex-col items-center justify-center gap-1"
                      >
                        <div className="flex items-center gap-3">
                          <ShoppingBag className="w-8 h-8" />
                          <span>{orderStatus === 'submitting' ? 'جاري الطلب...' : 'تأكيد الطلب الآن'}</span>
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.2em] opacity-70">Cash on Delivery</span>
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>

            <div className="flex items-center justify-center gap-10 py-6 border-t border-gray-100">
              <div className="flex flex-col items-center gap-2">
                <MessageCircle className="text-emerald-500 w-6 h-6" />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Support</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <ShieldCheck className="text-blue-500 w-6 h-6" />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Secure</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Truck className="text-purple-500 w-6 h-6" />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Tracked</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Mobile Button */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-gray-100 z-50">
        <button 
          onClick={() => document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' })}
          className="w-full bg-emerald-500 text-white py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20"
        >
          <ShoppingBag className="w-5 h-5" />
          اطلب الآن - {product.price.toLocaleString()} DZD
        </button>
      </div>

      {/* Footer */}
      <footer className="mt-20 py-12 bg-gray-50 border-t border-gray-100 text-center">
        <div className="max-w-6xl mx-auto px-4 space-y-4">
          <div className="flex items-center justify-center gap-2 opacity-30">
            <Store className="w-5 h-5" />
            <span className="font-black tracking-tighter">SellerSaaS</span>
          </div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">© 2026 {product.store_name} • All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
