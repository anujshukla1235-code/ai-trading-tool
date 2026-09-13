# Phase 2: Feasibility Study

**Technical Feasibility:**
- Kya hum yeh bana sakte hain? Haan. Next.js aur React use karke frontend aur backend API routes easily manage ho jayenge.
- LLM Integration ke liye hum Gemini API (ya OpenAI/Claude) use kar sakte hain jo NLP parsing mein bohot strong hain. Structured JSON output nikalna LLMs ke liye ab easy aur reliable hai (Gemini ka native `responseSchema` / JSON mode use karenge taaki output guaranteed valid JSON structure mein aaye).
- **Risk:** Gemini free tier par rate limits hain (requests/minute). Prototype/demo ke liye ye kaafi hai, but agar recording ke time rapid testing karte hain toh limit hit ho sakti hai — isliye ek simple retry-with-backoff aur user-facing "please wait/try again" error zaroori hai.

**Time Feasibility:**
- **Estimated time:** 3-4 hours (core build) + 1 hour buffer for edge cases/polish/recording = ~4-5 hours total.
- **Deadline:** 3 days.
- Yeh time feasible hai but tight — is liye buffer explicitly rakha gaya hai kyunki LLM prompt tuning (especially clarification logic) usually 1-2 extra iterations leta hai.

**Resource Feasibility:**
- Free tier LLM APIs available hain (Gemini).
- Vercel par free frontend hosting mil jayegi.
- Koi heavy database ki zaroorat nahi hai (local state ya in-memory state se prototype chal jayega).
- **Security note:** `GEMINI_API_KEY` hamesha backend (API route) mein use hogi, frontend/client mein kabhi expose nahi hogi.

**Fallback Plan:**
- Agar Gemini API kisi wajah se unreliable nikle (rate limit/downtime during demo), OpenAI ka structured output (`response_format: json_schema`) backup ke roop mein ready rakhenge — prompt largely reusable rahega.
