# Phase 7: Maintenance & Future Scope

Prototype successful hone ke baad, agar is project ko scale karna ho toh next steps yeh ho sakte hain:

**1. Backtesting Engine Integration (Option 1 Bonus):**
- Is structured JSON data ko actual Python backtesting engine (jaise Backtrader, Zipline ya custom pandas script) ko bhejna.
- Historical data par test karke equity curve aur risk metrics (Sharpe ratio, Max drawdown) UI par show karna.

**2. Real Data & Charting Integration:**
- Yahoo Finance, yfinance, ya Kite Connect API se sample historical data fetch karke TradingView charts dikhana, taaki user dekh sake ki "1% fall" actual chart par kaisa dikhta hai.

**3. Advanced AI Capabilities:**
- User ke follow-up questions handle karne ke liye conversational memory (chat history) add karna.
- Multi-modal support: User chart ka screenshot upload kare aur LLM use analyze karke directly strategy create kare.

**4. Operational Maintenance (new):**
- **Cost monitoring:** LLM API usage/cost track karna as usage grows (free tier se aage badhne par).
- **User feedback loop:** Ek simple thumbs up/down ya "was this parsed correctly?" feedback capture karna taaki prompt future mein improve ho sake.
- **Persistent storage:** Agar users apne past "Experiments" save/revisit karna chahein, toh ek lightweight DB (e.g. Postgres/Supabase) add karna — abhi ke prototype mein zaroorat nahi thi kyunki state session-only hai.
