# AmalGus — Smart Product Discovery for the Glass Marketplace

> AI-powered product discovery and intelligent matching engine for glass and allied building materials.

---

## Overview

AmalGus is a **B2B / B2C marketplace prototype** for glass and allied products (float glass, tempered glass, laminated glass, insulated glass units, mirrors, hardware, and other allied building materials).

This prototype demonstrates the core **Smart Product Discovery & Intelligent Matching** feature — helping buyers quickly find the right products and suppliers using plain English queries instead of navigating complex product catalogs.

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

---

## How the Intelligent Matching Works

The system uses a **hybrid approach** with two matching engines:

### 1. Gemini AI Engine (Primary)
When available, the buyer's natural language query and the full product catalog are sent to **Google Gemini (gemini-2.0-flash)** with a structured prompt. The LLM performs deep semantic analysis:
- Understands contextual intent (e.g., "safe for high wind" → impact-resistant laminated glass)
- Maps thickness (6mm, 10mm), configurations (5+12+5 IGU), and certifications
- Returns a ranked list with scores (0–100%) and clear explanations

The API tries multiple Gemini models in fallback order (`gemini-2.0-flash-lite` → `gemini-2.0-flash` → `gemini-2.5-flash`).

### 2. Smart Local Engine (Fallback)
When the Gemini API is unavailable (quota exceeded, network issues), a sophisticated local matching engine takes over. It uses:
- **Category keyword extraction** — maps query terms to product categories
- **Thickness parsing** — extracts mm values and IGU configurations (e.g., 5+12+5)
- **Use-case mapping** — detects application context (balcony, office, shower, facade)
- **Feature detection** — identifies UV protection, acoustic, fire-rated, energy-efficient needs
- **Price sensitivity** — detects budget-oriented queries and favors affordable products
- **Token overlap scoring** — general relevance via keyword matching

This ensures the app **always returns results**, even offline.

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

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | **Discovery** — AI-powered search with natural language input, match scores, and explanations |
| `/marketplace` | **Marketplace** — Browse all 15 products with category filters and search |
| `/suppliers` | **Suppliers** — View all verified suppliers with ratings and specializations |

---

## Sample Queries to Try

- "I need 6mm tempered glass for office cabin partitions, clear, with polished edges"
- "Looking for laminated safety glass for balcony railing, 8–10mm thick, UV protected"
- "Budget-friendly 4mm float glass for windows in a residential project, large quantity needed"
- "Insulated glass units for energy-efficient windows, 5+12+5 configuration"
- "Fire-rated glass for commercial doors"
- "Acoustic glass for recording studio"

---

## AI Tools Used

| Tool | How It Helped |
|------|---------------|
| **Google Gemini API** | Core matching engine — semantic understanding, scoring, and generating match explanations |
| **Antigravity (DeepMind AI Agent)** | Architecture planning, code scaffolding, debugging, and rapid iteration |

---

## Assumptions & Trade-offs

1. **In-Memory Catalog**: 15 mock products stored in TypeScript. In production, this would be a database with thousands of SKUs.
2. **Hybrid Matching**: Gemini AI is the primary engine, with a local fallback for resilience. A production system would use Embeddings + Vector DB (e.g., Pinecone/ChromaDB) for pre-filtering 10k+ products, then LLM for final ranking.
3. **Pricing as Strings**: Prices are stored as display strings (e.g., "$45 per sqm") for simplicity. Production would use numeric pricing with currency handling.
4. **No Auth/Database**: Focused purely on the discovery UX. No user accounts, cart, or order management.
5. **Multi-Model Fallback**: The API tries 3 Gemini models in sequence to handle rate limits and model availability gracefully.

---

## Project Structure

```
src/
├── app/
│   ├── api/match/route.ts    # AI matching API endpoint
│   ├── marketplace/page.tsx  # Product catalog browse page
│   ├── suppliers/page.tsx    # Supplier directory page
│   ├── globals.css           # Global styles, animations
│   ├── layout.tsx            # Root layout with Inter font
│   └── page.tsx              # Homepage with AI discovery
├── data/
│   └── products.ts           # Mock product catalog (15 items)
└── lib/
    └── localMatcher.ts       # Offline fallback matching engine
```

---

## License

MIT
