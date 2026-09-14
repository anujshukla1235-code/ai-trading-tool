# AI Usage Note

As required by the assignment brief, here is a transparent breakdown of how AI tools were used during the development of this project.

## Tools Used
- **ChatGPT**
- **Claude**
- **Google Gemini**

## How They Were Used
- **Architecture & Logic (Claude):** Used Claude to brainstorm the initial application architecture, especially the logic for handling missing fields in a single UI form rather than a sequential chatbot.
- **Boilerplate & UI (ChatGPT):** Used ChatGPT to quickly scaffold the Next.js App Router structure and generate the Tailwind CSS components (forms, cards, buttons) for the frontend.
- **Prompt Drafting (Gemini):** Used Gemini to assist in drafting the strict system prompt and testing the JSON schema definition for the `@google/genai` SDK.

## What I Personally Designed & Governed
While AI tools wrote a lot of the actual code syntax, the **core product decisions and UX** were strictly my own logic:
1. **The Clarification Flow UX:** I explicitly designed the system to build a *single combined form* for missing fields, explicitly rejecting the AI's initial suggestion of a standard "one-by-one" conversational pattern to save API calls and time.
2. **Client-Side State Merging:** I decided that the clarification step should just update React state rather than making a second LLM call, improving app speed.
3. **Vague-Term Handling Logic:** I identified that words like "sharp fall" would break a real backtester, so I engineered the rule in the schema to strictly reject them and force a user clarification.
4. **Error Handling Architecture:** I designed the requirement to use the `is_trading_related` flag for graceful failure on irrelevant queries, rather than letting the LLM hallucinate trading parameters for random questions.
5. ## What I Reviewed or Modified
AI-generated code was not accepted blindly — every feature was manually tested end-to-end before being considered done:
1. **Entry Condition Bug:** During testing, the "Entry Condition" field initially appeared to show unformatted values (e.g. ">= 1%" instead of "Falls >= 1%"). I traced this by testing the raw API response directly (via a terminal request) before touching the UI, and confirmed the backend logic was correct — the issue was in my own manual test input, not the code. This reinforced my decision to always verify against raw API output before assuming a bug in the LLM layer.
2. **Vague-Term Detection:** The AI's first draft of the schema did not explicitly reject qualitative terms like "sharp fall" without a number — I rewrote the field description and system prompt rules myself to enforce this, since it's core to the "handling ambiguity" requirement of the assignment.
3. **Clarification Form Fields:** I reviewed and adjusted placeholder text (e.g. changing generic hints to concrete examples like "Falls >= 1%") after noticing it could mislead a user into omitting the direction.
4. **Error Handling:** I manually tested edge cases (empty input, irrelevant queries, malformed responses) rather than trusting AI's claims that error handling was "done" — this caught gaps that were then fixed.

## Conclusion
AI acted as a high-speed typist and brainstorming partner, but the product logic, edge-case handling, and system architecture were entirely human-led.
