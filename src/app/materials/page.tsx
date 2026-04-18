"use client";

import { alliedProducts } from "@/data/alliedProducts";
import {
  Search,
  Filter,
  Package,
  CheckCircle,
  XCircle,
  Tag,
  Building2,
  ChevronRight,
} from "lucide-react";
import { useState, useMemo } from "react";
import Image from "next/image";

export default function MaterialsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(alliedProducts.map((p) => p.category)));
    return ["All", ...cats.sort()];
  }, []);

  const filtered = useMemo(() => {
    return alliedProducts.filter((p) => {
      const matchesCat =
        selectedCategory === "All" || p.category === selectedCategory;
      const matchesSearch =
        !searchTerm.trim() ||
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.supplier.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  const inStockCount = filtered.filter((p) => p.inStock).length;
  const outStockCount = filtered.filter((p) => !p.inStock).length;

  return (
    <div className="min-h-screen bg-[#E7F6F5] text-[#2A2F35] font-sans selection:bg-cyan-200">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
            Allied Products
          </h1>
          <p className="text-slate-500 text-lg max-w-3xl">
            Glass never goes alone. Browse the complete ecosystem of hardware,
            sealants, frames, fittings, and machinery that powers every glass
            installation.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="bg-white rounded-xl px-5 py-3 border border-slate-200 shadow-sm flex items-center gap-3">
            <Package className="w-5 h-5 text-cyan-600" />
            <div>
              <span className="text-2xl font-black text-slate-900">
                {filtered.length}
              </span>
              <span className="text-sm text-slate-500 ml-1">Products</span>
            </div>
          </div>
          <div className="bg-white rounded-xl px-5 py-3 border border-slate-200 shadow-sm flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-500" />
            <div>
              <span className="text-2xl font-black text-emerald-600">
                {inStockCount}
              </span>
              <span className="text-sm text-slate-500 ml-1">In Stock</span>
            </div>
          </div>
          <div className="bg-white rounded-xl px-5 py-3 border border-slate-200 shadow-sm flex items-center gap-3">
            <XCircle className="w-5 h-5 text-red-400" />
            <div>
              <span className="text-2xl font-black text-red-500">
                {outStockCount}
              </span>
              <span className="text-sm text-slate-500 ml-1">Out of Stock</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search products, suppliers, categories…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-300 text-base text-slate-900 shadow-sm transition-all placeholder:text-slate-400"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-slate-900 text-white shadow-md"
                    : "bg-white border border-slate-200 text-slate-600 hover:border-cyan-200 hover:text-cyan-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-400">
              No products found
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              Try adjusting your search or category filter.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-cyan-100 transition-all duration-300 overflow-hidden flex flex-col group"
              >
                {/* Top accent bar */}
                <div className="h-1.5 bg-gradient-to-r from-cyan-500 to-[#5A878B]" />

                <div className="p-6 flex flex-col flex-1">
                  {/* Category + Stock tag */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold bg-cyan-50 text-cyan-700 border border-cyan-100 px-2.5 py-1 rounded-md flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {product.category}
                    </span>
                    {product.inStock ? (
                      <span className="text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        In Stock
                      </span>
                    ) : (
                      <span className="text-xs font-bold bg-red-50 text-red-500 border border-red-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                        <XCircle className="w-3 h-3" />
                        Out of Stock
                      </span>
                    )}
                  </div>

                  {/* Name */}
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-cyan-700 transition-colors leading-tight">
                    {product.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-500 leading-relaxed mb-5 flex-1">
                    {product.description}
                  </p>

                  {/* Price */}
                  <div className="bg-slate-50 rounded-xl px-4 py-3 mb-4 border border-slate-100">
                    <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                      Price
                    </span>
                    <p className="text-xl font-black text-[#2A2F35] mt-0.5">
                      {product.price}
                    </p>
                  </div>

                  {/* Supplier */}
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-4 border-t border-slate-100 pt-3">
                    <Building2 className="w-3.5 h-3.5" />
                    <span className="font-semibold text-slate-500">
                      {product.supplier}
                    </span>
                  </div>

                  {/* CTA */}
                  <button
                    className={`w-full font-semibold py-3 rounded-xl text-sm transition-all active:scale-[0.97] flex items-center justify-center gap-2 ${
                      product.inStock
                        ? "bg-slate-900 hover:bg-slate-800 text-white"
                        : "bg-slate-100 text-slate-400 cursor-not-allowed"
                    }`}
                    disabled={!product.inStock}
                  >
                    {product.inStock ? "Request Quote" : "Notify When Available"}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="relative w-6 h-6">
              <Image
                src="/amalgus_icon.webp"
                alt="AmalGus Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-sm font-bold text-slate-700">Glass121</span>
            <span className="text-sm text-slate-400 ml-1">
              &copy; {new Date().getFullYear()} Powered by AmalGus
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
