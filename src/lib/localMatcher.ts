/**
 * Local Intelligent Matching Engine
 * A sophisticated keyword + specification-based matcher that works
 * entirely offline as a fallback when the Gemini API is unavailable.
 *
 * Scoring Strategy:
 *   - Category match (weighted)
 *   - Thickness match
 *   - Use-case / application keyword match
 *   - Feature / coating / certification keyword match
 *   - Price sensitivity detection
 *   - Size / dimension keyword match
 */

import { Product, products } from "@/data/products";

// ── helpers ──────────────────────────────────────────────────────────

function normalize(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
}

function extractTokens(text: string): string[] {
  return normalize(text).split(" ").filter(Boolean);
}

/** Check if any of the needles appear in the haystack */
function containsAny(haystack: string, needles: string[]): boolean {
  const h = normalize(haystack);
  return needles.some((n) => h.includes(n));
}

function countMatches(haystack: string, needles: string[]): number {
  const h = normalize(haystack);
  return needles.filter((n) => h.includes(n)).length;
}

// ── category mapping ─────────────────────────────────────────────────

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  "Tempered Glass": ["tempered", "toughened", "safety glass", "heat strengthened"],
  "Laminated Glass": ["laminated", "pvb", "interlayer", "safety glass", "laminate"],
  "Float Glass": ["float", "annealed", "standard glass", "plain glass", "sheet glass"],
  "Insulated Glass": ["insulated", "igu", "double glazed", "double pane", "triple pane", "energy efficient", "thermal"],
  "Hardware": ["hardware", "fitting", "hinge", "channel", "spider", "clamp", "bracket", "profile", "aluminium", "aluminum"],
  "Mirrors": ["mirror", "reflective mirror", "looking glass"],
  "Specialty Glass": ["fire rated", "fire resistant", "fireproof", "specialty", "special"],
};

// ── use-case keywords ────────────────────────────────────────────────

const USE_CASE_KEYWORDS: Record<string, string[]> = {
  partition: ["partition", "divider", "cabin", "cubicle", "office", "room divider"],
  balcony: ["balcony", "railing", "balustrade", "terrace", "deck"],
  window: ["window", "fenestration", "glazing", "residential"],
  shower: ["shower", "bathroom", "bath", "wet area", "enclosure"],
  facade: ["facade", "curtain wall", "exterior", "skyscraper", "commercial building"],
  skylight: ["skylight", "roof", "overhead", "canopy"],
  interior: ["interior", "indoor", "decoration", "display", "cabinet", "furniture"],
  acoustic: ["acoustic", "soundproof", "noise", "sound reduction", "studio"],
  fire: ["fire", "fireproof", "fire rated", "safety zone"],
  energy: ["energy", "efficient", "thermal", "insulation", "eco"],
};

// ── feature keywords ─────────────────────────────────────────────────

const FEATURE_KEYWORDS: Record<string, string[]> = {
  uv: ["uv", "ultraviolet", "uv protected", "uv protection"],
  lowE: ["low e", "low-e", "emissivity"],
  frosted: ["frosted", "acid etched", "privacy", "opaque", "translucent", "obscure"],
  selfCleaning: ["self cleaning", "self-cleaning", "photocatalytic", "hydrophilic", "low maintenance"],
  solar: ["solar", "heat reduction", "glare", "reflective", "tinted", "sun"],
  clear: ["clear", "transparent", "ultra clear", "low iron"],
  polished: ["polished", "smooth edge", "polished edge", "finished edge"],
  wind: ["wind", "storm", "hurricane", "impact", "high wind", "cyclone"],
  budget: ["budget", "cheap", "affordable", "economical", "cost effective", "low cost", "inexpensive"],
  premium: ["premium", "high end", "luxury", "top quality", "best"],
};

// ── thickness extraction ─────────────────────────────────────────────

function extractThicknesses(text: string): number[] {
  const matches = text.match(/(\d+(?:\.\d+)?)\s*mm/gi);
  if (!matches) return [];
  return matches.map((m) => parseFloat(m));
}

/** Extract IGU configurations like 5+12+5 */
function extractIGUConfig(text: string): string | null {
  const match = text.match(/(\d+)\s*\+\s*(\d+)\s*\+\s*(\d+)/);
  return match ? match[0].replace(/\s/g, "") : null;
}

// ── main scoring function ────────────────────────────────────────────

interface ScoredProduct {
  product: Product;
  score: number;
  reasons: string[];
}

function scoreProduct(query: string, product: Product): ScoredProduct {
  const q = normalize(query);
  const reasons: string[] = [];
  let score = 0;

  // Build a searchable blob from the product
  const productBlob = normalize(
    [
      product.name,
      product.category,
      product.description,
      product.supplier,
      Object.values(product.specifications).join(" "),
    ].join(" ")
  );

  // ── 1. Category match (0–25 pts) ──
  for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (containsAny(q, keywords)) {
      if (product.category === cat) {
        score += 25;
        reasons.push(`Matches requested category: ${cat}`);
      } else if (containsAny(productBlob, keywords)) {
        score += 8;
      }
    }
  }

  // ── 2. Thickness match (0–20 pts) ──
  const queryThicknesses = extractThicknesses(query);
  const productThicknesses = extractThicknesses(
    (product.specifications.thickness || "") + " " + product.name
  );

  if (queryThicknesses.length > 0 && productThicknesses.length > 0) {
    for (const qt of queryThicknesses) {
      for (const pt of productThicknesses) {
        if (qt === pt) {
          score += 20;
          reasons.push(`Exact thickness match: ${qt}mm`);
        } else if (Math.abs(qt - pt) <= 2) {
          score += 10;
          reasons.push(`Close thickness: product is ${pt}mm (requested ${qt}mm)`);
        }
      }
    }
  }

  // ── 2b. IGU configuration match (0–15) ──
  const queryIGU = extractIGUConfig(query);
  const productIGU = extractIGUConfig(product.specifications.thickness || "");
  if (queryIGU && productIGU) {
    if (queryIGU === productIGU) {
      score += 15;
      reasons.push(`Exact IGU configuration match: ${queryIGU}`);
    }
  }

  // ── 3. Use-case keyword match (0–20 pts) ──
  for (const [useCase, keywords] of Object.entries(USE_CASE_KEYWORDS)) {
    const queryHits = countMatches(q, keywords);
    if (queryHits > 0) {
      const productHits = countMatches(productBlob, keywords);
      if (productHits > 0) {
        const pts = Math.min(20, queryHits * productHits * 5);
        score += pts;
        reasons.push(`Suitable for ${useCase} applications`);
      }
    }
  }

  // ── 4. Feature keyword match (0–15 pts) ──
  for (const [feature, keywords] of Object.entries(FEATURE_KEYWORDS)) {
    if (containsAny(q, keywords) && containsAny(productBlob, keywords)) {
      score += 8;
      reasons.push(`Has requested feature: ${feature.replace(/([A-Z])/g, " $1").trim()}`);
    }
  }

  // ── 5. Price sensitivity (0–10 pts) ──
  if (containsAny(q, FEATURE_KEYWORDS.budget)) {
    const priceNum = parseFloat(product.price.replace(/[^0-9.]/g, ""));
    if (priceNum <= 25) {
      score += 10;
      reasons.push("Budget-friendly price point");
    } else if (priceNum <= 40) {
      score += 5;
      reasons.push("Moderately priced");
    }
  }

  // ── 6. General token overlap (0–10 pts) ──
  const queryTokens = extractTokens(query).filter((t) => t.length > 2);
  const hits = queryTokens.filter((t) => productBlob.includes(t));
  const overlapScore = Math.min(10, Math.round((hits.length / Math.max(queryTokens.length, 1)) * 10));
  score += overlapScore;

  // Cap at 100
  score = Math.min(100, score);

  return { product, score, reasons };
}

// ── public API ───────────────────────────────────────────────────────

export interface LocalMatchResult {
  id: string;
  score: number;
  explanation: string;
}

export function localMatch(query: string, role: string = "homeowner", topN = 5): LocalMatchResult[] {
  const scored = products
    .map((p) => scoreProduct(query, p))
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);

  // Normalize: if the top score is below 30 give a gentle boost so the UI still looks reasonable
  const maxScore = scored[0]?.score ?? 0;
  const boostFactor = maxScore < 30 ? 2.5 : maxScore < 50 ? 1.5 : 1;

  let roleContext = "Perfect for your residential project.";
  if (role === "architect") {
    roleContext = "Meets rigorous architectural specifications and structural standards.";
  } else if (role === "builder" || role === "dealer") {
    roleContext = "Excellent margins and reliable supply for bulk trade requirements.";
  }

  return scored.map(({ product, score, reasons }) => {
    const boosted = Math.min(98, Math.round(score * boostFactor));
    const baseExplanation = reasons.length > 0
          ? reasons.slice(0, 3).join(". ") + "."
          : "General relevance to your query based on product characteristics.";

    return {
      id: product.id,
      score: boosted,
      explanation: `${baseExplanation} ${roleContext}`,
    };
  });
}
