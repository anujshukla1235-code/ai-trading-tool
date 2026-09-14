# AI Trading Research Assistant

This is a prototype web application designed to help traders convert their natural language trading ideas into structured experiments. Built as part of a technical assignment.

## Overview
The assistant takes a natural language query (e.g., "Does buying NIFTY after a sharp fall work?"), extracts key trading parameters using an LLM, and handles ambiguity by asking the user to clarify any missing fields (like Exit condition or exact Entry Magnitude). Once all fields are gathered, it outputs a clean, structured JSON experiment.
## AI Tools Used
This project was built with the assistance of Claude, ChatGPT, and Google Gemini — used for architecture brainstorming, UI scaffolding, and prompt/schema drafting respectively. See `AI_USAGE_NOTE.md` for a detailed breakdown of what was AI-generated vs. personally designed, reviewed, or modified.

## Architecture & Technologies
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Lucide Icons
- **AI Integration:** Google Gemini API (`gemini-3.6-flash`) using `@google/genai`
- **State Management:** React `useState` (Client-side)

## Key Decisions
1. **Single Combined Clarification Form:** Instead of asking for missing fields sequentially (which requires multiple LLM calls and slows down the user), the system identifies *all* missing required fields at once and presents a single clarification form.
2. **Client-Side State Merging:** Once the initial AI parsing is done, missing field clarifications are merged directly in the React state. We do *not* make a second expensive/slow LLM call to merge the data.
3. **Structured Outputs (Native Schema):** We use Gemini's native `responseSchema` to strictly enforce the JSON structure rather than relying solely on prompt engineering. This guarantees we get exactly the keys we expect without parsing errors.
4. **Vague Entry Detection:** The prompt strictly rejects qualitative words like "sharp fall" without a numeric threshold, forcing it to `null` so the UI explicitly asks the user for a quantifiable number.

## What I'd Improve with More Time
- **Real Backtesting Engine Integration:** The current "Run Backtest" button returns mock data. I would connect the structured JSON output to a Python backend running `Backtrader` or `pandas` for real historical testing.
- **Conversational Memory:** Allow the user to say "Change the timeframe to 5min" after the initial result, rather than starting from scratch.
- **Persistent Storage:** Save previous experiments to a database (e.g., PostgreSQL or Firebase) so users can review their past trading ideas.

## Setup Instructions
1. Clone the repository.
2. Run `npm install`.
3. Create a `.env.local` file in the root and add your Gemini API key:
   `GEMINI_API_KEY=your_key_here`
4. Run `npm run dev` and open `http://localhost:3000`.

## Demo
A short demo video of the complete user journey is provided with the submission, showing:
- Clear input parsing
- Ambiguous input handling (clarification form)
- Irrelevant query rejection
- Bonus: Mock backtest execution
