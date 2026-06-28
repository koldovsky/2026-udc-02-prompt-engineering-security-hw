---
name: add-tests
description: Add comprehensive edge-case tests to money.ts; cover remainder handling, negatives, validation, and boundaries
version: 1
---

# Add comprehensive tests to money.ts

## Baseline (weak)

```text
допоможи з тестами для app
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior TS developer skilled in Vitest, financial math edge cases, and money handling (integer cents, rounding rules).

Goal: Add comprehensive edge-case tests to `app/src/money.ts` that catch off-by-one errors, boundary conditions, and input validation mistakes. Current tests are minimal smoke tests; you must add the gaps they skip.

Context: 
- File: `app/src/money.ts` — 4 functions: formatCents, parseAmount, splitEvenly, applyDiscount
- Current tests: `app/src/money.test.ts` — minimal smoke tests only
- Known gaps: remainder cents in splitEvenly, negative amounts, invalid input (bad decimals, out-of-range discount), boundary cases (0%, 100% discount)
- Framework: Vitest (run with `npm test`)

Constraints:
- Scope: only edit `app/src/money.test.ts` — do NOT modify production code
- No new dependencies: use only vitest/expect already available
- Keep API: don't suggest function signature changes
- Money rules: amounts in integer cents; negative amounts must work; rounding to nearest cent; remainder handling matters

Acceptance criteria:
- All 4 functions have edge-case tests:
  - formatCents: negatives, zero, large numbers
  - parseAmount: invalid input (garbage, extra decimals), negatives, edge decimals like "10" vs "10.0"
  - splitEvenly: remainder cents (9100 / 3 = three shares of 3033, but sum is 9099 — what about the penny?), negatives
  - applyDiscount: 0%, 100%, boundaries, negative amounts, rounding edge cases
- `npm test` passes (green)
- No production code changes, only test additions

Output:
- Complete modified `app/src/money.test.ts` file (paste full file)
- One-line summary of what gaps you filled (e.g., "added 8 edge cases: remainder handling, negative amounts, invalid input, discount boundaries")

Stop rules:
- Stop after tests pass; do NOT refactor production code
- Do NOT run `npm install` or change package.json
- If you hit unexpected errors or need to modify production code, STOP and ask — don't fix it yourself
- Do NOT add snapshots, factories, or helper functions — keep tests explicit and simple
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a senior TS developer skilled in Vitest and financial edge cases. Add comprehensive edge-case tests to `app/src/money.ts` that catch off-by-one errors, boundary conditions, and input validation mistakes. Only edit tests — do not touch production code. Stop and ask if you need to modify production code or encounter unexpected errors.
</instructions>

<context>
File: `app/src/money.ts` — 4 functions:
- formatCents(cents): format integer cents as "999.99"
- parseAmount(input): parse "999.99" to integer cents; throws on garbage
- splitEvenly(totalCents, n): split total across n people (known gap: remainder cents)
- applyDiscount(cents, percent): apply 0–100% discount, round to nearest cent

Current tests in `app/src/money.test.ts` are minimal smoke tests. Gaps to cover:
- formatCents: negatives, zero, large numbers
- parseAmount: invalid input, negatives, edge decimals
- splitEvenly: remainder cents (9100 / 3), negatives
- applyDiscount: 0%, 100%, boundaries, rounding edge cases
</context>

<constraints>
- Scope: only edit `app/src/money.test.ts` — do NOT modify production code
- No new deps: use only vitest/expect
- Keep API: no signature changes
- Money rules: integer cents; negatives must work; rounding matters; remainder handling matters
- Simple, explicit tests only — no snapshots, factories, or helpers
</constraints>

<output_format>
Complete modified `app/src/money.test.ts` file (paste full) + one-line gap summary (e.g., "added remainder, negatives, validation, boundaries").
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / ChatGPT | outcome-focused, shorter context |
| XML | Claude Code / Claude | structured constraints, edge cases enumerated, clear "ask before changing prod code" rule |

## Verified

- [ ] Ran `npm test` in `app/`
- [ ] All edge cases covered (remainder, negatives, validation, boundaries)
- [ ] No production code modified
- [ ] Agent stayed in scope
