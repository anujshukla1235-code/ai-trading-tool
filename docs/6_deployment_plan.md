# Phase 6: Deployment Plan

**Hosting Provider:**
Vercel (Next.js projects ke liye best, seamless aur free hosting option).

**Deployment Steps:**
1. Codebase ko ek nayi public GitHub repository mein push karna — **push karne se pehle confirm karo ki `.env.local` `.gitignore` mein hai aur koi API key commit history mein nahi hai.**
2. Repository ko Vercel dashboard se connect karna.
3. Environment Variables set karna (Vercel dashboard mein, code mein nahi):
   - `GEMINI_API_KEY`: Model ko securely backend se call karne ke liye.
4. Deploy button hit karna aur live URL generate karna.
5. Deploy hone ke baad, live URL par saare Phase 5 test cases ek baar dobara quickly verify karna (local aur production environment mein differences aa sakte hain).

**Deliverables for Submission (as per assignment brief — Option 1):**
1. **Deployed Live Link** (Vercel URL preferred).
2. **Public GitHub Repo link** (with `.env.example` included, real key excluded, complete source code).
3. **`README.md`** — must include:
   - Architecture
   - Technologies used
   - AI tools used
   - **Key decisions** (e.g. why single combined clarification form, why client-side state, why Gemini structured output)
   - **What you would improve with more time** (e.g. backtesting integration, conversational memory, persistent storage)
4. **AI Usage Note (short, separate section or file)** — required by the brief, must cover:
   - Which AI tools used (e.g. Claude, ChatGPT, Cursor, etc.)
   - What you used them for (e.g. boilerplate, prompt drafting, debugging)
   - What parts you personally designed (e.g. clarification-form UX, error-handling flow, schema design)
   - What parts you reviewed or modified from AI suggestions
5. **2-3 minute screen recording demo video** — User journey dikhane ke liye: Clear input (no clarification), Ambiguous input + clarification form, Irrelevant/error case (robustness demonstrate karne ke liye).

**Bonus (optional, not required for evaluation):**
- Structured experiment JSON ko ek mock/demo backtesting engine call ko bhejna dikhana (even just a stubbed function) — ye already Phase 7 (Maintenance & Future Scope) mein cover hai as a "next step," so isse present tense mein bonus ke roop mein bhi frame kiya ja sakta hai agar time bache.
- Development Plan ke **Step 5** mein concrete plan diya gaya hai: ek `/api/mock-backtest` stub route + UI par "Run Backtest (Demo)" button, clearly labeled as simulated data. Sirf tab implement karo jab core flow (Steps 1-4) fully polished ho aur time bache.
