"use client";

import { useState } from "react";
import { Calculator, Hammer, TrendingUp } from "lucide-react";

export default function EstimatePage() {
  const [glassType, setGlassType] = useState("clear_5mm");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [estimate, setEstimate] = useState<any>(null);

  const rates: Record<string, { label: string; priceSqft: number }> = {
    clear_5mm: { label: "Clear Float (5mm)", priceSqft: 45 },
    toughened_8mm: { label: "Toughened (8mm)", priceSqft: 120 },
    laminated_10mm: { label: "Laminated (10mm)", priceSqft: 180 },
    dgu_24mm: { label: "DGU / IGU (6+12+6mm)", priceSqft: 350 },
    frosted_6mm: { label: "Frosted (6mm)", priceSqft: 85 },
    reflective_6mm: { label: "Reflective (6mm)", priceSqft: 100 },
    low_e_6mm: { label: "Low-E Glass (6mm)", priceSqft: 200 },
    back_painted_8mm: { label: "Back-Painted (8mm)", priceSqft: 150 },
  };

  const calculateEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(width);
    const h = parseFloat(height);
    const q = parseInt(quantity, 10);

    if (isNaN(w) || isNaN(h) || isNaN(q) || w <= 0 || h <= 0 || q <= 0) {
      return;
    }

    // Convert mm to sqm, then to sq.ft (1 sqm = 10.7639 sq.ft)
    const areaSqm = (w / 1000) * (h / 1000);
    const areaSqft = areaSqm * 10.7639;
    const basePrice = rates[glassType].priceSqft;
    
    // Calculate costs
    const glassCost = areaSqft * basePrice * q;
    const processingCost = 300 * q; // Base processing fee per piece in INR
    const totalCost = glassCost + processingCost;

    setEstimate({
      area: areaSqft.toFixed(2),
      glassCost: glassCost.toFixed(2),
      processingCost: processingCost.toFixed(2),
      totalCost: totalCost.toFixed(2),
      rate: basePrice,
      label: rates[glassType].label,
    });
  };

  return (
    <div className="min-h-screen bg-[#E7F6F5] text-[#2A2F35] selection:bg-cyan-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
            Instant Quote Generator
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Get an immediate block-size estimate for your glass requirements based on today&apos;s daily rates.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Form */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
              <Calculator className="w-5 h-5 text-blue-500" />
              Enter Dimensions
            </h2>
            <form onSubmit={calculateEstimate} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Glass Type
                </label>
                <select
                  value={glassType}
                  onChange={(e) => setGlassType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  {Object.entries(rates).map(([key, val]) => (
                    <option key={key} value={key}>
                      {val.label} - ₹{val.priceSqft}/sq.ft
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Width (mm)
                  </label>
                  <input
                    type="number"
                    required
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    placeholder="e.g. 1200"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Height (mm)
                  </label>
                  <input
                    type="number"
                    required
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="e.g. 1500"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl transition-all active:scale-[0.98] shadow-md flex justify-center items-center gap-2 mt-4"
              >
                Generate Estimate
              </button>
            </form>
          </div>

          {/* Result */}
          {estimate ? (
            <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-1 rounded-2xl shadow-xl animate-in fade-in slide-in-from-bottom-4">
              <div className="bg-white rounded-xl p-6 md:p-8 h-full">
                <h3 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">
                  Estimate Summary
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Selected Product</span>
                    <span className="font-semibold text-slate-800 text-right">{estimate.label}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Total Area</span>
                    <span className="font-semibold text-slate-800 text-right">{estimate.area} sq.ft (x{quantity})</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Current Market Rate</span>
                    <span className="font-semibold inline-flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      <TrendingUp className="w-3 h-3" />
                      ₹{estimate.rate}/sq.ft
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Processing & Polishing</span>
                    <span className="font-semibold text-slate-800">₹{estimate.processingCost}</span>
                  </div>
                  
                  <div className="border-t border-slate-100 pt-4 mt-6">
                    <div className="flex justify-between items-end">
                      <span className="text-slate-500 font-medium">Estimated Total</span>
                      <span className="text-3xl font-black text-slate-900">₹{estimate.totalCost}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">
                      * This is a block-size estimate. Exact factory quotes may vary based on cut-outs, irregular shapes, or specific edge profiles.
                    </p>
                  </div>
                </div>

                <button className="w-full mt-8 bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold py-3 rounded-xl transition-all flex justify-center items-center gap-2">
                  <Hammer className="w-4 h-4" />
                  Request Formal Quote
                </button>
              </div>
            </div>
          ) : (
             <div className="bg-slate-50 border border-slate-200 border-dashed rounded-2xl h-full min-h-[300px] flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                <Calculator className="w-12 h-12 mb-4 opacity-50" />
                <p className="font-medium">Enter your dimensions and glass type<br/>to generate an instant estimate.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
