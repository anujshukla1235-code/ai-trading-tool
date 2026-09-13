# Phase 5: Testing Strategy

**AI/Prompt Testing (Edge Cases):**
- Alag-alag inputs test karna:
  - **Clear Input:** "Buy NIFTY on 5min chart when RSI < 30, hold for 2 days, exit when RSI > 70." (System ko sab extract karna chahiye, bina kisi clarification step ke).
  - **Ambiguous Input:** "Does buying after a sharp fall work?" (System ko Instrument, exact Entry magnitude, aur Exit puchna chahiye — sab ek hi form mein).
  - **Irrelevant Input:** "What is the capital of India?" (System ko gracefully handle karna chahiye aur batana chahiye ki ye trading query nahi hai).
  - **Empty/Gibberish Input:** Khali submit ya random characters — button disabled ho ya clear validation message aaye.

**Failure-Mode Testing (new):**
- Simulate malformed JSON from LLM (ya artificially force a bad response) -> confirm retry logic aur graceful error message kaam kar rahe hain.
- Simulate API timeout/down (e.g. wrong API key temporarily) -> confirm frontend error state + retry button dikhta hai, app crash nahi hota.
- Rapid repeated submissions -> confirm basic rate-limiting kaam kar raha hai aur user ko friendly message milta hai (not a raw 429 error).

**Functional Testing:**
- UI buttons aur forms sahi se state update kar rahe hain ya nahi.
- Clarification step ke baad (user se input lene ke baad), final JSON state theek se update aur merge ho rahi hai ya nahi — specifically jab **multiple** fields ek saath fill kiye jate hain.

**User Experience (UX) Testing:**
- Kya user flow simple aur intuitive hai?
- Loading states response delay ke time user ko proper feedback de rahe hain?
- Mobile/responsive check — chhoti screen par input aur clarification form usable hain ya nahi.
