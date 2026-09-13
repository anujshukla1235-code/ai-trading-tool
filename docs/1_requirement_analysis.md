# Phase 1: Requirement Analysis

**Project:** AI Trading Research Assistant (Mini Prototype)

**Objective:**
Ek aisi web application banana jahan user apni trading strategy se related questions natural language mein pooch sake, aur system use analyze karke ek structured "Experiment" banaye.

**Core Requirements:**
1. **User Input:** Natural language prompt lene ke liye text input.
2. **AI Processing:** User ki query ko samajhna aur important trading parameters nikalna (Instrument, Timeframe, Entry, Exit, Holding Period, Filters, **aur Question — user actually kya find out karna chahta hai**, e.g. "Does the strategy have a positive edge?"). Ye "Question" field assignment brief mein explicitly required hai, isliye final structure mein zaroor honi chahiye.
3. **Handling Ambiguity:** Agar koi crucial parameter missing hai (jaise "Exit condition"), toh system ko khud se assume nahi karna hai, balki user se puchna hai (Clarification Step).
   - **Clarification Rule (important):** Agar ek se zyada fields missing hon, toh unhe **ek hi form mein sab ek saath** dikhana hai (not one-by-one sequentially) — isse user experience fast rehta hai aur extra back-and-forth API calls nahi lagte.
4. **Output Display:** Ek clean UI jahan final structured experiment present ho.
5. **Irrelevant/Invalid Input Handling:** Agar query trading se related nahi hai (e.g., "capital of India"), system ko politely bata dena chahiye ki ye trading-related query nahi hai — koi crash ya garbage JSON nahi.
6. **Graceful Failure:** Agar LLM API fail ho jaye ya timeout ho, user ko clear error message milna chahiye ("Try again" option ke saath), koi blank/broken screen nahi.

**Success Criteria (Definition of Done):**
- Clear, unambiguous query ek hi pass mein fully parse ho (no clarification needed).
- Ambiguous query correctly missing fields identify kare aur ek combined form mein poochein.
- Irrelevant query ko gracefully reject kare with a helpful message.
- API failure/timeout ka bhi UI par proper feedback ho.
- End-to-end flow (Ask → Parse → Clarify → Show) ek baar mein bina crash ke complete ho.

**Out of Scope:**
- Pura production-grade backtesting engine nahi banana hai (Sirf research workflow aur thinking demonstrate karni hai).
- Live trading execution nahi karni hai.
- Multi-turn conversational memory (v1 mein sirf single query → single experiment flow hai).
