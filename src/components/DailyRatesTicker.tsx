"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

const mockRates = [
  { name: "Clear Float 4mm", price: "₹45/sq.ft", change: "+1.2%", up: true },
  { name: "Clear Float 6mm", price: "₹55/sq.ft", change: "-0.5%", up: false },
  { name: "Tempered 8mm", price: "₹140/sq.ft", change: "+2.1%", up: true },
  { name: "Laminated 10mm", price: "₹220/sq.ft", change: "0.0%", up: true },
  { name: "Low-E Glass 6mm", price: "₹250/sq.ft", change: "+0.8%", up: true },
  { name: "Reflective 6mm", price: "₹120/sq.ft", change: "-1.1%", up: false },
];

export default function DailyRatesTicker() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="bg-slate-900 text-white py-2 overflow-hidden relative shadow-md z-50">
      <div className="flex whitespace-nowrap animate-ticker group">
        {[...mockRates, ...mockRates, ...mockRates].map((rate, i) => (
          <div
            key={i}
            className="flex items-center gap-2 mx-6 text-sm font-medium tracking-wide"
          >
            <span className="text-slate-300">{rate.name}:</span>
            <span className="font-bold">{rate.price}</span>
            <span
              className={`flex items-center text-xs px-1.5 py-0.5 rounded-sm ${
                rate.up ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"
              }`}
            >
              {rate.up ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
              {rate.change}
            </span>
          </div>
        ))}
      </div>
      <div className="absolute top-0 left-0 bottom-0 w-8 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />
      <style jsx global>{`
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
        .animate-ticker {
          animation: ticker 40s linear infinite;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
