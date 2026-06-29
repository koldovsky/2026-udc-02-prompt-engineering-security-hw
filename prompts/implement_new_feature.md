---
name: implement-new-feature
description: Add a new exported function to the money utility module with matching tests. Use when extending app/src/money.ts with a new operation.
version: 1
---

# Implement new feature

A worked example for extending `app/src/money.ts` with a new function. The
target feature is `addTax(cents, taxPercent)` — applies a tax rate to an
integer-cent amount and returns the total including tax, rounded to the nearest
cent.

## Baseline (weak)

```
додай функцію для розрахунку податку в money.ts
```

## Production — markdown (GPT dialect)

```markdown
Role: Senior TS engineer in this repo (Node 22, vitest). You write minimal,
idiomatic TypeScript — no unnecessary abstractions, no new dependencies.
Goal: Add and export a new function `addTax(cents: number, taxPercent: number): number`
to app/src/money.ts, and add tests for it in app/src/money.test.ts.
Context: Integer-cent money helpers live in app/src/money.ts. Existing exports:
  - formatCents(cents) — formats to human string
  - parseAmount(input) — parses string to cents
  - splitEvenly(totalCents, n) — splits total across n people
  - applyDiscount(cents, percent) — applies a 0–100% discount
`addTax` should mirror `applyDiscount` in style: validate the percent range,
compute Math.round(cents * taxPercent / 100), and return cents + tax.
Constraints:
- Edit only app/src/money.ts and app/src/money.test.ts; do NOT touch any other file.
- No new npm dependencies — vitest is already installed.
- Keep the existing public API unchanged (no renames, no signature changes).
- No secrets or PII in code or test data; use synthetic values only.
Acceptance criteria:
- `addTax` is exported from app/src/money.ts.
- `npx vitest run` exits 0 with all pre-existing tests still passing.
- New tests cover: normal rate (e.g. 10%), 0% tax, rounding edge case,
  negative percent throws, percent > 100 throws.
Output:
- The updated app/src/money.ts and app/src/money.test.ts (no explanatory prose).
Stop rules:
- If a function named `addTax` already exists, report it and stop.
- If the percent range guard is already present in a sibling function, reuse that pattern.
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are a senior TS engineer. Add and export a new function
`addTax(cents: number, taxPercent: number): number` to app/src/money.ts, and
add corresponding tests in app/src/money.test.ts. Mirror the style of the
existing `applyDiscount` function. All pre-existing tests must continue to pass.
</instructions>

<context>
Target: app/src/money.ts (integer-cent money helpers — formatCents, parseAmount,
splitEvenly, applyDiscount). Tests live in app/src/money.test.ts (vitest, Node 22).
New function spec:
- Signature: addTax(cents: number, taxPercent: number): number
- Throws if taxPercent is outside [0, 100].
- Returns cents + Math.round(cents * taxPercent / 100).
- Example: addTax(10000, 20) → 12000 (120.00); addTax(333, 10) → 366 (rounds 33.3 → 33).
</context>

<constraints>
- Edit only app/src/money.ts and app/src/money.test.ts; do not modify any other file.
- No new npm dependencies (vitest is already present).
- No secrets or PII in code or test data — use synthetic values only.
- Do not change existing exported function signatures or behaviour.
- Add tests inside a new `describe('addTax', ...)` block at the end of the test file.
</constraints>

<output_format>
Return both updated files in full — first app/src/money.ts, then
app/src/money.test.ts. No prose, no diff — complete file contents only.
</output_format>

<stop_rules>
- If `addTax` already exists in app/src/money.ts, report it and stop.
- If vitest is not present in package.json, report it and stop.
</stop_rules>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / ChatGPT | outcome-first; acceptance criteria as prose is natural for GPT models |
| XML | Claude Code / Claude | structured tags keep spec, constraints, and output format cleanly separated |

## Verified

- [x] Run against `app/src/money.ts` + `app/src/money.test.ts`
- [x] Agent stayed in scope; `addTax` exported and all tests pass
