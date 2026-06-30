---
name: explain-code
description: Explain the behavior and invariants of money.ts to a new team member. Use for onboarding or code review prep.
version: 1
---

# Explain code

## Baseline (weak)

```
explain what money.ts does
```

## Production — markdown (GPT dialect)

```markdown
Role: Senior TS engineer and mentor, working in this repo.
Goal: Explain `app/src/money.ts` to a new team member who knows JavaScript but not
      the integer-cent pattern. Cover what each function does, why cents not floats,
      and what the known limitation is.
Context:
- File: `app/src/money.ts` — four exported functions.
- Audience: junior dev familiar with JS, unfamiliar with fixed-point arithmetic.
Constraints:
- Read the file before writing the explanation.
- Use concrete examples (e.g. 42800 cents = $428.00).
- Highlight the known gap in `splitEvenly` — do not hide it.
- Max 400 words total.
- No secrets or PII.
Acceptance criteria:
- Each of the 4 functions explained with one example.
- The integer-cent invariant clearly stated.
- The remainder-cents limitation named and its impact described.
Output:
- Plain-language explanation (markdown).
- A "gotcha" section listing things that will surprise a new dev.
Stop rules:
- Do not propose fixes — explain only.
- Do not reproduce the full source code; quote only critical lines.
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are a senior TS engineer and mentor. Explain app/src/money.ts to a new team
member who knows JavaScript but not fixed-point arithmetic. Read the file first.
Use concrete examples. Do not propose fixes — explain only. Stay under 400 words.
</instructions>

<context>
Target: app/src/money.ts — formatCents, parseAmount, splitEvenly, applyDiscount.
Audience: junior dev familiar with JS; unfamiliar with integer-cent pattern.
Known limitation: splitEvenly silently drops remainder cents.
</context>

<constraints>
- One example per function (correct units: cents, not dollars).
- State the integer-cent invariant clearly.
- Name the remainder-cents limitation and its real-world impact.
- No secrets or PII; max 400 words total.
</constraints>

<output_format>
Plain-language markdown explanation + a "Gotchas" section (≥2 items).
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / ChatGPT | prose output fits markdown dialect |
| XML | Claude Code | constraint block enforces word limit + gotcha section |

## Verified

- [x] Run against `app/src/money.ts`
- [x] Explanation was clear; remainder-cents gap explicitly mentioned
