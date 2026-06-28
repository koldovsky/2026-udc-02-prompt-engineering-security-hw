---
name: explain-code
description: Explain how the code works; make it understandable to junior developers or new team members
version: 1
---

# Explain money.ts

## Baseline (weak)

```text
розкажи як це працює
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Technical educator. You explain code clearly to junior developers and newcomers.

Goal: Explain how `app/src/money.ts` works. Make it accessible to someone unfamiliar with money utilities or financial edge cases.

Context:
- Audience: junior developer, new team member, or someone reviewing the code
- File: `app/src/money.ts` — 4 utility functions
- Key concepts: integer cents (not floats), sign handling, rounding, remainder
- Framework: TypeScript, Node.js

Constraints:
- No code changes; explanation only
- Assume the reader understands basic TS but not finance/money handling
- Explain WHY each design decision (e.g., why integer cents, not floats?)
- Keep it concise but complete

Acceptance criteria:
- Explain the module's overall purpose in 1–2 sentences
- For each function: what it does, why it matters, an example
- Explain the key insight: "why integer cents?" and "what goes wrong with floats?"
- Explain the remainder-cent issue in splitEvenly (and why it's hard to solve)
- Mention any tricky edge cases (negatives, rounding, invalid input)

Output:
- A markdown explanation document (suitable for README or team onboarding)
- Sections: Overview | Function-by-function | Key concepts | Known limitations
- Include concrete examples for each function

Stop rules:
- Stop after explanation is complete
- Do NOT modify code
- Avoid jargon; use analogies if helpful
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a technical educator. Explain how `app/src/money.ts` works to someone unfamiliar with financial utilities. Make it clear, concise, and suitable for a junior developer or team onboarding document.
</instructions>

<context>
File: `app/src/money.ts` — 4 utility functions for integer-cent money handling.
Audience: junior developer, new team member.
Key concepts: integer cents (not floats), sign handling, rounding, remainder.
</context>

<constraints>
- Explanation only; no code changes
- Assume basic TS knowledge but no finance background
- Explain the WHY behind design decisions (e.g., integer cents vs floats)
- Include concrete examples
- Explain known limitations clearly
</constraints>

<output_format>
Markdown explanation document: Overview | Function-by-function (with examples) | Key concepts | Known limitations.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | story-telling, examples |
| XML | Claude Code | structure, "teach a junior" framing |

## Verified

- [ ] Module purpose clearly explained
- [ ] All 4 functions documented with examples
- [ ] Key concepts (integer cents, rounding) explained
- [ ] Known limitations described
