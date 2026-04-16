export interface Product {
  id: string;
  name: string;
  category: string;
  specifications: {
    thickness?: string;
    size?: string;
    color?: string;
    coating?: string;
    edgeFinish?: string;
    certification?: string;
    material?: string;
    finish?: string;
    type?: string;
    length?: string;
    gas?: string;
    [key: string]: string | undefined;
  };
  supplier: string;
  supplierEmail: string;
  supplierPhone: string;
  price: string;
  description: string;
  moq?: string;
}

export const products: Product[] = [
  // ═══════════════════════════════════════════════
  // TEMPERED GLASS (8 products)
  // ═══════════════════════════════════════════════
  {
    id: "p1",
    name: "Architectural Tempered Glass",
    category: "Tempered Glass",
    specifications: {
      thickness: "6mm",
      size: "Custom up to 2m x 1.2m",
      color: "Clear",
      edgeFinish: "Polished",
      certification: "IGCC",
    },
    supplier: "Guardian Glass Tech",
    supplierEmail: "sales@guardianglass.com",
    supplierPhone: "+91 98765 43210",
    price: "$45 per sqm",
    description:
      "High-strength clear tempered glass, ideal for office cabin partitions and frameless doors.",
    moq: "20 sqm",
  },
  {
    id: "p2",
    name: "Frosted Tempered Glass",
    category: "Tempered Glass",
    specifications: {
      thickness: "8mm",
      size: "Custom",
      color: "Frosted/Acid-Etched",
      edgeFinish: "Beveled",
    },
    supplier: "PrivacyGlaze",
    supplierEmail: "orders@privacyglaze.in",
    supplierPhone: "+91 87654 32109",
    price: "$55 per sqm",
    description:
      "Acid-etched frosted tempered glass providing privacy while allowing light transmission. Ideal for shower enclosures and internal partitions.",
    moq: "10 sqm",
  },
  {
    id: "p3",
    name: "10mm Heavy Tempered Glass Panel",
    category: "Tempered Glass",
    specifications: {
      thickness: "10mm",
      size: "Up to 2.4m x 1.5m",
      color: "Clear",
      edgeFinish: "Polished",
      certification: "EN 12150",
    },
    supplier: "StrongBuild Glass",
    supplierEmail: "info@strongbuild.com",
    supplierPhone: "+91 99887 66554",
    price: "$68 per sqm",
    description:
      "Heavy-duty 10mm tempered glass panels for frameless shower enclosures, glass railings, and structural glazing.",
    moq: "15 sqm",
  },
  {
    id: "p4",
    name: "12mm Extra-Thick Tempered Glass",
    category: "Tempered Glass",
    specifications: {
      thickness: "12mm",
      size: "Custom up to 3m x 2m",
      color: "Clear",
      edgeFinish: "Flat polished",
      certification: "IS 2553, EN 12150",
    },
    supplier: "Guardian Glass Tech",
    supplierEmail: "sales@guardianglass.com",
    supplierPhone: "+91 98765 43210",
    price: "$85 per sqm",
    description:
      "Premium extra-thick tempered glass for heavy-duty applications — glass canopies, floors, and structural partitions.",
    moq: "10 sqm",
  },
  {
    id: "p5",
    name: "Tempered Glass Table Top",
    category: "Tempered Glass",
    specifications: {
      thickness: "8mm",
      size: "Custom shapes available",
      color: "Clear / Frosted",
      edgeFinish: "Pencil polished",
    },
    supplier: "HomeLux Glass",
    supplierEmail: "hello@homelux.in",
    supplierPhone: "+91 91234 56780",
    price: "$52 per sqm",
    description:
      "Custom-cut tempered glass table tops for dining, office, and coffee tables. Available in round, rectangular, and custom shapes.",
    moq: "5 units",
  },
  {
    id: "p6",
    name: "Colored Tempered Glass — Blue",
    category: "Tempered Glass",
    specifications: {
      thickness: "6mm",
      size: "2440x1220mm",
      color: "Ocean Blue",
      edgeFinish: "Seamed",
    },
    supplier: "ColorGlass India",
    supplierEmail: "info@colorglass.co.in",
    supplierPhone: "+91 88990 11223",
    price: "$58 per sqm",
    description:
      "Vibrant ocean blue tinted tempered glass for decorative partitions, splash backs, and façade cladding.",
    moq: "15 sqm",
  },
  {
    id: "p7",
    name: "Heat-Soaked Tempered Glass",
    category: "Tempered Glass",
    specifications: {
      thickness: "10mm",
      size: "Custom",
      color: "Clear",
      certification: "EN 14179 HST",
    },
    supplier: "SafetyFirst Glass",
    supplierEmail: "contact@safetyfirst.in",
    supplierPhone: "+91 77665 54433",
    price: "$78 per sqm",
    description:
      "Heat-soak tested tempered glass that virtually eliminates spontaneous breakage risk. Essential for overhead glazing and high-rise facades.",
    moq: "20 sqm",
  },
  {
    id: "p8",
    name: "Anti-Slip Tempered Glass Floor",
    category: "Tempered Glass",
    specifications: {
      thickness: "15mm",
      size: "Custom",
      color: "Clear with dot pattern",
      certification: "BS 6206",
    },
    supplier: "StrongBuild Glass",
    supplierEmail: "info@strongbuild.com",
    supplierPhone: "+91 99887 66554",
    price: "$120 per sqm",
    description:
      "Ultra-thick tempered glass with anti-slip ceramic dot pattern for glass floors, walkways, and mezzanines.",
    moq: "5 sqm",
  },

  // ═══════════════════════════════════════════════
  // LAMINATED GLASS (8 products)
  // ═══════════════════════════════════════════════
  {
    id: "p9",
    name: "Heavy-Duty Laminated Safety Glass",
    category: "Laminated Glass",
    specifications: {
      thickness: "10mm (5mm + PVB + 5mm)",
      size: "Up to 3m x 2m",
      color: "Clear, PVB Interlayer",
      coating: "UV Protected",
      certification: "SGCC",
    },
    supplier: "SafeBuild Glass",
    supplierEmail: "sales@safebuild.in",
    supplierPhone: "+91 98123 45670",
    price: "$75 per sqm",
    description:
      "Tough laminated safety glass offering high wind resistance and fall protection. Perfect for balcony railings and skylights.",
    moq: "15 sqm",
  },
  {
    id: "p10",
    name: "Acoustic Laminated Glass",
    category: "Laminated Glass",
    specifications: {
      thickness: "12mm (Special Acoustic PVB)",
      size: "Custom",
      color: "Clear",
      certification: "STC 38",
    },
    supplier: "SoundProof Glass Industries",
    supplierEmail: "hello@soundproofglass.com",
    supplierPhone: "+91 85432 10987",
    price: "$95 per sqm",
    description:
      "Laminated glass featuring a specialized acoustic interlayer for maximum noise reduction in busy urban areas or studios.",
    moq: "10 sqm",
  },
  {
    id: "p11",
    name: "Laminated Glass with SGP Interlayer",
    category: "Laminated Glass",
    specifications: {
      thickness: "12mm (6+SGP+6)",
      size: "Up to 3.2m x 2.4m",
      color: "Clear",
      certification: "ANSI Z97.1",
    },
    supplier: "SafeBuild Glass",
    supplierEmail: "sales@safebuild.in",
    supplierPhone: "+91 98123 45670",
    price: "$115 per sqm",
    description:
      "Ultra-strong laminated glass using SentryGlas Plus (SGP) interlayer — 5x stronger than PVB. Ideal for hurricane zones, glass floors, and structural applications.",
    moq: "10 sqm",
  },
  {
    id: "p12",
    name: "Colored Laminated Glass — Bronze",
    category: "Laminated Glass",
    specifications: {
      thickness: "8mm (4+PVB+4)",
      size: "Custom",
      color: "Bronze tint",
      coating: "UV filtered",
    },
    supplier: "ColorGlass India",
    supplierEmail: "info@colorglass.co.in",
    supplierPhone: "+91 88990 11223",
    price: "$70 per sqm",
    description:
      "Decorative bronze-tinted laminated glass that reduces solar heat gain while adding warmth. Popular for lobbies and atriums.",
    moq: "15 sqm",
  },
  {
    id: "p13",
    name: "Bulletproof Laminated Glass",
    category: "Laminated Glass",
    specifications: {
      thickness: "40mm (Multi-layer)",
      size: "Custom",
      color: "Clear",
      certification: "NIJ Level IIIA, EN 1063 BR4",
    },
    supplier: "ArmorGlass Defense",
    supplierEmail: "sales@armorglass.com",
    supplierPhone: "+91 70001 23456",
    price: "$450 per sqm",
    description:
      "Multi-layered ballistic-rated laminated glass for banks, VIP vehicles, government buildings, and high-security installations.",
    moq: "5 sqm",
  },
  {
    id: "p14",
    name: "Laminated Glass Skylight Panel",
    category: "Laminated Glass",
    specifications: {
      thickness: "10mm (5+PVB+5)",
      size: "Up to 2m x 1m",
      color: "Clear / Opal",
      coating: "UV Protected",
    },
    supplier: "HomeLux Glass",
    supplierEmail: "hello@homelux.in",
    supplierPhone: "+91 91234 56780",
    price: "$82 per sqm",
    description:
      "Safety laminated panels designed specifically for skylight applications. If broken, fragments remain bonded to the interlayer, preventing injury from falling glass.",
    moq: "10 sqm",
  },
  {
    id: "p15",
    name: "Switchable Smart Glass (PDLC)",
    category: "Laminated Glass",
    specifications: {
      thickness: "12mm",
      size: "Custom up to 1.5m x 3m",
      color: "Opaque ↔ Clear (switchable)",
      type: "PDLC Film Laminated",
    },
    supplier: "SmartGlaze Technologies",
    supplierEmail: "info@smartglaze.in",
    supplierPhone: "+91 99001 22334",
    price: "$280 per sqm",
    description:
      "Electronically switchable privacy glass that turns from opaque to transparent at the flick of a switch. Perfect for conference rooms, hospitals, and luxury interiors.",
    moq: "5 sqm",
  },
  {
    id: "p16",
    name: "Decorative Laminated Glass — Fabric Insert",
    category: "Laminated Glass",
    specifications: {
      thickness: "10mm",
      size: "Custom",
      color: "Various fabric patterns",
      type: "Fabric interlayer",
    },
    supplier: "ArtGlass Studio",
    supplierEmail: "studio@artglass.co.in",
    supplierPhone: "+91 82345 67890",
    price: "$130 per sqm",
    description:
      "Artistic laminated glass with real fabric, mesh, or decorative film sealed between glass layers. Stunning for feature walls, elevator cabs, and retail displays.",
    moq: "8 sqm",
  },

  // ═══════════════════════════════════════════════
  // FLOAT GLASS (8 products)
  // ═══════════════════════════════════════════════
  {
    id: "p17",
    name: "Standard Clear Float Glass",
    category: "Float Glass",
    specifications: {
      thickness: "4mm",
      size: "Stock sheets 2440x1830mm",
      color: "Clear",
    },
    supplier: "Crystal Clear Suppliers",
    supplierEmail: "bulk@crystalclear.in",
    supplierPhone: "+91 96543 21098",
    price: "$18 per sqm",
    description:
      "Budget-friendly 4mm float glass for standard residential windows. Available in large quantities at wholesale pricing.",
    moq: "100 sqm",
  },
  {
    id: "p18",
    name: "Tinted Float Glass — Bronze/Grey",
    category: "Float Glass",
    specifications: {
      thickness: "6mm",
      size: "2440x1830mm",
      color: "Bronze / Grey",
    },
    supplier: "Architectural Tints",
    supplierEmail: "orders@archtints.com",
    supplierPhone: "+91 94567 89012",
    price: "$28 per sqm",
    description:
      "Tinted 6mm glass for reducing solar glare and adding aesthetic appeal to building facades.",
    moq: "50 sqm",
  },
  {
    id: "p19",
    name: "Ultra-Clear Low-Iron Glass",
    category: "Float Glass",
    specifications: {
      thickness: "8mm",
      size: "Custom",
      color: "Ultra-Clear (low iron)",
    },
    supplier: "Premium Glass Co.",
    supplierEmail: "info@premiumglass.co",
    supplierPhone: "+91 93456 78901",
    price: "$60 per sqm",
    description:
      "High clarity low-iron glass, ideal for premium display cases, aquariums, and high-end interiors where maximum transparency is essential.",
    moq: "20 sqm",
  },
  {
    id: "p20",
    name: "Solar Control Reflective Glass",
    category: "Float Glass",
    specifications: {
      thickness: "6mm",
      size: "Stock sheets",
      coating: "Reflective metallic",
    },
    supplier: "SolarShield Glass",
    supplierEmail: "sales@solarshield.in",
    supplierPhone: "+91 92345 67890",
    price: "$35 per sqm",
    description:
      "Reflective glass that blocks out significant amounts of heat and glare, popular for commercial skyscrapers and office buildings.",
    moq: "50 sqm",
  },
  {
    id: "p21",
    name: "Green Tinted Float Glass",
    category: "Float Glass",
    specifications: {
      thickness: "5mm",
      size: "2440x1830mm",
      color: "Natural Green",
    },
    supplier: "Crystal Clear Suppliers",
    supplierEmail: "bulk@crystalclear.in",
    supplierPhone: "+91 96543 21098",
    price: "$22 per sqm",
    description:
      "Green-tinted float glass that provides moderate solar control while giving a natural aesthetic. Popular for residential and commercial windows.",
    moq: "75 sqm",
  },
  {
    id: "p22",
    name: "5mm Clear Float Glass",
    category: "Float Glass",
    specifications: {
      thickness: "5mm",
      size: "2140x1650mm / 2440x1830mm",
      color: "Clear",
    },
    supplier: "Crystal Clear Suppliers",
    supplierEmail: "bulk@crystalclear.in",
    supplierPhone: "+91 96543 21098",
    price: "$20 per sqm",
    description:
      "Versatile 5mm clear float glass for windows, picture frames, table tops, and general glazing. Available in standard sheet sizes.",
    moq: "50 sqm",
  },
  {
    id: "p23",
    name: "10mm Thick Float Glass",
    category: "Float Glass",
    specifications: {
      thickness: "10mm",
      size: "Custom cutting available",
      color: "Clear",
    },
    supplier: "Premium Glass Co.",
    supplierEmail: "info@premiumglass.co",
    supplierPhone: "+91 93456 78901",
    price: "$42 per sqm",
    description:
      "Heavy 10mm float glass suitable for furniture, shelving, and applications requiring thicker non-tempered glass.",
    moq: "20 sqm",
  },
  {
    id: "p24",
    name: "Patterned / Figured Float Glass",
    category: "Float Glass",
    specifications: {
      thickness: "4mm",
      size: "Standard sheets",
      color: "Clear with pattern (Chinchilla, Rain, Karatachi)",
    },
    supplier: "Architectural Tints",
    supplierEmail: "orders@archtints.com",
    supplierPhone: "+91 94567 89012",
    price: "$25 per sqm",
    description:
      "Textured patterned glass that provides privacy while allowing natural light. Multiple patterns available for bathroom windows, doors, and partitions.",
    moq: "30 sqm",
  },

  // ═══════════════════════════════════════════════
  // INSULATED GLASS UNITS (6 products)
  // ═══════════════════════════════════════════════
  {
    id: "p25",
    name: "Energy-Saving IGU (5+12+5)",
    category: "Insulated Glass",
    specifications: {
      thickness: "22mm (5mm Low-E + 12mm Argon + 5mm Clear)",
      size: "Custom heights up to 2m",
      coating: "Low-E",
      gas: "Argon filled",
    },
    supplier: "EcoGlaze Solutions",
    supplierEmail: "green@ecoglaze.com",
    supplierPhone: "+91 91010 20203",
    price: "$110 per sqm",
    description:
      "High performance dual-pane insulated glass units (5+12+5 config) designed for maximum energy efficiency in residential and commercial windows.",
    moq: "15 sqm",
  },
  {
    id: "p26",
    name: "Self-Cleaning Insulated Glass",
    category: "Insulated Glass",
    specifications: {
      thickness: "24mm",
      coating: "Hydrophilic + Photocatalytic",
      color: "Slightly blue tint",
    },
    supplier: "EcoGlaze Solutions",
    supplierEmail: "green@ecoglaze.com",
    supplierPhone: "+91 91010 20203",
    price: "$135 per sqm",
    description:
      "Advanced IGU with an exterior coating that breaks down organic dirt when exposed to UV light, minimizing maintenance for hard-to-reach windows.",
    moq: "10 sqm",
  },
  {
    id: "p27",
    name: "Triple-Pane Insulated Glass Unit",
    category: "Insulated Glass",
    specifications: {
      thickness: "36mm (4+12+4+12+4)",
      coating: "Double Low-E",
      gas: "Krypton filled",
    },
    supplier: "EcoGlaze Solutions",
    supplierEmail: "green@ecoglaze.com",
    supplierPhone: "+91 91010 20203",
    price: "$185 per sqm",
    description:
      "Triple-glazed insulated unit with double Low-E coatings and Krypton gas fill for extreme climate performance. Best-in-class U-value for passive house standards.",
    moq: "10 sqm",
  },
  {
    id: "p28",
    name: "IGU with Integral Blinds",
    category: "Insulated Glass",
    specifications: {
      thickness: "27mm",
      type: "Venetian blinds sealed inside IGU",
      color: "White / Grey / Black blinds",
    },
    supplier: "SmartGlaze Technologies",
    supplierEmail: "info@smartglaze.in",
    supplierPhone: "+91 99001 22334",
    price: "$220 per sqm",
    description:
      "Insulated glass units with magnetically operated venetian blinds sealed inside the cavity. Zero-maintenance, dust-free shading solution.",
    moq: "8 sqm",
  },
  {
    id: "p29",
    name: "Acoustic Insulated Glass Unit",
    category: "Insulated Glass",
    specifications: {
      thickness: "28mm (6+16+6 Acoustic)",
      gas: "Argon filled",
      certification: "STC 40+",
    },
    supplier: "SoundProof Glass Industries",
    supplierEmail: "hello@soundproofglass.com",
    supplierPhone: "+91 85432 10987",
    price: "$145 per sqm",
    description:
      "Insulated glass unit combining thermal insulation with superior sound reduction (STC 40+). Ideal for buildings near highways, airports, and urban noise.",
    moq: "10 sqm",
  },
  {
    id: "p30",
    name: "Curved Insulated Glass Unit",
    category: "Insulated Glass",
    specifications: {
      thickness: "24mm (6+12+6)",
      size: "Custom curved profiles",
      gas: "Argon filled",
    },
    supplier: "Premium Glass Co.",
    supplierEmail: "info@premiumglass.co",
    supplierPhone: "+91 93456 78901",
    price: "$250 per sqm",
    description:
      "Custom-bent insulated glass for curved facades, atrium roofs, and architectural feature windows. Factory-sealed for long-term insulation.",
    moq: "5 sqm",
  },

  // ═══════════════════════════════════════════════
  // MIRRORS (5 products)
  // ═══════════════════════════════════════════════
  {
    id: "p31",
    name: "Toughened Mirror Glass",
    category: "Mirrors",
    specifications: {
      thickness: "6mm",
      size: "Custom",
      color: "Silver",
      coating: "Copper-free",
    },
    supplier: "Reflecta Co.",
    supplierEmail: "sales@reflecta.in",
    supplierPhone: "+91 81234 56789",
    price: "$40 per sqm",
    description:
      "Impact-resistant toughened mirror suitable for gyms, dance studios, and high-traffic public restrooms.",
    moq: "10 sqm",
  },
  {
    id: "p32",
    name: "Antique / Aged Mirror Glass",
    category: "Mirrors",
    specifications: {
      thickness: "4mm",
      size: "Custom",
      color: "Antique patina finish",
    },
    supplier: "ArtGlass Studio",
    supplierEmail: "studio@artglass.co.in",
    supplierPhone: "+91 82345 67890",
    price: "$65 per sqm",
    description:
      "Decorative antiqued mirror with a vintage patina effect. Perfect for luxury bars, restaurants, boutiques, and heritage interiors.",
    moq: "8 sqm",
  },
  {
    id: "p33",
    name: "Two-Way / One-Way Mirror",
    category: "Mirrors",
    specifications: {
      thickness: "6mm",
      size: "Custom",
      color: "Reflective one side, transparent other",
    },
    supplier: "SmartGlaze Technologies",
    supplierEmail: "info@smartglaze.in",
    supplierPhone: "+91 99001 22334",
    price: "$75 per sqm",
    description:
      "Two-way observation mirror for interrogation rooms, security installations, reality TV studios, and magic mirror displays.",
    moq: "5 sqm",
  },
  {
    id: "p34",
    name: "LED Backlit Bathroom Mirror",
    category: "Mirrors",
    specifications: {
      thickness: "5mm",
      size: "600x800mm / 800x1000mm",
      type: "Integrated LED strip + demister pad",
    },
    supplier: "HomeLux Glass",
    supplierEmail: "hello@homelux.in",
    supplierPhone: "+91 91234 56780",
    price: "$85 per unit",
    description:
      "Modern LED-illuminated bathroom mirror with built-in demister and touch dimmer. IP44 rated for wet areas.",
    moq: "10 units",
  },
  {
    id: "p35",
    name: "Colored Mirror Glass — Black / Bronze",
    category: "Mirrors",
    specifications: {
      thickness: "4mm",
      size: "Custom",
      color: "Black / Bronze / Grey",
    },
    supplier: "Reflecta Co.",
    supplierEmail: "sales@reflecta.in",
    supplierPhone: "+91 81234 56789",
    price: "$50 per sqm",
    description:
      "Tinted decorative mirror available in black, bronze, and grey. Adds depth and sophistication to walls, ceilings, and furniture.",
    moq: "10 sqm",
  },

  // ═══════════════════════════════════════════════
  // SPECIALTY GLASS (7 products)
  // ═══════════════════════════════════════════════
  {
    id: "p36",
    name: "Fire-Rated Glass (60 min)",
    category: "Specialty Glass",
    specifications: {
      thickness: "12mm",
      certification: "UL Classified 60-min Fire Rating",
      color: "Clear",
    },
    supplier: "SafetyFirst Glass",
    supplierEmail: "contact@safetyfirst.in",
    supplierPhone: "+91 77665 54433",
    price: "$180 per sqm",
    description:
      "Specially formulated fire-resistant transparent glass for fire doors and highly regulated safety zones. Maintains integrity for 60 minutes.",
    moq: "5 sqm",
  },
  {
    id: "p37",
    name: "Fire-Rated Glass (120 min)",
    category: "Specialty Glass",
    specifications: {
      thickness: "19mm",
      certification: "UL 120-min, EN 1364",
      color: "Clear with slight haze",
    },
    supplier: "SafetyFirst Glass",
    supplierEmail: "contact@safetyfirst.in",
    supplierPhone: "+91 77665 54433",
    price: "$320 per sqm",
    description:
      "Heavy-duty 120-minute fire-rated glass for emergency stairwells, hospital corridors, and high-risk compartmentalization.",
    moq: "5 sqm",
  },
  {
    id: "p38",
    name: "X-Ray Shielding Glass",
    category: "Specialty Glass",
    specifications: {
      thickness: "10mm lead equivalent",
      size: "Custom",
      color: "Clear with slight amber tint",
      certification: "2mm Pb Lead Equivalent",
    },
    supplier: "MedGlass Solutions",
    supplierEmail: "med@medglass.in",
    supplierPhone: "+91 76543 21098",
    price: "$350 per sqm",
    description:
      "Lead-impregnated radiation shielding glass for hospital radiology rooms, CT suites, and dental X-ray areas.",
    moq: "3 sqm",
  },
  {
    id: "p39",
    name: "Electrochromic Smart Glass",
    category: "Specialty Glass",
    specifications: {
      thickness: "8mm",
      size: "Custom up to 1.5m x 1.5m",
      color: "Clear ↔ Tinted (variable)",
      type: "Electrochromic technology",
    },
    supplier: "SmartGlaze Technologies",
    supplierEmail: "info@smartglaze.in",
    supplierPhone: "+91 99001 22334",
    price: "$380 per sqm",
    description:
      "Electronically tintable glass that gradually changes from clear to dark tint. Eliminates need for blinds while controlling heat and glare dynamically.",
    moq: "5 sqm",
  },
  {
    id: "p40",
    name: "Self-Healing Anti-Scratch Glass",
    category: "Specialty Glass",
    specifications: {
      thickness: "6mm",
      size: "Custom",
      coating: "Nano-ceramic self-healing coating",
    },
    supplier: "Premium Glass Co.",
    supplierEmail: "info@premiumglass.co",
    supplierPhone: "+91 93456 78901",
    price: "$95 per sqm",
    description:
      "Glass with a nano-ceramic coating that self-heals minor scratches through natural thermal expansion. Ideal for high-touch surfaces and display counters.",
    moq: "10 sqm",
  },
  {
    id: "p41",
    name: "Anti-Reflective Museum Glass",
    category: "Specialty Glass",
    specifications: {
      thickness: "3mm",
      size: "Custom",
      coating: "Multi-layer AR coating (<0.5% reflection)",
      color: "Ultra-clear",
    },
    supplier: "ArtGlass Studio",
    supplierEmail: "studio@artglass.co.in",
    supplierPhone: "+91 82345 67890",
    price: "$150 per sqm",
    description:
      "Premium anti-reflective glass for framing artwork, museum displays, and gallery installations. Less than 0.5% surface reflection.",
    moq: "5 sqm",
  },
  {
    id: "p42",
    name: "Bird-Friendly Patterned Glass",
    category: "Specialty Glass",
    specifications: {
      thickness: "6mm",
      size: "Custom",
      type: "Ceramic frit dots / UV-reflective coating",
      certification: "LEED Bird Collision Credits",
    },
    supplier: "EcoGlaze Solutions",
    supplierEmail: "green@ecoglaze.com",
    supplierPhone: "+91 91010 20203",
    price: "$55 per sqm",
    description:
      "Glass with subtle ceramic frit or UV-reflective patterns visible to birds but nearly invisible to humans. Prevents bird collisions; qualifies for LEED credits.",
    moq: "20 sqm",
  },

  // ═══════════════════════════════════════════════
  // HARDWARE (8 products)
  // ═══════════════════════════════════════════════
  {
    id: "p43",
    name: "Stainless Steel Spider Fittings",
    category: "Hardware",
    specifications: {
      thickness: "Compatible with 10-15mm glass",
      material: "Stainless Steel 316",
      finish: "Polished Chrome",
    },
    supplier: "BuildPro Hardware",
    supplierEmail: "sales@buildpro.in",
    supplierPhone: "+91 80123 45678",
    price: "$45 per unit",
    description:
      "Heavy-duty spider fittings for constructing robust frameless glass facades and canopies.",
    moq: "20 units",
  },
  {
    id: "p44",
    name: "Aluminium U-Channel Profile",
    category: "Hardware",
    specifications: {
      length: "3m",
      material: "Anodized Aluminium",
      finish: "Matte Black / Silver",
    },
    supplier: "Allied Metals Base",
    supplierEmail: "orders@alliedmetals.com",
    supplierPhone: "+91 87654 32100",
    price: "$30 per length",
    description:
      "Sturdy aluminium U-channel base shoe for securing glass balcony railings and partitions.",
    moq: "10 pieces",
  },
  {
    id: "p45",
    name: "Frameless Glass Shower Hinges",
    category: "Hardware",
    specifications: {
      material: "Solid Brass",
      finish: "Brushed Nickel",
      type: "Wall-to-Glass 90°",
    },
    supplier: "AquaFit Hardware",
    supplierEmail: "info@aquafit.in",
    supplierPhone: "+91 86789 01234",
    price: "$25 per unit",
    description:
      "Premium solid brass hinges for frameless shower doors, tested for high durability and rust resistance.",
    moq: "20 units",
  },
  {
    id: "p46",
    name: "Glass Door Patch Fitting — Floor Spring",
    category: "Hardware",
    specifications: {
      material: "Stainless Steel 304",
      finish: "Satin / Mirror",
      type: "Floor spring + top pivot + patch",
    },
    supplier: "BuildPro Hardware",
    supplierEmail: "sales@buildpro.in",
    supplierPhone: "+91 80123 45678",
    price: "$120 per set",
    description:
      "Complete floor spring set for frameless glass doors — includes floor spring, top pivot, and patch fittings. Hydraulic speed control.",
    moq: "5 sets",
  },
  {
    id: "p47",
    name: "Glass Clamp for Railing — Square",
    category: "Hardware",
    specifications: {
      material: "Stainless Steel 316",
      finish: "Brushed / Mirror",
      type: "Square D-clamp, 8-12mm glass",
    },
    supplier: "BuildPro Hardware",
    supplierEmail: "sales@buildpro.in",
    supplierPhone: "+91 80123 45678",
    price: "$12 per unit",
    description:
      "Marine-grade square glass clamps for balcony and staircase glass balustrades. Fits 8mm to 12mm glass panels.",
    moq: "50 units",
  },
  {
    id: "p48",
    name: "Sliding Glass Door Track System",
    category: "Hardware",
    specifications: {
      length: "Custom up to 6m",
      material: "Aluminium + Stainless Steel rollers",
      type: "Top-hung sliding system",
    },
    supplier: "Allied Metals Base",
    supplierEmail: "orders@alliedmetals.com",
    supplierPhone: "+91 87654 32100",
    price: "$180 per set",
    description:
      "Premium top-hung sliding track system for frameless glass doors. Whisper-quiet rollers support panels up to 120kg.",
    moq: "3 sets",
  },
  {
    id: "p49",
    name: "Glass Shelf Brackets — Adjustable",
    category: "Hardware",
    specifications: {
      material: "Zinc Alloy, Chrome plated",
      type: "Adjustable shelf support, 6-10mm glass",
      finish: "Chrome",
    },
    supplier: "AquaFit Hardware",
    supplierEmail: "info@aquafit.in",
    supplierPhone: "+91 86789 01234",
    price: "$5 per pair",
    description:
      "Adjustable glass shelf brackets for retail displays, bathroom shelves, and cabinets. Fits 6mm to 10mm glass.",
    moq: "50 pairs",
  },
  {
    id: "p50",
    name: "Silicone Sealant — Structural Grade",
    category: "Hardware",
    specifications: {
      type: "Dow 795 equivalent",
      color: "Black / Clear / White",
      length: "300ml cartridge",
    },
    supplier: "Allied Metals Base",
    supplierEmail: "orders@alliedmetals.com",
    supplierPhone: "+91 87654 32100",
    price: "$8 per cartridge",
    description:
      "Professional-grade structural silicone sealant for curtain wall glazing, weather sealing, and bonding glass to metal frames. UV resistant.",
    moq: "24 cartridges",
  },
];
