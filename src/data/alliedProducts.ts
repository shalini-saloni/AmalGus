export interface AlliedProduct {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  inStock: boolean;
  supplier: string;
  image?: string;
}

export const alliedProducts: AlliedProduct[] = [
  // ── Doors & Windows ──
  {
    id: "ap1",
    name: "UPVC Sliding Window System",
    category: "Doors & Windows",
    description: "Energy-efficient UPVC sliding window frame with multi-point locking. Supports 5mm–10mm glass panels. UV-resistant white finish.",
    price: "₹450 /sq.ft",
    inStock: true,
    supplier: "FenestaPro India",
  },
  {
    id: "ap2",
    name: "Aluminium Slim Casement Door",
    category: "Doors & Windows",
    description: "Ultra-slim aluminium casement door profile with thermal break technology. Ideal for modern facades and luxury residences.",
    price: "₹620 /sq.ft",
    inStock: true,
    supplier: "SchücoIndia",
  },

  // ── Glass Railings ──
  {
    id: "ap3",
    name: "Frameless Glass Railing Kit",
    category: "Glass Railings",
    description: "Complete frameless glass railing system with SS 304 spigots, rubber gaskets, and handrail brackets. For 12mm tempered glass.",
    price: "₹1,800 /rft",
    inStock: true,
    supplier: "RailCraft Systems",
  },
  {
    id: "ap4",
    name: "SS Post Glass Railing System",
    category: "Glass Railings",
    description: "Stainless steel post-mounted railing with top rail. Suitable for balcony, terrace, and staircase installations.",
    price: "₹1,200 /rft",
    inStock: false,
    supplier: "StairPro India",
  },

  // ── Shower Enclosures ──
  {
    id: "ap5",
    name: "Frameless Shower Enclosure Kit",
    category: "Shower Enclosures",
    description: "Premium frameless shower enclosure hardware kit — hinges, wall clamps, pull handle, and sealing strips for 8mm–10mm glass.",
    price: "₹8,500 /set",
    inStock: true,
    supplier: "BathLux Hardware",
  },
  {
    id: "ap6",
    name: "Sliding Shower Door Track System",
    category: "Shower Enclosures",
    description: "Heavy-duty aluminium sliding track with rollers and stoppers. Supports up to 60kg glass panels for walk-in showers.",
    price: "₹4,200 /set",
    inStock: true,
    supplier: "AquaSlide Systems",
  },

  // ── Facades & Curtain Walls ──
  {
    id: "ap7",
    name: "Unitized Curtain Wall Module",
    category: "Facades & Curtain Walls",
    description: "Factory-assembled unitized curtain wall module with aluminium mullions and transoms. Designed for high-rise structural glazing.",
    price: "₹3,500 /sq.ft",
    inStock: false,
    supplier: "FacadeTech India",
  },
  {
    id: "ap8",
    name: "Structural Glazing Spider Fitting",
    category: "Facades & Curtain Walls",
    description: "4-arm stainless steel spider fitting for point-fixed structural glazing. Load capacity 200kg per arm.",
    price: "₹2,800 /piece",
    inStock: true,
    supplier: "SpiderFix Pro",
  },

  // ── Hardware & Fittings ──
  {
    id: "ap9",
    name: "Patch Fitting Set (Floor Spring)",
    category: "Hardware & Fittings",
    description: "Heavy-duty hydraulic floor spring with top pivot and bottom bracket. For 12mm frameless glass doors up to 100kg.",
    price: "₹6,500 /set",
    inStock: true,
    supplier: "DormaKaba India",
  },
  {
    id: "ap10",
    name: "Glass Door Pull Handle (H-Type)",
    category: "Hardware & Fittings",
    description: "Polished SS 304 H-type pull handle, 600mm length. Suitable for 8mm–12mm tempered glass doors.",
    price: "₹1,100 /pair",
    inStock: true,
    supplier: "HandleCraft",
  },
  {
    id: "ap11",
    name: "Spider Clamp — 4 Arm",
    category: "Hardware & Fittings",
    description: "Investment-cast stainless steel 4-arm spider clamp for structural glass facades. Mirror-polished finish.",
    price: "₹3,200 /piece",
    inStock: false,
    supplier: "SpiderFix Pro",
  },

  // ── Silicones & Sealants ──
  {
    id: "ap12",
    name: "Structural Silicone Sealant (300ml)",
    category: "Silicones & Sealants",
    description: "High-modulus structural silicone sealant for curtain wall and structural glazing bonds. UV-resistant, 25-year lifespan.",
    price: "₹480 /tube",
    inStock: true,
    supplier: "Dow Corning India",
  },
  {
    id: "ap13",
    name: "Weather Sealant — Neutral Cure (280ml)",
    category: "Silicones & Sealants",
    description: "Neutral-cure weather sealant for perimeter sealing of glass windows and doors. Paintable, mold-resistant.",
    price: "₹320 /tube",
    inStock: true,
    supplier: "SikaFlex India",
  },
  {
    id: "ap14",
    name: "Butyl Sealant Tape (10mm x 15m)",
    category: "Silicones & Sealants",
    description: "Self-adhesive butyl sealant tape for insulated glass unit (IGU) primary seal. Low moisture transmission.",
    price: "₹250 /roll",
    inStock: true,
    supplier: "GlassSeal Corp",
  },

  // ── Glass Machinery & Tools ──
  {
    id: "ap15",
    name: "Glass Cutting Table (Manual)",
    category: "Glass Machinery & Tools",
    description: "Professional-grade manual glass cutting table with air flotation bed. Cuts up to 6mm float glass, 2400x1800mm working area.",
    price: "₹85,000 /unit",
    inStock: false,
    supplier: "GlassMach India",
  },
  {
    id: "ap16",
    name: "Heavy-Duty Suction Cup Lifter (3-Cup)",
    category: "Glass Machinery & Tools",
    description: "Triple-pad vacuum suction lifter with 150kg capacity. Ergonomic handle for safe glass panel handling and installation.",
    price: "₹4,500 /piece",
    inStock: true,
    supplier: "LiftPro Tools",
  },

  // ── Decorative Glass ──
  {
    id: "ap17",
    name: "Digital Printed Glass Panel",
    category: "Decorative Glass",
    description: "Custom UV-printed decorative glass panel. High-resolution ceramic ink, scratch-resistant. For wall cladding and partitions.",
    price: "₹350 /sq.ft",
    inStock: true,
    supplier: "PrintGlass Studio",
  },
  {
    id: "ap18",
    name: "Textured Art Glass — Fluted",
    category: "Decorative Glass",
    description: "Fluted textured art glass with vertical reed pattern. 6mm thick, ideal for cabinet doors, partitions, and decorative screens.",
    price: "₹280 /sq.ft",
    inStock: true,
    supplier: "ArtGlass India",
  },

  // ── Mirrors ──
  {
    id: "ap19",
    name: "Beveled Wall Mirror (24x36 inch)",
    category: "Mirrors",
    description: "High-clarity silver-coated beveled mirror with polished 1-inch bevel edge. Copper-free for moisture resistance.",
    price: "₹2,400 /piece",
    inStock: true,
    supplier: "MirrorCraft India",
  },
  {
    id: "ap20",
    name: "Gym Wall Mirror Panel",
    category: "Mirrors",
    description: "6mm safety-backed gym mirror, custom sizes up to 8x4 ft. Distortion-free reflection with vinyl safety backing.",
    price: "₹120 /sq.ft",
    inStock: true,
    supplier: "FitGlass Solutions",
  },

  // ── Skylights & Canopies ──
  {
    id: "ap21",
    name: "Polycarbonate Skylight Panel",
    category: "Skylights & Canopies",
    description: "Multi-wall polycarbonate skylight panel with UV protection. Lightweight, impact-resistant, ideal for atrium roofing.",
    price: "₹180 /sq.ft",
    inStock: true,
    supplier: "SkyLite India",
  },
  {
    id: "ap22",
    name: "Glass Canopy Bracket System",
    category: "Skylights & Canopies",
    description: "Stainless steel canopy bracket set with tie rods. Supports laminated glass canopies up to 2m projection.",
    price: "₹5,500 /set",
    inStock: false,
    supplier: "CanopyPro Systems",
  },

  // ── Slim Partitions ──
  {
    id: "ap23",
    name: "Demountable Glass Partition System",
    category: "Slim Partitions",
    description: "Modular single-glazed aluminium partition system. Tool-free assembly/disassembly. For 10mm–12mm glass panels.",
    price: "₹950 /sq.ft",
    inStock: true,
    supplier: "PartitionWorks India",
  },
  {
    id: "ap24",
    name: "Double-Glazed Acoustic Partition",
    category: "Slim Partitions",
    description: "Premium double-glazed acoustic partition with 42dB sound insulation. Slim aluminium profile, floor-to-ceiling design.",
    price: "₹1,600 /sq.ft",
    inStock: true,
    supplier: "AcoustiWall Pro",
  },
];
