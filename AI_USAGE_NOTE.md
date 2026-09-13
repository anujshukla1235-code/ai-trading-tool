# AI Usage Note

As required by the assignment brief, here is a transparent breakdown of how AI tools were used during the development of this project.

## Tools Used
- **Google Gemini (Integrated via Advanced Agent / Chat)**

## How It Was Used
- **Boilerplate Generation:** Used to quickly scaffold the Next.js App Router structure and generate the Tailwind UI components (forms, cards, buttons).
- **Prompt Drafting:** Assisted in drafting the initial system prompt and JSON schema definition for the `@google/genai` SDK.
- **Debugging:** Used to quickly identify a file path issue (Next.js `--src-dir` mismatch) and a model deprecation error (`gemini-2.5-flash` to `gemini-3.6-flash`).

## What I Personally Designed & Governed
While AI wrote a lot of the actual code syntax, the **core architecture and UX decisions** were strictly my own logic:
1. **The Clarification Flow UX:** I explicitly instructed the AI to build a *single combined form* for missing fields, explicitly rejecting the standard chatbot "one-by-one" conversational pattern.
2. **Client-Side State Merging:** I decided that the clarification step should just update React state rather than making a second LLM call.
3. **Vague-Term Handling Logic:** I identified that words like "sharp fall" would break a real backtester, so I engineered the rule in the schema to strictly reject them and force a user clarification.
4. **Error Handling Architecture:** I designed the requirement to use the `is_trading_related` flag for graceful failure on irrelevant queries, rather than letting the LLM hallucinate trading parameters for random questions.

## Conclusion
AI acted as a high-speed typist and syntax checker, but the product logic, edge-case handling, and system architecture were human-led.
