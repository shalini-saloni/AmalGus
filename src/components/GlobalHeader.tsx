"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import RoleSelector from "./RoleSelector";

export default function GlobalHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname() || "/";

  const leftNavLinks = [
    { href: "/", label: "HOME" },
    { href: "/marketplace?category=Tempered", label: "GLASSES TEMPERED" },
    { href: "/", label: "AI SEARCH" },
  ];

  const rightNavLinks = [
    { href: "/marketplace", label: "PRODUCTS" },
    { href: "/materials", label: "MATERIALS" },
    { href: "/estimate", label: "ESTIMATES" },
    { href: "/suppliers", label: "SUPPLIERS" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full flex flex-col shadow-sm">
      <div className="flex h-20 w-full relative">
        {/* Left Dark Background */}
        <div className="absolute left-0 top-0 bottom-0 w-[45%] bg-[#2A2F35] -z-10" />
        {/* Right Light Background */}
        <div className="absolute right-0 top-0 bottom-0 w-[55%] bg-white/95 backdrop-blur -z-10" />
        
        <div className="w-full max-w-7xl mx-auto flex items-stretch">
          {/* Left Side: Hamburger + Left Nav */}
          <div className="w-[45%] flex items-center pr-8 pl-4 sm:pl-6 lg:pl-8">
            <button
              className="lg:hidden p-2 text-white hover:bg-[#3d444b] rounded transition"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <nav className="hidden lg:flex items-center gap-6 ml-4 text-white text-[13px] font-bold tracking-widest">
              {leftNavLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`hover:text-cyan-300 transition-colors ${
                    pathname === link.href ? "text-cyan-300" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Side: Logo + Right Nav */}
          <div className="w-[55%] flex items-center pl-8 pr-4 sm:pr-6 lg:pr-8 bg-white/95 gap-8">
            <Link href="/" className="flex items-center gap-3 group -ml-20 mr-auto bg-white py-2 px-6 shadow-sm border border-slate-100 z-10 flex-shrink-0">
              <div className="relative w-8 h-8 group-hover:scale-105 transition-transform duration-300">
                <Image src="/amalgus_icon.webp" alt="AmalGus Logo" fill className="object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-cyan-600 tracking-tight leading-none transition-transform duration-300">
                  Glass121
                </span>
                <span className="text-[10px] whitespace-nowrap font-semibold text-slate-500 tracking-wider mt-0.5">
                  Powered by AmalGus
                </span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-6 text-slate-500 text-[13px] font-bold tracking-widest">
              {rightNavLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`hover:text-cyan-500 transition-colors ${
                    pathname === link.href ? "text-cyan-600" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="ml-2 scale-90 origin-right">
                <RoleSelector />
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 py-3 bg-[#2A2F35] text-white space-y-1">
          {[...leftNavLinks, ...rightNavLinks].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-lg text-sm font-semibold tracking-wider hover:bg-[#3d444b] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 px-4 pb-2">
            <RoleSelector />
          </div>
        </div>
      )}
    </header>
  );
}
