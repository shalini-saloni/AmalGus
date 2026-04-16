"use client";

import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";
import {
  Layers,
  Tag,
  Package,
  ArrowRight,
  Search,
  Menu,
  X,
  Filter,
} from "lucide-react";
import { useState, useMemo } from "react";

export default function MarketplacePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map((p) => p.category)));
    return ["All", ...cats.sort()];
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCat =
        selectedCategory === "All" || p.category === selectedCategory;
      const matchesSearch =
        !searchTerm.trim() ||
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  const categoryColors: Record<string, string> = {
    "Tempered Glass": "from-blue-500 to-sky-400",
    "Laminated Glass": "from-violet-500 to-purple-400",
    "Float Glass": "from-cyan-500 to-teal-400",
    "Insulated Glass": "from-emerald-500 to-green-400",
    Hardware: "from-amber-500 to-orange-400",
    Mirrors: "from-pink-500 to-rose-400",
    "Specialty Glass": "from-red-500 to-orange-400",
  };

  return (
    <div className="min-h-screen bg-[#f0f4f8] text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-card shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image
              src="/amalgus_icon.webp"
              alt="AmalGus Logo"
              width={48}
              height={48}
              className="w-12 h-12 drop-shadow-md group-hover:drop-shadow-lg transition-all"
            />
            <span className="text-xl font-extrabold tracking-tight text-gradient bg-gradient-to-r from-slate-900 to-slate-600">
              AmalGus
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/" className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 transition-colors">
              Discovery
            </Link>
            <Link href="/marketplace" className="px-4 py-2 rounded-lg text-sm font-semibold text-blue-600 bg-blue-50 transition-colors">
              Marketplace
            </Link>
            <Link href="/suppliers" className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 transition-colors">
              Suppliers
            </Link>
          </nav>
          <button className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 px-4 py-3 space-y-1 bg-white/95 backdrop-blur">
            <Link href="/" className="block px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">Discovery</Link>
            <Link href="/marketplace" className="block px-4 py-2.5 rounded-lg text-sm font-semibold text-blue-600 bg-blue-50">Marketplace</Link>
            <Link href="/suppliers" className="block px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">Suppliers</Link>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
            Glass Marketplace
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl">
            Browse our complete catalog of glass products, hardware, and allied
            building materials from verified suppliers.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search products…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 text-sm shadow-sm transition-all"
            />
          </div>
          {/* Category pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-slate-900 text-white shadow-md"
                    : "bg-white border border-slate-200 text-slate-600 hover:border-blue-200 hover:text-blue-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-100 transition-all duration-300 overflow-hidden group"
            >
              {/* Category color bar */}
              <div
                className={`h-1.5 bg-gradient-to-r ${
                  categoryColors[product.category] ||
                  "from-slate-400 to-slate-300"
                }`}
              />

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors leading-snug">
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

                <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                  {product.description}
                </p>

                {/* Key specs */}
                <div className="flex flex-wrap gap-1.5">
                  {Object.entries(product.specifications)
                    .slice(0, 3)
                    .map(([key, value]) => (
                      <span
                        key={key}
                        className="text-[11px] bg-slate-50 text-slate-500 px-2 py-1 rounded-md border border-slate-100 font-medium"
                      >
                        {key.replace(/([A-Z])/g, " $1").trim()}: {value}
                      </span>
                    ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="inline-flex items-center gap-1 text-sm text-slate-500 font-medium">
                    <Package className="w-3.5 h-3.5" />
                    {product.supplier}
                  </span>
                  <button className="text-sm text-blue-600 font-semibold hover:text-blue-800 inline-flex items-center gap-1 transition-colors">
                    Details
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
              <Search className="w-7 h-7 text-slate-400" />
            </div>
            <p className="text-slate-500 font-medium">
              No products found matching your filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchTerm("");
              }}
              className="mt-3 text-sm text-blue-600 font-semibold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center text-white font-bold text-sm">A</div>
            <span className="text-sm font-bold text-slate-700">AmalGus</span>
            <span className="text-sm text-slate-400 ml-1">&copy; {new Date().getFullYear()} Glass Marketplace</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <Link href="/" className="hover:text-blue-600 transition-colors">Discovery</Link>
            <Link href="/suppliers" className="hover:text-blue-600 transition-colors">Suppliers</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
