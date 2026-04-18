# Glass121 — Powered by AmalGus

> The World's First B2B2C Niche Marketplace for Glass & Allied Products.

---

## Overview

**Glass121** is a full-featured marketplace prototype for the glass and allied building products industry — built by a founder with 25+ years of glass industry experience. Think of it as the **Amazon exclusively for the glass ecosystem**: deeper, smarter, and purpose-built.

The platform serves **multiple customer roles** — Homeowners, Architects, Builders, and Dealers — with role-aware AI matching, real-time pricing in INR (₹), and a curated catalog of glass products, allied materials, and verified suppliers.

### Why Does Glass121 Exist?

- The global glass construction market is worth **$150–190 Billion** growing at 5–7% CAGR, yet the industry still runs on WhatsApp and phone calls.
- **Zero transparency in pricing** — glass rates change daily based on raw material costs.
- Out of 604+ B2B building material companies globally, **NONE** focus specifically on the glass ecosystem.
- Buyers have no single platform to compare glass types, get instant estimates, or find verified fabricators.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 |
| **Font** | Inter (via `next/font/google`) |
| **Icons** | `lucide-react` |
| **AI Engine** | Google Gemini API (`@google/generative-ai`) |
| **Fallback Engine** | Custom keyword + spec matching (`localMatcher.ts`) |
| **Currency** | INR (₹) with per sq.ft pricing |

---

## Key Features

### 1. Role-Based Experience (Profile Gate)
On first visit, users select their profile — **Homeowner, Architect, Builder, or Dealer**. This selection:
- Persists in `localStorage`
- Is sent with every AI search query
- Tailors match explanations (e.g., safety/aesthetics for homeowners, structural specs for architects, margins for dealers)
- Displays the active role in the header

### 2. AI-Powered Smart Product Discovery
The homepage features a natural language search bar powered by a **hybrid AI matching engine**:

#### Gemini AI Engine (Primary)
- Sends the buyer's query, role, and full catalog to **Google Gemini** with a structured prompt
- Understands contextual intent (e.g., "safe for high wind" → impact-resistant laminated glass)
- Maps thickness, configurations (5+12+5 IGU), and certifications
- Returns ranked results with scores (0–100%) and role-tailored explanations
- Falls back through multiple models: `gemini-2.0-flash-lite` → `gemini-2.0-flash` → `gemini-2.5-flash`

#### Smart Local Engine (Fallback)
When Gemini is unavailable, a sophisticated local matching engine takes over:
- **Category keyword extraction** — maps query terms to product categories
- **Thickness parsing** — extracts mm values and IGU configurations
- **Use-case mapping** — detects application context (balcony, office, shower, facade)
- **Feature detection** — identifies UV, acoustic, fire-rated, energy-efficient needs
- **Price sensitivity** — detects budget-oriented queries
- **Role-aware explanations** — appends context based on user profile

### 3. Product Marketplace
Browse 50+ glass products with:
- **Category filters** (Float, Tempered, Laminated, Insulated, Decorative, Specialty, Mirrors)
- **Thickness filters** and keyword search
- **Compare Vendors & Order** — expand any product to see 3 competing vendor quotes
- **Allied products cross-sell** (Hardware, Sealants, Frames) at the bottom

### 4. Allied Materials Directory
A dedicated page for the **complete glass ecosystem** — 24 allied products across 11 categories:
- Doors & Windows, Glass Railings, Shower Enclosures
- Facades & Curtain Walls, Slim Partitions, Skylights & Canopies
- Hardware & Fittings, Silicones & Sealants
- Glass Machinery & Tools, Decorative Glass, Mirrors

Each product card includes: name, description, price (₹), supplier, category tag, and **In Stock / Out of Stock** badge.

### 5. Instant Estimate Generator
Buyers can generate rough cost estimates by selecting:
- Glass type and thickness
- Area in sq.ft
- Processing options (plain, tempered, laminated)

Outputs a detailed breakdown in ₹ with processing fees.

### 6. Verified Supplier Directory
Browse verified glass suppliers and fabricators with:
- Ratings, reviews, and project counts
- Specialization tags
- Location and contact information
- Consistent factory-icon branding

### 7. Service Partners Directory
Find installers, dimensioning professionals, and maintenance experts with service tags and ratings.

### 8. Daily Glass Rates Ticker
A live-style scrolling ticker showing current market rates for common glass types in ₹/sq.ft.

---

## Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | **AI Discovery** | Role-gated landing with hero section, AI search, and match results |
| `/marketplace` | **Products** | Browse 50+ products, filter by category/thickness, compare vendors |
| `/materials` | **Materials** | Allied products directory with stock status and pricing |
| `/estimate` | **Estimates** | Instant glass cost calculator in ₹ |
| `/suppliers` | **Suppliers** | Verified supplier directory with ratings |
| `/partners` | **Partners** | Service partners (installers, maintenance) |

---

## Setup & Run Locally

### Prerequisites
- Node.js 18+ installed
- A Google Gemini API key ([get one free](https://aistudio.google.com/apikey))

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/AmalGus.git
cd AmalGus

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.local.example .env.local
# Add your Gemini API key:
# GEMINI_API_KEY=your_key_here

# 4. Start the development server
npm run dev

# 5. Open in browser
open http://localhost:3000
```

### Environment Variables

Create a `.env.local` file in the root:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

> **Note:** The app works without a Gemini key — it falls back to the local matching engine automatically.

---

## Sample Queries to Try

- "I need 6mm tempered glass for office cabin partitions, clear, with polished edges"
- "Looking for laminated safety glass for balcony railing, 8–10mm thick, UV protected"
- "Budget-friendly 4mm float glass for windows in a residential project"
- "Insulated glass units for energy-efficient windows, 5+12+5 configuration"
- "shower glass for my bathroom renovation"
- "structural glazing for a 20-story commercial facade"
- "Fire-rated glass for commercial doors"

---

## Project Structure

```
src/
├── app/
│   ├── api/match/route.ts       # AI matching API endpoint (role-aware)
│   ├── marketplace/page.tsx     # Product catalog with vendor comparison
│   ├── materials/page.tsx       # Allied products directory
│   ├── estimate/page.tsx        # Instant cost estimate generator
│   ├── suppliers/page.tsx       # Verified supplier directory
│   ├── partners/page.tsx        # Service partners directory
│   ├── globals.css              # Global styles, animations
│   ├── layout.tsx               # Root layout with Inter font
│   └── page.tsx                 # Homepage — AI discovery + profile gate
├── components/
│   ├── GlobalHeader.tsx         # Glass121 branded header with role display
│   ├── DailyRatesTicker.tsx     # Live market rates ticker (₹/sq.ft)
│   ├── ContactModal.tsx         # Supplier contact modal
│   └── RoleSelector.tsx         # Profile/role selection component
├── data/
│   ├── products.ts              # Glass product catalog (50+ items, INR)
│   ├── alliedProducts.ts        # Allied materials catalog (24 items)
│   ├── suppliers.ts             # Supplier directory data
│   └── partners.ts             # Service partners data
└── lib/
    └── localMatcher.ts          # Offline fallback matching engine (role-aware)
```

---

## AI Tools Used

| Tool | How It Helped |
|------|---------------|
| **Google Gemini API** | Core matching engine — semantic understanding, role-aware scoring, and generating match explanations |
| **Antigravity (DeepMind AI Agent)** | Architecture planning, code scaffolding, UI/UX design, debugging, and rapid iteration |

---

## Assumptions & Trade-offs

1. **In-Memory Catalog**: 50+ mock products stored in TypeScript. In production, this would be a database with thousands of SKUs.
2. **Hybrid Matching**: Gemini AI is the primary engine, with a local fallback for resilience. A production system would use Embeddings + Vector DB (e.g., Pinecone/ChromaDB) for pre-filtering 10k+ products, then LLM for final ranking.
3. **INR Pricing**: All pricing is in Indian Rupees (₹) per sq.ft to match the Indian glass market. Production would support multi-currency.
4. **Role Persistence**: User roles are stored in `localStorage`. Production would use proper authentication (e.g., NextAuth.js).
5. **Multi-Model Fallback**: The API tries 3 Gemini models in sequence to handle rate limits and model availability gracefully.
6. **No Backend Database**: Focused on the discovery and marketplace UX. No user accounts, cart, or order management yet.

---

## Branding

- **Primary Brand**: Glass121
- **Powered By**: AmalGus
- **Logo**: `/public/amalgus_icon.webp`
- **Colors**: Light Cyan `#E7F6F5` (backgrounds), Dark Slate `#2A2F35` (text), Teal `#5A878B` (accents)

---

## License

This project is a prototype/demo. All rights reserved.
