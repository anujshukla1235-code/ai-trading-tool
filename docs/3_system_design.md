# Phase 3: System Design

**Architecture:**
- **Frontend:** Next.js (App Router), React, Tailwind CSS. User UI handle karega.
- **Backend (API):** Next.js API Routes. Frontend se text lega, LLM se connect karega, aur response wapas bhejega.
- **AI Engine:** Gemini API jo JSON schema enforce karega (Structured Outputs) taaki trading parameters reliable structure mein mile.
- **State Management:** Parsed JSON aur clarification state client-side (React state) mein rakha jayega — koi database nahi chahiye kyunki session temporary hai. Har naya query fresh state se start hota hai.

**Data Flow / User Journey:**
1. **ASK:** User type karta hai -> "Does buying NIFTY after 1% fall work?"
2. **PARSE:** API call jati hai LLM ko. LLM response deta hai JSON mein: `{ instrument: "NIFTY", timeframe: "Daily", entry: "fall >= 1%", filter: null, exit: null, holding_period: null, question: "Does the strategy have a positive edge?" }`
3. **CLARIFY:** Frontend check karta hai ki `exit` aur `holding_period` missing hai. Agar 1+ fields missing hain, toh UI par ek hi form mein sab missing fields ek saath aate hain -> "Please provide Exit Condition and Holding Period to continue".
4. **DEFINE:** User missing info input karta hai (client-side merge with existing parsed JSON — koi second LLM call nahi lagti, sirf state update).
5. **SHOW:** Final structure UI par ek Dashboard/Card view mein render hota hai.

**Error Handling Flow (new):**
- **Irrelevant query** (LLM khud flag karega via schema field jaise `is_trading_related: false`) -> UI par friendly message: "Yeh trading strategy query nahi lag rahi, dobara try karein."
- **Malformed/invalid JSON from LLM** -> backend try/catch mein ek retry karega (max 1 retry); agar phir bhi fail ho toh frontend ko generic error bhejega -> "Kuch gadbad hui, dobara try karein."
- **API timeout/down** -> API route mein timeout (e.g. 15s) set karna, frontend par loading spinner ke baad clear error state + retry button.
- **Rate limiting on our own `/api/parse-query` route:** Basic IP-based throttling (e.g. simple in-memory counter, since no DB) taaki public deployment mein koi hamara Gemini quota abuse na kar sake.

**Final Experiment Structure (matches assignment brief):**

**UI Screens:**
- Home Screen (Chat/Input interface)
- Refinement Component (Missing fields form — shows all missing fields together)
- Final Experiment Dashboard (Read-only structured data display)
- Error/Empty states (irrelevant query, API failure)
