import { useState, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Upload, 
  X, 
  CheckCircle2, 
  ShoppingBag, 
  Star, 
  ShieldCheck, 
  Truck,
  Eye,
  Smartphone,
  Monitor
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CreateProduct({ user }: { user: any }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [previewMode, setPreviewMode] = useState<'mobile' | 'desktop'>('mobile');
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    price: "",
    description: "",
    whatsappNumber: user.whatsapp_number || "",
    wilayaInfo: "Delivery available to all 58 wilayas. Payment on delivery (COD)."
  });

  const handleAddImage = () => {
    const url = prompt("Enter image URL (Picsum recommended for demo):", `https://picsum.photos/seed/${Math.random()}/800/800`);
    if (url) setImages([...images, url]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          sellerId: user.id,
          price: parseFloat(formData.price || "0"),
          images
        })
      });
      
      if (res.ok) {
        navigate("/products");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-8 pb-20">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-black tracking-tight">Create Product</h1>
            <p className="text-gray-500 font-medium">Build your high-converting landing page.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-gray-200">
          <button 
            onClick={() => setPreviewMode('mobile')}
            className={cn("p-2 rounded-lg transition-all", previewMode === 'mobile' ? "bg-black text-white" : "text-gray-400 hover:text-black")}
          >
            <Smartphone className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setPreviewMode('desktop')}
            className={cn("p-2 rounded-lg transition-all", previewMode === 'desktop' ? "bg-black text-white" : "text-gray-400 hover:text-black")}
          >
            <Monitor className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT: Form Section */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-8">
          <section className="bg-white p-8 rounded-[32px] border border-gray-200 shadow-sm space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center font-bold text-sm">1</div>
                <h3 className="text-xl font-black tracking-tight">Product Details</h3>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Product Title</label>
                  <input 
                    required
                    type="text" 
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-')})}
                    placeholder="e.g. Premium Leather Watch" 
                    className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-black transition-all text-lg font-bold"
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Price (DZD)</label>
                    <input 
                      required
                      type="number" 
                      value={formData.price}
                      onChange={e => setFormData({...formData, price: e.target.value})}
                      placeholder="4500" 
                      className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-black transition-all text-lg font-bold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">WhatsApp Number</label>
                    <input 
                      required
                      type="text" 
                      value={formData.whatsappNumber}
                      onChange={e => setFormData({...formData, whatsappNumber: e.target.value})}
                      placeholder="0555 00 00 00" 
                      className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-black transition-all text-lg font-bold"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Description</label>
                  <textarea 
                    required
                    rows={4}
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    placeholder="Describe your product features..." 
                    className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-black transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center font-bold text-sm">2</div>
                <h3 className="text-xl font-black tracking-tight">Upload Photos</h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((img, i) => (
                  <div key={i} className="aspect-square rounded-2xl overflow-hidden relative group border border-gray-100 shadow-sm">
                    <img src={img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <button 
                      type="button"
                      onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                      className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button 
                  type="button"
                  onClick={handleAddImage}
                  className="aspect-square border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-black hover:text-black hover:bg-gray-50 transition-all"
                >
                  <Upload className="w-6 h-6" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Add Image</span>
                </button>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-100 flex items-center justify-between">
              <button type="button" onClick={() => navigate(-1)} className="text-gray-400 font-bold hover:text-black">Discard</button>
              <button 
                disabled={loading}
                type="submit"
                className="bg-black text-white px-10 py-4 rounded-2xl font-black text-lg shadow-xl shadow-black/10 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {loading ? "Publishing..." : "Launch Landing Page"}
              </button>
            </div>
          </section>
        </form>

        {/* RIGHT: Live Preview Section */}
        <div className="lg:col-span-5 hidden lg:block">
          <div className="sticky top-24 space-y-4">
            <div className="flex items-center gap-2 text-gray-400 ml-4">
              <Eye className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Live Preview</span>
            </div>
            
            <div className={cn(
              "bg-white rounded-[40px] border-[12px] border-gray-900 shadow-2xl overflow-hidden transition-all duration-500 mx-auto",
              previewMode === 'mobile' ? "w-[375px] h-[700px]" : "w-full h-[700px]"
            )}>
              <div className="h-full overflow-y-auto bg-gray-50 scrollbar-hide">
                {/* Mock Landing Page Content */}
                <div className="bg-white p-4 border-b border-gray-100 flex justify-between items-center">
                  <span className="font-black tracking-tighter text-lg">SellerSaaS</span>
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-3 h-3 text-white" />
                  </div>
                </div>

                <div className="p-4 space-y-6">
                  <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
                    {images[0] ? (
                      <img src={images[0]} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <Upload className="w-10 h-10" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex text-orange-400 gap-0.5">
                      {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
                    </div>
                    <h2 className="text-2xl font-black leading-tight">{formData.title || "Product Title"}</h2>
                    <p className="text-xl font-bold text-emerald-600">{(parseFloat(formData.price || "0")).toLocaleString()} DZD</p>
                  </div>

                  <div className="p-4 bg-white rounded-2xl border border-gray-100 space-y-4">
                    <div className="space-y-3">
                      <div className="h-10 bg-gray-50 rounded-xl" />
                      <div className="h-10 bg-gray-50 rounded-xl" />
                      <div className="grid grid-cols-2 gap-3">
                        <div className="h-10 bg-gray-50 rounded-xl" />
                        <div className="h-10 bg-gray-50 rounded-xl" />
                      </div>
                    </div>
                    <button className="w-full bg-black text-white py-3 rounded-xl font-black text-sm uppercase tracking-widest">
                      Order Now
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded-xl border border-gray-100 flex items-center gap-2">
                      <Truck className="w-4 h-4 text-blue-500" />
                      <span className="text-[10px] font-bold">Fast Delivery</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-gray-100 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      <span className="text-[10px] font-bold">COD Payment</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
