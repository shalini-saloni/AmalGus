export interface Partner {
  id: string;
  name: string;
  type: string;
  services: string[];
  rating: number;
  reviews: number;
  projectsCompleted: number;
  location: string;
  verified: boolean;
  description: string;
}

export const partners: Partner[] = [
  {
    id: "inst-1",
    name: "Precision Glassworks",
    type: "Installer",
    services: ["Shower Enclosures", "Glass Railings", "Partitions"],
    rating: 4.9,
    reviews: 124,
    projectsCompleted: 850,
    location: "Mumbai, MH",
    verified: true,
    description: "Expert installers specializing in frameless shower enclosures and heavy-duty glass railings with over 10 years of experience.",
  },
  {
    id: "meas-1",
    name: "LaserTech Dimensions",
    type: "Measurement Professional",
    services: ["Site Measurement", "CAD Drafting", "3D Scanning"],
    rating: 4.8,
    reviews: 56,
    projectsCompleted: 320,
    location: "Delhi, NCR",
    verified: true,
    description: "Using advanced laser scanning tech to provide mm-perfect measurements for complex curved and structural glass.",
  },
  {
    id: "inst-2",
    name: "Apex Facades",
    type: "Fabricator & Installer",
    services: ["Structural Glazing", "Curtain Walls", "Spiders"],
    rating: 4.7,
    reviews: 89,
    projectsCompleted: 154,
    location: "Bangalore, KA",
    verified: true,
    description: "Commercial structural glazing experts. We handle mid-to-high rise building envelopes and spider glazing.",
  },
  {
    id: "srv-1",
    name: "ClearView Maintenance",
    type: "Service & Maintenance",
    services: ["Hardware Replacement", "Sealant Repair", "High-Rise Cleaning"],
    rating: 4.6,
    reviews: 210,
    projectsCompleted: 1200,
    location: "Pune, MH",
    verified: false,
    description: "Annual maintenance contracts for residential societies and commercial buildings. Quick hardware replacements.",
  },
  {
    id: "inst-3",
    name: "Urban Windows & Doors",
    type: "Installer",
    services: ["UPVC/Aluminium Windows", "Sliding Systems", "Skylights"],
    rating: 4.9,
    reviews: 312,
    projectsCompleted: 940,
    location: "Hyderabad, TS",
    verified: true,
    description: "Specializing in allied products. We install high-end slimline aluminium sliding systems.",
  }
];
