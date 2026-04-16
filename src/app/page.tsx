"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Search,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Package,
  Tag,
  Layers,
  Zap,
  Shield,
  TrendingUp,
  ArrowRight,
  Menu,
  X,
  Bot,
  Cpu,
} from "lucide-react";
import { Product } from "@/data/products";
import Link from "next/link";

type MatchedProduct = Product & {
  matchScore: number;
  matchExplanation: string;
};

function ScoreRing({ score }: { score: number }) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color =
    score >= 90
      ? "#10b981"
      : score >= 75
      ? "#3b82f6"
      : score >= 55
      ? "#f59e0b"
      : "#ef4444";

  return (
    <div className="relative w-28 h-28 flex-shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="6"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="score-ring"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-black text-slate-900">{score}</span>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          Match
        </span>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-4">
          <div className="shimmer-loading h-7 w-3/4 rounded-lg" />
          <div className="flex gap-2">
            <div className="shimmer-loading h-7 w-28 rounded-md" />
            <div className="shimmer-loading h-7 w-36 rounded-md" />
            <div className="shimmer-loading h-7 w-24 rounded-md" />
          </div>
          <div className="space-y-2">
            <div className="shimmer-loading h-4 w-full rounded" />
            <div className="shimmer-loading h-4 w-5/6 rounded" />
          </div>
          <div className="shimmer-loading h-20 w-full rounded-xl" />
        </div>
        <div className="md:w-36 flex flex-col items-center gap-4">
          <div className="shimmer-loading w-28 h-28 rounded-full" />
          <div className="shimmer-loading h-10 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MatchedProduct[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [matchSource, setMatchSource] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    setError(null);
    setResults([]);
    setMatchSource(null);

    try {
      const res = await fetch("/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.details || "Failed to search");
      }

      setResults(data.results || []);
      setMatchSource(data.source || "local");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsSearching(false);
    }
  };

  const sampleQueries = [
    "6mm tempered glass for office cabin partitions, polished edges",
    "Laminated safety glass for balcony railing, UV protected",
    "Budget-friendly 4mm float glass for residential windows",
    "Insulated glass units, 5+12+5 configuration, energy efficient",
  ];

  return (
    <div className="min-h-screen bg-[#f0f4f8] text-slate-900 selection:bg-blue-200">
      {/* ═══════════════ HEADER ═══════════════ */}
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

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className="px-4 py-2 rounded-lg text-sm font-semibold text-blue-600 bg-blue-50 transition-colors"
            >
              Discovery
            </Link>
            <Link
              href="/marketplace"
              className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 transition-colors"
            >
              Marketplace
            </Link>
            <Link
              href="/suppliers"
              className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 transition-colors"
            >
              Suppliers
            </Link>
          </nav>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 px-4 py-3 space-y-1 bg-white/95 backdrop-blur">
            <Link href="/" className="block px-4 py-2.5 rounded-lg text-sm font-semibold text-blue-600 bg-blue-50">
              Discovery
            </Link>
            <Link href="/marketplace" className="block px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
              Marketplace
            </Link>
            <Link href="/suppliers" className="block px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
              Suppliers
            </Link>
          </div>
        )}
      </header>

      <main>
        <section className="relative overflow-hidden pt-16 pb-8 md:pt-24 md:pb-12">
          {/* Background Video */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover -z-10"
          >
            <source src="/amalgus_background.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/40 -z-10" />
          
          {/* Decorative blobs */}
          <div className="absolute top-10 left-[10%] w-72 h-72 rounded-full bg-blue-400/10 blur-3xl float-slow pointer-events-none" />
          <div className="absolute top-40 right-[5%] w-96 h-96 rounded-full bg-cyan-400/10 blur-3xl float-medium pointer-events-none" />
          <div className="absolute -bottom-20 left-1/2 w-80 h-80 rounded-full bg-indigo-400/10 blur-3xl float-fast pointer-events-none" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 border border-blue-200/60 text-sm font-semibold mb-6 shadow-sm">
              <Sparkles className="w-4 h-4" />
              AI-Powered Smart Product Discovery
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] mb-6">
              Find the perfect glass.
              <br />
              <span className="text-gradient bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600">
                In plain English.
              </span>
            </h1>

            <p className="text-slate-500 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed mb-10">
              Describe what you&apos;re building and our intelligent matching
              engine will instantly find the exact products, specs, and suppliers
              you need from our glass marketplace.
            </p>

            {/* ═══ Search Bar ═══ */}
            <div className="max-w-3xl mx-auto relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 rounded-2xl blur-lg search-glow opacity-20 group-hover:opacity-35 transition-opacity duration-500 pointer-events-none" />
              <div className="relative bg-white rounded-xl shadow-xl ring-1 ring-slate-200/60 hover:shadow-2xl transition-shadow duration-300">
                <form
                  onSubmit={handleSearch}
                  className="flex items-center p-2"
                >
                  <Search className="w-5 h-5 text-slate-400 ml-4 hidden sm:block flex-shrink-0" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder='e.g. "10mm laminated safety glass for balcony railings with UV protection"'
                    className="flex-1 bg-transparent px-4 py-4 sm:py-5 text-slate-800 focus:outline-none text-base sm:text-lg placeholder-slate-400 min-w-0"
                    autoFocus
                  />
                  <button
                    type="submit"
                    disabled={isSearching || !query.trim()}
                    className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 disabled:from-slate-300 disabled:to-slate-300 disabled:cursor-not-allowed text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-lg font-semibold transition-all flex items-center gap-2 whitespace-nowrap active:scale-[0.97] shadow-lg shadow-blue-500/25 disabled:shadow-none"
                  >
                    {isSearching ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Matching…
                      </>
                    ) : (
                      <>
                        Find Matches
                        <Sparkles className="w-4 h-4 hidden sm:block" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Sample queries */}
            {!results.length && !isSearching && (
              <div className="mt-8 max-w-3xl mx-auto">
                <p className="text-xs text-slate-400 mb-3 uppercase tracking-widest font-bold">
                  Try asking for
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {sampleQueries.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => setQuery(q)}
                      className="text-sm bg-white border border-slate-200 px-4 py-2 rounded-full text-slate-500 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition-all shadow-sm hover:shadow"
                    >
                      &ldquo;{q}&rdquo;
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {error && (
          <div className="max-w-3xl mx-auto px-4 mb-8">
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 shadow-sm">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-800">
                  Something went wrong
                </h3>
                <p className="text-red-600 text-sm mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {isSearching && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6 pb-16">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
              <Cpu className="w-5 h-5 text-blue-500 animate-pulse" />
              <span className="text-sm font-semibold text-slate-600">
                Analyzing your requirements and matching against our catalog…
              </span>
            </div>
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {results.length > 0 && !isSearching && (
          <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
            {/* Results header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-200 pb-4 mb-8 gap-3">
              <h2 className="text-2xl font-extrabold flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-blue-500" />
                Top Matches
              </h2>
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-500 font-medium">
                  {results.length} products found
                </span>
                {matchSource && (
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${
                      matchSource === "ai"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}
                  >
                    {matchSource === "ai" ? (
                      <Bot className="w-3 h-3" />
                    ) : (
                      <Cpu className="w-3 h-3" />
                    )}
                    {matchSource === "ai" ? "Gemini AI" : "Smart Engine"}
                  </span>
                )}
              </div>
            </div>

            {/* Product Cards */}
            <div className="grid gap-6">
              {results.map((product, idx) => (
                <div
                  key={product.id}
                  className={`card-enter bg-white rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-lg ${
                    idx === 0
                      ? "border-blue-200 shadow-md shadow-blue-100/40 relative ring-1 ring-blue-100"
                      : "border-slate-200 shadow-sm hover:border-blue-100"
                  }`}
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {/* Best Match ribbon */}
                  {idx === 0 && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-[11px] font-bold px-4 py-1.5 rounded-bl-xl shadow-lg shadow-blue-500/20 tracking-wide">
                        BEST MATCH
                      </div>
                    </div>
                  )}

                  <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8">
                    {/* Left content */}
                    <div className="flex-1 space-y-4 min-w-0">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight pr-24 md:pr-0">
                          {product.name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 mt-3">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-sm font-semibold border border-blue-100">
                            <Layers className="w-3.5 h-3.5" />
                            {product.category}
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-50 text-slate-600 text-sm font-medium border border-slate-100">
                            <Package className="w-3.5 h-3.5" />
                            {product.supplier}
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-sm font-bold border border-emerald-100">
                            <Tag className="w-3.5 h-3.5" />
                            {product.price}
                          </span>
                        </div>
                      </div>

                      <p className="text-slate-600 leading-relaxed text-[15px]">
                        {product.description}
                      </p>

                      {/* Why it matches */}
                      <div className="bg-gradient-to-br from-blue-50/80 to-cyan-50/50 rounded-xl p-4 border border-blue-100/60">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="text-sm font-bold text-slate-800 mb-1">
                              Why this matches your needs:
                            </h4>
                            <p className="text-sm text-slate-700 leading-relaxed">
                              {product.matchExplanation}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Specs pills */}
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(product.specifications)
                          .slice(0, 5)
                          .map(([key, value]) => (
                            <span
                              key={key}
                              className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg font-medium border border-slate-200/60"
                            >
                              <span className="text-slate-400 capitalize">
                                {key.replace(/([A-Z])/g, " $1").trim()}:
                              </span>{" "}
                              <span className="text-slate-800 font-semibold">
                                {value}
                              </span>
                            </span>
                          ))}
                      </div>
                    </div>

                    {/* Right — Score */}
                    <div className="flex flex-row md:flex-col items-center md:items-center gap-4 md:gap-5 md:w-36">
                      <ScoreRing score={product.matchScore} />
                      <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 px-4 rounded-lg transition-all flex items-center justify-center gap-2 text-sm active:scale-[0.97]">
                        Contact
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {!results.length && !isSearching && (
          <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
                How It Works
              </h2>
              <p className="text-slate-500 max-w-lg mx-auto">
                Our intelligent engine understands your needs and finds the best
                products from verified suppliers.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: <Search className="w-6 h-6" />,
                  title: "Describe Your Need",
                  desc: "Type your requirement in plain English — dimensions, thickness, use-case, budget — anything.",
                  color: "from-blue-500 to-cyan-400",
                },
                {
                  icon: <Zap className="w-6 h-6" />,
                  title: "AI Matches Instantly",
                  desc: "Our engine analyzes specs, certifications, and context to rank the best-fitting products.",
                  color: "from-violet-500 to-purple-400",
                },
                {
                  icon: <Shield className="w-6 h-6" />,
                  title: "Connect & Order",
                  desc: "View detailed specs, compare suppliers, and connect directly with verified manufacturers.",
                  color: "from-emerald-500 to-teal-400",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300 group"
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white shadow-lg mb-5 group-hover:scale-110 transition-transform`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Stats bar */}
            <div className="mt-16 bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { value: "15+", label: "Product SKUs" },
                  { value: "8", label: "Suppliers" },
                  { value: "6", label: "Categories" },
                  { value: "< 2s", label: "Match Speed" },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-3xl md:text-4xl font-black text-gradient bg-gradient-to-r from-blue-600 to-cyan-500">
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate-500 font-medium mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="bg-white border-t border-slate-200 py-8 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center text-white font-bold text-sm">
              A
            </div>
            <span className="text-sm font-bold text-slate-700">AmalGus</span>
            <span className="text-sm text-slate-400 ml-1">
              &copy; {new Date().getFullYear()} Glass Marketplace
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <Link
              href="/marketplace"
              className="hover:text-blue-600 transition-colors"
            >
              Marketplace
            </Link>
            <Link
              href="/suppliers"
              className="hover:text-blue-600 transition-colors"
            >
              Suppliers
            </Link>
            <span className="text-slate-300">|</span>
            <span className="text-slate-400 flex items-center gap-1">
              Powered by <TrendingUp className="w-3.5 h-3.5" /> AI
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
