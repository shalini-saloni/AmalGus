"use client";

import Image from "next/image";
import { partners } from "@/data/partners";
import {
  MapPin,
  Star,
  ShieldCheck,
  CheckCircle,
  Search,
  Filter,
  Wrench,
  Award,
} from "lucide-react";
import { useState, useMemo } from "react";

export default function PartnersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  const types = useMemo(() => {
    const ts = Array.from(new Set(partners.map((p) => p.type)));
    return ["All", ...ts.sort()];
  }, []);

  const filtered = useMemo(() => {
    return partners.filter((p) => {
      const matchesType =
        selectedType === "All" || p.type === selectedType;
      const matchesSearch =
        !searchTerm.trim() ||
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.services.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesType && matchesSearch;
    });
  }, [selectedType, searchTerm]);

  return (
    <div className="min-h-screen bg-[#E7F6F5] text-[#2A2F35] selection:bg-cyan-200">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
            Service Partners Directory
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl">
            Find verified installers, dimensioning professionals, and maintenance experts to complete your glass project with precision.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, service or location…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 text-sm shadow-sm transition-all"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedType === t
                    ? "bg-slate-900 text-white shadow-md"
                    : "bg-white border border-slate-200 text-slate-600 hover:border-blue-200 hover:text-blue-600"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((partner) => (
            <div key={partner.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-100 transition-all p-6 flex flex-col">
               <div className="flex justify-between items-start mb-4">
                  <div>
                     <h3 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
                        {partner.name}
                        {partner.verified && <ShieldCheck className="w-5 h-5 text-emerald-500" />}
                     </h3>
                     <span className="text-sm font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100 inline-flex items-center gap-1.5">
                        <Wrench className="w-3.5 h-3.5" /> {partner.type}
                     </span>
                  </div>
               </div>

               <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-1">{partner.description}</p>

               <div className="mb-5">
                   <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 mt-4 border-t border-slate-100 pt-3">Key Services</h4>
                   <div className="flex flex-wrap gap-1.5">
                      {partner.services.map(s => (
                         <span key={s} className="text-xs bg-slate-50 border border-slate-200 text-slate-600 px-2 py-1 rounded-md">
                            {s}
                         </span>
                      ))}
                   </div>
               </div>

               <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 mt-auto">
                    <div className="flex flex-col">
                       <span className="text-xs text-slate-500 mb-1 flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> Rating</span>
                       <span className="font-bold text-slate-800">{partner.rating} <span className="text-xs font-normal text-slate-400">({partner.reviews})</span></span>
                    </div>
                    <div className="flex flex-col">
                       <span className="text-xs text-slate-500 mb-1 flex items-center gap-1"><Award className="w-3.5 h-3.5 text-blue-500" /> Projects</span>
                       <span className="font-bold text-slate-800">{partner.projectsCompleted}+</span>
                    </div>
               </div>

               <div className="mt-4 flex gap-3">
                  <button className="flex-1 bg-slate-900 text-white font-semibold py-2.5 rounded-lg text-sm hover:bg-slate-800 transition shadow-sm">
                     Request Quote
                  </button>
                  <button className="px-3 bg-slate-50 text-slate-500 font-semibold py-2.5 flex items-center justify-center rounded-lg border border-slate-200 hover:text-blue-600 hover:border-blue-200 transition">
                     <MapPin className="w-4 h-4" />
                  </button>
               </div>
               <div className="text-center mt-3">
                  <span className="text-xs font-medium text-slate-500 flex items-center justify-center gap-1"><MapPin className="w-3 h-3" /> {partner.location}</span>
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
          </div>
        </div>
      </footer>
    </div>
  );
}
