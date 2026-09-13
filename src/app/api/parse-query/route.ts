import { GoogleGenAI, Type } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const querySchema = {
  type: Type.OBJECT,
  properties: {
    is_trading_related: {
      type: Type.BOOLEAN,
      description: "True if the query is about trading, markets, or financial instruments. False for gibberish or general knowledge.",
    },
    instrument: {
      type: Type.STRING,
      description: "The trading instrument (e.g., NIFTY, AAPL, Gold). Null if not specified.",
      nullable: true,
    },
    timeframe: {
      type: Type.STRING,
      description: "The chart timeframe (e.g., 5min, Daily). Null if not specified.",
      nullable: true,
    },
    entry: {
      type: Type.STRING,
      description: "Specific, quantifiable condition to enter the trade. MUST include the direction (e.g., 'Falls >= 1%', 'RSI crosses above 30'). If the user uses vague terms like 'sharp fall' WITHOUT a number, set this strictly to null.",
      nullable: true,
    },
    exit: {
      type: Type.STRING,
      description: "Condition to exit the trade (e.g., 'RSI > 70', 'Stop loss 1%'). Null if not specified.",
      nullable: true,
    },
    holding_period: {
      type: Type.STRING,
      description: "How long to hold the position (e.g., '2 days'). Null if not specified.",
      nullable: true,
    },
    filters: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Additional market conditions or filters (e.g., 'high volatility').",
      nullable: true,
    },
    question: {
      type: Type.STRING,
      description: "A distilled, formal research question or hypothesis derived from the user's intent. Do NOT just repeat the raw query. Formulate it as a testable hypothesis (e.g., 'Does the strategy have a positive edge?'). Null if not specified.",
      nullable: true,
    },
  },
  required: ["is_trading_related"],
};

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    if (!query || typeof query !== "string" || query.trim() === "") {
      return NextResponse.json({ error: "Please provide a valid query." }, { status: 400 });
    }

    const MAX_RETRIES = 1;
    let attempt = 0;
    
    while (attempt <= MAX_RETRIES) {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-3.6-flash",
          contents: `You are a strict financial parsing AI. Extract trading parameters from this query: "${query}"
          
          CRITICAL RULES:
          1. 'entry' MUST include the direction. Never output just ">= 1%". Output "Falls >= 1%" or "Price drops 1%".
          2. If the query uses qualitative/vague words like "sharp", "big", or "heavy" for the entry condition WITHOUT a specific number or percentage, you MUST set 'entry' to null. Do not invent a number.`,
          config: {
            responseMimeType: "application/json",
            responseSchema: querySchema,
          },
        });

        const parsedData = JSON.parse(response.text || "{}");
        return NextResponse.json(parsedData);
      } catch (retryError) {
        attempt++;
        if (attempt > MAX_RETRIES) {
          console.error("Max retries reached parsing query:", retryError);
          return NextResponse.json(
            { error: "Failed to process the request robustly. Please try again." },
            { status: 500 }
          );
        }
        console.warn(`Retry ${attempt} for parsing query...`);
      }
    }
  } catch (error) {
    console.error("Error in parse-query API:", error);
    return NextResponse.json(
      { error: "Internal Server Error." },
      { status: 500 }
    );
  }
}
