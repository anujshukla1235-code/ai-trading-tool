# Phase 4: Development Plan

**Step-by-Step Execution:**

**Step 1: Setup & Initialization**
- `npx create-next-app@latest` run karke project initialize karna.
- Git init aur first commit karna (taaki development history clean rahe).
- Tailwind CSS configure karna aur required icons/libraries (lucide-react, axios) install karna.
- `.env.local` file banana (`GEMINI_API_KEY=...`) aur `.env.example` + `.gitignore` mein `.env.local` add karna (taaki key accidentally GitHub par push na ho).

**Step 2: Backend & AI Integration**
- `/api/parse-query` route banana.
- Gemini API ka SDK install karna.
- System prompt likhna jo trading parameters ko extract kare, using Gemini's native `responseSchema` (structured output mode) — taaki JSON malformed na aaye by design, sirf prompt engineering par depend na karein.
- Schema mein ek `is_trading_related: boolean` field bhi include karna (irrelevant query detect karne ke liye).
- try/catch + 1 retry + timeout handling implement karna.

**Step 3: Frontend Development**
- Main input component banana (Search bar style).
- State management implement karna (loading states, parsedData, missingFields array, error state).
- Missing fields ke liye dynamic input form banana (sab missing fields ek saath).
- Final Experiment display design karna.

**Step 4: Refinement & Polish**
- Edge cases handle karna (irrelevant input, empty input, API failure, rate-limit hit).
- Error handling aur loading spinners add karna.
- Code quality aur folder structure ko clean karna.
- Manually saari Phase 5 test cases run karna before recording demo.

**Step 5: Bonus — Backtesting Stub (Optional, only if time permits)**
- Assignment brief mein ye explicitly "optional" aur "not required for evaluation" bataya gaya hai — isliye sirf tab karo jab Steps 1-4 fully done ho aur time bache.
- Ek simple `/api/mock-backtest` route banana jo final structured Experiment JSON accept kare aur **hardcoded/simulated** result return kare (e.g. `{ trades: 42, win_rate: "58%", note: "Mock result — not real backtest data" }`) — real historical data ki zaroorat nahi.
- Final Experiment Dashboard par ek chhota "Run Backtest (Demo)" button add karna jo is mock API ko call kare aur result ek simple card mein dikhaye.
- **Clearly label as "Demo/Simulated"** on the UI — real backtest jaisa dikhna nahi chahiye, taaki ye misleading na lage.
- Goal: sirf ye demonstrate karna ki structured JSON output easily kisi bhi real backtesting engine (Backtrader/Zipline/pandas) ko pass ho sakta hai — full logic nahi banani.
