"use client";

import { useState, useEffect } from "react";
import { UserCircle, ChevronDown, Check } from "lucide-react";

export const roles = [
  { id: "guest", label: "Guest" },
  { id: "homeowner", label: "Homeowner" },
  { id: "architect", label: "Architect / Designer" },
  { id: "builder", label: "Builder / Contractor" },
  { id: "dealer", label: "Glass Dealer" },
];

export default function RoleSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeRole, setActiveRole] = useState("guest");

  useEffect(() => {
    const updateRole = () => {
      const stored = localStorage.getItem("amalgus_role");
      if (stored) {
        setActiveRole(stored);
      }
    };
    
    updateRole(); // Initial check
    
    window.addEventListener("roleChange", updateRole);
    return () => window.removeEventListener("roleChange", updateRole);
  }, []);

  const handleSelect = (roleId: string) => {
    setActiveRole(roleId);
    localStorage.setItem("amalgus_role", roleId);
    setIsOpen(false);
    // Dispath an event so other components could listen if needed
    window.dispatchEvent(new Event("roleChange"));
  };

  const activeLabel = roles.find((r) => r.id === activeRole)?.label || "Guest";

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-blue-200 transition-all"
      >
        <UserCircle className="w-4 h-4" />
        <span className="hidden sm:inline-block max-w-[120px] truncate">{activeLabel}</span>
        <ChevronDown className="w-3 h-3 text-slate-400" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 z-50 p-2 py-2 origin-top-right animate-in fade-in slide-in-from-top-2">
            <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-2">
              Select Your Profile
            </div>
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => handleSelect(role.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm flex items-center justify-between transition-colors ${
                  activeRole === role.id
                    ? "bg-blue-50 text-blue-700 font-semibold"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {role.label}
                {activeRole === role.id && <Check className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
