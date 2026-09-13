# Agile Development Plan — AI Trading Research Assistant

**Methodology:** Solo-dev Kanban-flavored Scrum (chhoti team/solo project ke liye lightweight version — full Scrum ceremonies nahi, but sprint goals + backlog + daily check-ins zaroor)

**Total Duration:** 3 Days (3 short sprints, 1 din = 1 sprint)

---

## Product Backlog (Prioritized — MoSCoW)

**Must Have:**
- US-1: As a user, I can type a natural language trading query into a text input.
- US-2: As a user, my query is parsed by an LLM into structured JSON (Instrument, Timeframe, Entry, Exit, Holding Period, Filters).
- US-3: As a user, if crucial fields are missing, I get a single combined clarification form instead of wrong assumptions.
- US-4: As a user, I can fill missing fields and see my final structured "Experiment" in a clean dashboard view.
- US-5: As a user, if my query is irrelevant (not trading-related), I get a clear, friendly message instead of garbage output.

**Should Have:**
- US-6: As a user, if the API fails/times out, I see a proper error state with a retry option (not a blank/broken screen).
- US-7: As a developer, the app is protected by basic rate-limiting so the Gemini quota isn't abused on the public URL.

**Could Have:**
- US-8: As a user, the UI is responsive and usable on mobile.
- US-9: As a developer, I have a fallback LLM provider (OpenAI) ready in case Gemini is unreliable during demo.

**Won't Have (this iteration):**
- Full backtesting engine, live trading execution, multi-turn conversational memory.

---

## Sprint 1 (Day 1) — "Foundation & Core AI Pipeline"

**Sprint Goal:** Basic input → LLM parse → raw JSON output working end-to-end (no polish yet).

**Sprint Backlog:**
- Project setup: `npx create-next-app`, Tailwind, git init, `.env.local` + `.gitignore`.
- Build `/api/parse-query` route with Gemini SDK + `responseSchema` (structured output).
- Write & test the core extraction prompt (instrument, timeframe, entry, exit, holding period, filters, `is_trading_related` flag).
- Basic input UI (search-bar style) wired to the API.

**Definition of Done (Sprint 1):** User types a query → sees raw parsed JSON on screen (even if unstyled). Clear and ambiguous inputs both return *some* structured response.

**End-of-day check-in (solo standup):** Kya blocker hai? Prompt reliably JSON de raha hai ya nahi? Kal (Sprint 2) ka plan confirm karo.

---

## Sprint 2 (Day 2) — "Clarification Flow & UI"

**Sprint Goal:** Full user journey (Ask → Parse → Clarify → Show) working with a real UI.

**Sprint Backlog:**
- Missing-field detection logic (client-side, from parsed JSON).
- Refinement Component: dynamic form showing **all** missing fields together.
- Client-side merge logic (user input + existing parsed JSON → final object).
- Final Experiment Dashboard (read-only card view).
- Irrelevant-query handling (US-5) using the `is_trading_related` flag.

**Definition of Done (Sprint 2):** All 3 test personas work — clear input (no clarification), ambiguous input (clarification form → merge → dashboard), irrelevant input (graceful message).

**End-of-day check-in:** Demo the full flow to yourself/a friend. Note any UX friction for Sprint 3.

---

## Sprint 3 (Day 3) — "Hardening, Polish & Ship"

**Sprint Goal:** Production-ready-enough prototype, deployed, documented, recorded.

**Sprint Backlog:**
- Error handling: malformed JSON retry, API timeout handling, basic rate-limiting (US-6, US-7).
- Loading states/spinners, empty-input validation.
- Responsive/mobile pass (US-8).
- Run full regression: every Phase 5 test case, one more time.
- Deploy to Vercel, set env vars, verify live.
- Write `README.md` (architecture, tech stack, local setup).
- Record 2–3 min demo video (clear / ambiguous / irrelevant / error case).

**Definition of Done (Sprint 3):** Live Vercel URL works for all test cases, GitHub repo is clean (no leaked keys), README + demo video ready for submission.

**Sprint Review (self):** Compare final product against Sprint 1 goal — did scope creep happen? Note anything pushed to "Future Scope."

**Sprint Retro (self, 2 min):**
- What went well?
- What took longer than expected (usually: prompt tuning)?
- One thing to do differently next prototype.

---

## Daily Cadence (even solo, keep this discipline)
- **Start of day (5 min):** What's today's Sprint Goal? What's the one risky task to tackle first?
- **End of day (5 min):** Did I hit Definition of Done? What carries over?

## Risk Buffer
Agar Sprint 1 ya 2 overflow ho jaye, sabse pehle **Could Have (US-8, US-9)** items ko drop karo — Must Haves (US-1 to US-5) kabhi compromise mat karo, wahi core demo value hai.
