"use client";

import { useState, useEffect } from "react";
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
  Cpu,
  Bot,
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

const FEATURED_GLASSES = [
  { name: "Tempered Glass", image: "/tempered_glass.png" },
  { name: "Beveled Glass", image: "/beveled_glass.png" },
  { name: "Crown Glass", image: "/crown_glass.png" },
  { name: "Hebron Glass", image: "/hebron_glass.png" },
];

import { roles } from "@/components/RoleSelector";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MatchedProduct[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [matchSource, setMatchSource] = useState<string | null>(null);
  const [showGate, setShowGate] = useState(false);

  useEffect(() => {
    const hasRole = localStorage.getItem("amalgus_role_set");
    if (!hasRole) {
      setShowGate(true);
    }
  }, []);

  const handleRoleSelect = (roleId: string) => {
    localStorage.setItem("amalgus_role", roleId);
    localStorage.setItem("amalgus_role_set", "true");
    setShowGate(false);
    window.dispatchEvent(new Event("roleChange"));
  };

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    setError(null);
    setResults([]);
    setMatchSource(null);

    try {
      const role = localStorage.getItem("amalgus_role") || "homeowner";
      const res = await fetch("/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.details || "Failed to search");
      }

      setResults(data.results || []);
      setMatchSource(data.source || "local");

      // Scroll to results
      setTimeout(() => {
        document.getElementById("results-section")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsSearching(false);
    }
  };

  const sampleQueries = [
    "10mm tempered glass for office cabins",
    "Laminated safety glass for balcony",
    "Soundproof double glazed windows",
  ];

  return (
    <div className="min-h-screen bg-[#E7F6F5] text-[#2A2F35] font-sans selection:bg-cyan-200">
      {/* Profile Gate Overlay */}
      {showGate && (
        <div className="fixed inset-0 z-[100] bg-[#2A2F35]/95 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-2xl shadow-2xl p-8 animate-in zoom-in-95 duration-300">
            <h2 className="text-2xl font-black text-cyan-700 mb-2 text-center">Welcome to AmalGus</h2>
            <p className="text-slate-500 text-center mb-8">Please select your profile to continue customizing your experience.</p>
            <div className="space-y-3">
              {roles.filter(r => r.id !== "guest").map((role) => (
                <button
                  key={role.id}
                  onClick={() => handleRoleSelect(role.id)}
                  className="w-full text-left px-5 py-4 rounded-xl border border-slate-200 hover:border-cyan-500 hover:bg-cyan-50 hover:shadow-md transition-all group flex justify-between items-center"
                >
                  <span className="font-semibold text-slate-700 group-hover:text-cyan-700">{role.label}</span>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-cyan-500 transition-transform group-hover:translate-x-1" />
                </button>
              ))}
            </div>
            <button 
              onClick={() => handleRoleSelect("guest")}
              className="w-full text-center mt-6 text-sm text-slate-400 hover:text-slate-600 underline underline-offset-4"
            >
              Continue as Guest
            </button>
          </div>
        </div>
      )}

      <main>
        {/* ═══ Template Hero Section ═══ */}
        <section className="relative w-full overflow-hidden flex flex-col md:flex-row bg-white">
          {/* Left part structure */}
          <div className="w-full md:w-[45%] relative flex items-center justify-end z-10 bg-white">
            {/* The structural dark block as seen in the template */}
            <div className="absolute right-0 w-32 md:w-48 h-full bg-[#2A2F35]"></div>
            
            {/* Hero Banner Box */}
            <div className="relative w-full max-w-xl bg-[#D0EAE9] py-16 px-8 md:px-16 shadow-sm z-20 md:-mr-12 my-12 md:my-32">
              <h1 className="text-4xl md:text-5xl font-light text-[#2A2F35] leading-snug tracking-wide mb-8">
                Glasses That Reflect<br />Your Elegance
              </h1>
              
              <Link
                href="/marketplace"
                className="inline-block bg-[#5A878B] hover:bg-[#4a7275] text-white px-8 py-3.5 rounded-full tracking-wider text-sm transition-colors"
              >
                Enquire Now
              </Link>

              <div className="mt-12 w-full">
                <p className="text-sm font-bold text-[#2A2F35] mb-3 flex flex-wrap gap-2 items-center">
                  <Sparkles className="w-4 h-4 text-[#5A878B]" /> 
                  AI Smart Matcher
                </p>
                <form onSubmit={handleSearch} className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#D0EAE9] to-[#5A878B] rounded-lg blur opacity-40 group-hover:opacity-75 transition duration-500"></div>
                  <div className="relative flex items-center bg-white rounded shadow-sm overflow-hidden border border-white/50">
                    <input
                      type="text"
                      className="w-full bg-transparent px-4 py-3 text-sm focus:outline-none text-[#2A2F35]"
                      placeholder="e.g. 10mm tempered glass for office"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                    <button
                      type="submit"
                      disabled={isSearching || !query.trim()}
                      className="bg-[#5A878B] hover:bg-[#4A7275] disabled:bg-slate-300 text-white p-3 h-full transition-colors flex items-center justify-center shrink-0"
                    >
                      {isSearching ? <Cpu className="w-5 h-5 animate-pulse" /> : <Search className="w-5 h-5" />}
                    </button>
                  </div>
                </form>
                
                {/* Sample queries */}
                {!results.length && !isSearching && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {sampleQueries.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => setQuery(q)}
                        className="text-[11px] bg-white/60 px-3 py-1.5 rounded-full text-[#5A878B] hover:bg-white transition-colors border border-white/40"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right part structure (Image) */}
          <div className="w-full md:w-[55%] h-[400px] md:h-auto relative bg-slate-100">
            <Image
              src="/hero_office_glass.png"
              alt="Office Glass Partition"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
        </section>

        {/* ═══ AI Search Results Section (Moved up here) ═══ */}
        <div id="results-section">
          {(isSearching || results.length > 0 || error) && (
            <section className="bg-white py-12 border-b border-slate-100 shadow-sm relative z-20">
              <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                {error && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 shadow-sm mb-8">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-red-800">Cannot complete match</h3>
                      <p className="text-red-600 text-sm mt-1">{error}</p>
                    </div>
                  </div>
                )}

                {isSearching && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                      <Cpu className="w-5 h-5 text-[#5A878B] animate-pulse" />
                      <span className="text-sm font-semibold text-slate-600">
                        Analyzing your requirements...
                      </span>
                    </div>
                    {[1, 2].map((i) => <SkeletonCard key={i} />)}
                  </div>
                )}

                {results.length > 0 && !isSearching && (
                  <div>
                    <div className="flex flex-wrap items-center justify-between border-b border-slate-200 pb-4 mb-8 gap-4">
                      <h2 className="text-2xl font-light text-[#2A2F35] flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-[#5A878B]" />
                        Matching Products
                      </h2>
                      <div className="flex items-center gap-3 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                        <span className="text-sm text-slate-500 font-medium">
                          {results.length} found via
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5A878B]">
                          {matchSource === "ai" ? <Bot className="w-4 h-4" /> : <Cpu className="w-4 h-4" />}
                          {matchSource === "ai" ? "Gemini AI" : "Smart Engine"}
                        </span>
                      </div>
                    </div>

                    <div className="grid gap-6">
                      {results.map((product, idx) => (
                        <div
                          key={product.id}
                          className={`card-enter bg-white rounded-xl border p-6 lg:p-8 flex flex-col md:flex-row gap-6 lg:gap-8 transition-all duration-300 hover:shadow-lg ${
                            idx === 0
                              ? "border-[#5A878B] shadow-md shadow-[#5A878B]/10 ring-1 ring-[#5A878B]/20 relative"
                              : "border-slate-200 hover:border-[#5A878B]/50"
                          }`}
                          style={{ animationDelay: `${idx * 100}ms` }}
                        >
                          {idx === 0 && (
                            <div className="absolute top-0 right-4 bg-[#5A878B] text-white text-[10px] font-black px-4 py-1.5 rounded-b shadow-sm tracking-widest uppercase">
                              Best Match
                            </div>
                          )}

                          <div className="flex-1 space-y-4">
                            <div>
                              <h3 className="text-xl md:text-2xl font-bold text-[#2A2F35] pr-20 md:pr-0">
                                {product.name}
                              </h3>
                              <div className="flex flex-wrap gap-2 mt-3 text-xs md:text-sm">
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#E7F6F5] text-[#396265] font-semibold">
                                  <Layers className="w-3.5 h-3.5" /> {product.category}
                                </span>
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-medium">
                                  <Package className="w-3.5 h-3.5" /> {product.supplier}
                                </span>
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 font-bold">
                                  <Tag className="w-3.5 h-3.5" /> {product.price}
                                </span>
                              </div>
                            </div>
                            
                            <p className="text-slate-600 text-[15px] leading-relaxed">
                              {product.description}
                            </p>

                            <div className="bg-[#f8fafc] rounded-lg p-4 object-contain">
                              <div className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-[#5A878B] mt-0.5 shrink-0" />
                                <div>
                                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-1">Why this fits</h4>
                                  <p className="text-sm text-slate-700">{product.matchExplanation}</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-row md:flex-col items-center justify-between md:justify-center gap-4 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8 md:w-48 shrink-0">
                            <ScoreRing score={product.matchScore} />
                            <Link href={`/marketplace`} className="w-full bg-[#2A2F35] hover:bg-black text-white text-sm font-semibold py-2.5 px-4 rounded transition-colors flex items-center justify-center gap-2">
                              View Product <ChevronRight className="w-4 h-4" />
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </section>
          )}
        </div>

        {/* ═══ Template Glasses Grid Section ═══ */}
        <section className="bg-[#E7F6F5] py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-3xl text-center text-[#2A2F35] font-light mb-16 tracking-wide">
              Glasses
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16 lg:px-12">
              {FEATURED_GLASSES.map((item, idx) => (
                <div key={idx} className="relative group cursor-pointer">
                  {/* The dark shadow box offset */}
                  <div className="absolute top-4 -right-4 bottom-8 left-4 bg-[#394047] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"></div>
                  
                  {/* Image container */}
                  <div className="relative bg-white aspect-square shadow-sm flex items-center justify-center overflow-hidden border border-slate-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover p-2 md:p-4 hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Label */}
                  <p className="mt-8 text-center text-[#2A2F35] font-medium tracking-wide">
                    {item.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ How It Works / Allied Specs (Brief) ═══ */}
        <section className="bg-white py-16 border-t border-slate-100">
           <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="grid md:grid-cols-3 gap-8">
                 {[
                   { i: <Search />, t: "Search in Plain English", d: "Describe your project. AI matches you with the right glass naturally." },
                   { i: <Zap />, t: "Compare Instantly", d: "See multiple vendors, real-time rates, and allied product requirements." },
                   { i: <Shield />, t: "Verified Ecosystem", d: "Connect securely with fabricators, installers, and brand distributors." }
                 ].map((blk, idx) => (
                    <div key={idx} className="p-8 border border-slate-100 rounded-xl hover:shadow-lg transition-shadow">
                       <div className="w-12 h-12 bg-[#E7F6F5] text-[#5A878B] flex items-center justify-center rounded-lg mb-6">
                          {blk.i}
                       </div>
                       <h3 className="text-lg font-bold text-[#2A2F35] mb-2">{blk.t}</h3>
                       <p className="text-slate-500">{blk.d}</p>
                    </div>
                 ))}
              </div>
           </div>
        </section>
      </main>

      <footer className="bg-[#2A2F35] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tight text-white">AmalGus</span>
            <span className="text-xs text-slate-400 mt-1 uppercase tracking-widest">Global Glass Marketplace</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-400 font-medium">
            <Link href="/marketplace" className="hover:text-white transition-colors">Marketplace</Link>
            <Link href="/estimate" className="hover:text-white transition-colors">Quotes</Link>
            <Link href="/suppliers" className="hover:text-white transition-colors">Suppliers</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
