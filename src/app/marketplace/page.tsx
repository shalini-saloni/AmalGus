"use client";

import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";
import {
  Layers,
  Tag,
  Package,
  Search,
  Filter,
  ShoppingCart,
  TrendingDown,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { useState, useMemo } from "react";

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedThickness, setSelectedThickness] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map((p) => p.category)));
    return ["All", ...cats.sort()];
  }, []);

  const thicknesses = useMemo(() => {
    const thicks = new Set<string>();
    products.forEach((p) => {
      if (p.specifications.thickness) {
        // Extract just the mm part if possible
        const match = p.specifications.thickness.match(/\\d+mm/);
        if (match) thicks.add(match[0]);
      }
    });
    return ["All", ...Array.from(thicks).sort()];
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCat =
        selectedCategory === "All" || p.category === selectedCategory;
      const matchesThick =
        selectedThickness === "All" ||
        (p.specifications.thickness &&
          p.specifications.thickness.includes(selectedThickness));
      const matchesSearch =
        !searchTerm.trim() ||
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCat && matchesSearch && matchesThick;
    });
  }, [selectedCategory, selectedThickness, searchTerm]);

  const hardwareProducts = useMemo(() => {
    return products.filter(p => p.category.includes("Hardware") || p.category.includes("Sealant") || p.category.includes("Frame")).slice(0, 3);
  }, []);

  const categoryColors: Record<string, string> = {
    "Tempered Glass": "from-blue-500 to-sky-400",
    "Laminated Glass": "from-violet-500 to-purple-400",
    "Float Glass": "from-cyan-500 to-teal-400",
    "Insulated Glass": "from-emerald-500 to-green-400",
    Hardware: "from-amber-500 to-orange-400",
    Mirrors: "from-pink-500 to-rose-400",
    "Specialty Glass": "from-red-500 to-orange-400",
  };

  // Mock vendors for comparison
  const getMockVendors = (basePrice: string) => {
    // Extract the first number found in the string (e.g. "45" from "₹45 - ₹60 /sq.ft")
    const match = basePrice.match(/\d+(\.\d+)?/);
    const priceNum = match ? parseFloat(match[0]) : 45;
    
    return [
      { name: "PrimeGlass India", price: `₹${(priceNum * 0.95).toFixed(0)}`, delivery: "2-3 Days", rating: 4.8 },
      { name: "BuildCorp Materials", price: `₹${(priceNum * 1.05).toFixed(0)}`, delivery: "Next Day", rating: 4.9 },
    ];
  };

  return (
    <div className="min-h-screen bg-[#E7F6F5] text-[#2A2F35] selection:bg-cyan-200">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
            Glass Marketplace
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl">
            Browse our complete catalog. Compare multi-vendor pricing, specs, and order directly.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Advanced Sidebar Filters */}
          <aside className="w-full lg:w-64 flex-shrink-0 space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
                <Filter className="w-4 h-4" /> Filters
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                    Search
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 text-sm border border-slate-200 rounded-lg bg-slate-50 outline-none focus:border-blue-500"
                  >
                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                    Thickness
                  </label>
                  <select
                    value={selectedThickness}
                    onChange={(e) => setSelectedThickness(e.target.value)}
                    className="w-full p-2 text-sm border border-slate-200 rounded-lg bg-slate-50 outline-none focus:border-blue-500"
                  >
                    {thicknesses.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedThickness("All");
                    setSearchTerm("");
                  }}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-sm font-semibold transition"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="grid sm:grid-cols-2 gap-6 items-start">
              {filtered.map((product) => {
                const isExpanded = expandedProduct === product.id;
                const vendors = getMockVendors(product.price);
                
                return (
                <div
                  key={product.id}
                  className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col ${
                    isExpanded ? "shadow-md border-blue-200 ring-1 ring-blue-100" : "border-slate-200 shadow-sm hover:border-blue-100"
                  }`}
                >
                  <div className={`h-1.5 bg-gradient-to-r ${categoryColors[product.category] || "from-slate-400 to-slate-300"}`} />
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-3">
                      <h3 className="text-lg font-bold text-slate-900 leading-snug mb-2">
                        {product.name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100">
                          <Layers className="w-3 h-3" />
                          {product.category}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">
                          <Tag className="w-3 h-3" />
                          {product.price}
                        </span>
                      </div>
                    </div>

                    <p className="text-slate-500 text-sm leading-relaxed mb-4">
                      {product.description}
                    </p>

                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {Object.entries(product.specifications).slice(0, 3).map(([key, value]) => (
                          <span key={key} className="text-[11px] bg-slate-50 text-slate-500 px-2 py-1 rounded-md border border-slate-100 font-medium">
                            {key.replace(/([A-Z])/g, " $1").trim()}: {value}
                          </span>
                        ))}
                      </div>

                      <button 
                        onClick={() => setExpandedProduct(isExpanded ? null : product.id)}
                        className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition active:scale-[0.98]"
                      >
                        {isExpanded ? "Hide Vendors" : "Compare Vendors & Order"}
                      </button>
                      
                      {/* Multi-Vendor Comparison Expansion */}
                      {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-slate-100 animate-in fade-in slide-in-from-top-2">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Available Suppliers</h4>
                        <div className="space-y-2">
                          {/* Main Supplier */}
                          <div className="flex items-center justify-between p-3 rounded-lg border border-blue-100 bg-blue-50/30">
                            <div>
                               <div className="font-semibold text-sm flex items-center gap-1">
                                  {product.supplier} <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                               </div>
                               <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                                 <Clock className="w-3 h-3" /> Standard Delivery
                               </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-slate-900">{product.price}</div>
                              <button className="text-[11px] font-semibold text-blue-600 hover:underline">Add to Cart</button>
                            </div>
                          </div>
                          {/* Mock Vendors */}
                          {vendors.map((v, i) => (
                             <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50 hover:border-slate-200 transition">
                             <div>
                                <div className="font-semibold text-sm text-slate-700 font-medium">{v.name}</div>
                                <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                                  <TrendingDown className="w-3 h-3 text-emerald-500" /> {v.delivery}
                                </div>
                             </div>
                             <div className="text-right">
                               <div className="font-bold text-slate-800">{v.price}<span className="text-[10px] font-normal text-slate-400">/sq.ft</span></div>
                               <button className="text-[11px] font-semibold text-slate-600 hover:text-blue-600">Add to Cart</button>
                             </div>
                           </div>
                          ))}
                        </div>
                      </div>
                    )}
                    </div>
                  </div>
                </div>
              )})}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20">
                <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">No products match your filters.</p>
              </div>
            )}

            {/* Cross Selling Section */}
            <div className="mt-16 pt-10 border-t border-slate-200">
               <h2 className="text-2xl font-extrabold mb-2">Frequently Bought Together</h2>
               <p className="text-slate-500 mb-6">Complete your glass installation with industry-grade hardware, sealants, and frames.</p>
               <div className="grid sm:grid-cols-3 gap-4">
                  {hardwareProducts.map(hp => (
                     <div key={hp.id} className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
                        <div>
                          <div className="text-xs font-bold text-amber-600 bg-amber-50 inline-block px-2 py-0.5 rounded mb-2">Allied Product</div>
                          <h4 className="font-bold text-slate-900 text-sm mb-1">{hp.name}</h4>
                          <p className="text-xs text-slate-500 line-clamp-2 mb-3">{hp.description}</p>
                        </div>
                        <div className="flex justify-between items-center mt-3">
                           <span className="font-bold text-sm">{hp.price}</span>
                           <button className="text-blue-600 bg-blue-50 hover:bg-blue-100 p-1.5 rounded-lg"><ShoppingCart className="w-4 h-4"/></button>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="relative w-6 h-6">
               <Image src="/amalgus_icon.webp" alt="AmalGus Logo" fill className="object-contain" />
            </div>
            <span className="text-sm font-bold text-slate-700">AmalGus</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
