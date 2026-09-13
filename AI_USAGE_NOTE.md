# AI Usage Note

As required by the assignment brief, here is a transparent breakdown of how AI tools were used during the development of this project.

## Tools Used
- **ChatGPT**
- **Anthropic Claude 3.5 Sonnet**
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

## Conclusion
AI acted as a high-speed typist and brainstorming partner, but the product logic, edge-case handling, and system architecture were entirely human-led.
