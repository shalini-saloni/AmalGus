import { GoogleGenerativeAI } from "@google/generative-ai";
import { products } from "@/data/products";
import { localMatch } from "@/lib/localMatcher";
import { NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// Models to try in order — if one fails (quota, 404), try the next
const MODEL_PRIORITIES = [
  "gemini-2.0-flash-lite",
  "gemini-2.0-flash",
  "gemini-2.5-flash",
];

async function tryGeminiMatch(query: string, role: string): Promise<any[] | null> {
  if (!genAI) return null;

  const prompt = `You are an intelligent matching engine for the AmalGus glass and allied products marketplace.
The buyer's profile/role is: "${role}".
We have the following catalog of products:
${JSON.stringify(products, null, 2)}

The buyer's requirement is: "${query}"

Analyze the requirement and the catalog. Find the top 4-5 best matching products.
For each match, provide:
1. "id": The product ID
2. "score": A match score between 0 and 100 (number). Score higher if specific dimensions, thickness, or use-cases match.
3. "explanation": A short, clear explanation (1-2 sentences max) of why this product is a good fit. IMPORTANT: Tailor this explanation explicitly to their role (${role}). For an 'architect', highlight architectural specs/standards. For a 'homeowner', highlight safety/aesthetics. For a 'dealer', highlight wholesale utility/margins.

Return exactly and only a valid JSON object matching this schema.
{
  "matches": [
    {
      "id": "string",
      "score": 0,
      "explanation": "string"
    }
  ]
}`;

  for (const modelName of MODEL_PRIORITIES) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
        },
      });

      const responseText = result.response.text();
      const data = JSON.parse(responseText);
      if (data.matches && Array.isArray(data.matches) && data.matches.length > 0) {
        console.log(`[match] Gemini model "${modelName}" succeeded.`);
        return data.matches;
      }
    } catch (err: any) {
      console.warn(`[match] Gemini model "${modelName}" failed: ${err?.message?.slice(0, 120)}`);
      // continue to the next model
    }
  }

  return null; // all models failed
}

  export async function POST(req: Request) {
    try {
      const { query, role = "homeowner" } = await req.json();
      if (!query || typeof query !== "string" || !query.trim()) {
        return NextResponse.json({ error: "Query is required" }, { status: 400 });
      }
  
      // ── Try Gemini first ──
      let matchSource = "ai";
      let rawMatches = await tryGeminiMatch(query, role);
  
      // ── Fallback to local engine ──
      if (!rawMatches) {
        matchSource = "local";
        rawMatches = localMatch(query, role, 5);
      }

    // Enrich matches with full product details
    const finalResults = (rawMatches || [])
      .map((match: any) => {
        const product = products.find((p) => p.id === match.id);
        if (!product) return null;
        return {
          ...product,
          matchScore: match.score,
          matchExplanation: match.explanation,
        };
      })
      .filter(Boolean)
      .sort((a: any, b: any) => b.matchScore - a.matchScore)
      .slice(0, 5);

    return NextResponse.json({ results: finalResults, source: matchSource });
  } catch (error: any) {
    console.error("Match API error:", error);
    return NextResponse.json(
      { error: "Failed to perform matching", details: error?.message },
      { status: 500 }
    );
  }
}
