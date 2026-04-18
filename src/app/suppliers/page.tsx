"use client";

import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";
import {
  MapPin,
  Star,
  Package,
  Menu,
  X,
  ExternalLink,
  Award,
  ShieldCheck,
  Factory,
} from "lucide-react";
import { useState, useMemo } from "react";

interface SupplierInfo {
  name: string;
  productCount: number;
  categories: string[];
  priceRange: string;
}

export default function SuppliersPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Derive unique suppliers from the product catalog
  const suppliers: SupplierInfo[] = useMemo(() => {
    const map = new Map<string, SupplierInfo>();
    products.forEach((p) => {
      const existing = map.get(p.supplier);
      if (existing) {
        existing.productCount += 1;
        if (!existing.categories.includes(p.category)) {
          existing.categories.push(p.category);
        }
      } else {
        map.set(p.supplier, {
          name: p.supplier,
          productCount: 1,
          categories: [p.category],
          priceRange: p.price,
        });
      }
    });
    return Array.from(map.values()).sort(
      (a, b) => b.productCount - a.productCount
    );
  }, []);

  const badges = [
    { icon: <ShieldCheck className="w-3.5 h-3.5" />, label: "Verified" },
    { icon: <Award className="w-3.5 h-3.5" />, label: "Top Rated" },
  ];

  const gradients = [
    "from-blue-500 to-cyan-400",
    "from-violet-500 to-purple-400",
    "from-emerald-500 to-teal-400",
    "from-amber-500 to-orange-400",
    "from-pink-500 to-rose-400",
    "from-red-500 to-orange-400",
    "from-indigo-500 to-blue-400",
    "from-cyan-500 to-sky-400",
  ];

  return (
    <div className="min-h-screen bg-[#E7F6F5] text-[#2A2F35] selection:bg-cyan-200">


      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Page header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
            Verified Suppliers
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl">
            Connect with trusted manufacturers, fabricators, and suppliers in the
            glass and allied products industry.
          </p>
        </div>

        {/* Supplier Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {suppliers.map((supplier, idx) => (
            <div
              key={supplier.name}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-100 transition-all duration-300 overflow-hidden group"
            >
              {/* Top gradient bar */}
              <div className="h-1.5 bg-gradient-to-r from-cyan-500 to-[#5A878B]" />
              <div className="flex-1 p-6 flex flex-col">
                {/* Avatar + Name */}
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-600 to-[#5A878B] flex items-center justify-center text-white shadow-lg flex-shrink-0">
                    <Factory className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors truncate">
                      {supplier.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      {badges.slice(0, idx % 2 === 0 ? 2 : 1).map((b, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100"
                        >
                          {b.icon}
                          {b.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-center">
                    <div className="text-2xl font-black text-slate-900">
                      {supplier.productCount}
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium uppercase tracking-wide">
                      Products
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="text-2xl font-black text-slate-900">
                        {(4.2 + (idx * 0.15) % 0.8).toFixed(1)}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium uppercase tracking-wide">
                      Rating
                    </div>
                  </div>
                </div>

                {/* Categories */}
                <div className="mb-4">
                  <h4 className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-2 mt-4 border-t border-slate-100 pt-3">
                    Specializes In
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {supplier.categories.map((cat) => (
                      <span
                        key={cat}
                        className="text-xs bg-blue-50 text-blue-700 font-medium px-2.5 py-1 rounded-md border border-blue-100"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-auto flex gap-3 pt-1">
                  <button className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors active:scale-[0.97] flex items-center justify-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Contact
                  </button>
                  <button className="px-4 py-2.5 rounded-lg border border-slate-200 text-slate-600 hover:border-blue-200 hover:text-blue-600 transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
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
            <span className="text-sm text-slate-400 ml-1">&copy; {new Date().getFullYear()} Glass Marketplace</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <Link href="/" className="hover:text-blue-600 transition-colors">Discovery</Link>
            <Link href="/marketplace" className="hover:text-blue-600 transition-colors">Marketplace</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
