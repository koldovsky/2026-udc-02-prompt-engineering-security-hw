---
name: add-input-guards
description: Add throw-on-invalid guards to splitEvenly (n > 0) and applyDiscount (percent ∈ [0, 100]).
version: 1
---

# Add input validation guards

## Baseline (weak)

```
add some validation to money helpers
```

## Production — markdown (GPT dialect)

```markdown
Role: You are a TypeScript engineer hardening a financial utility module.
Goal: Add input validation to `splitEvenly` and `applyDiscount` in $ARGUMENTS so invalid inputs throw a descriptive Error instead of silently returning nonsense.
Context: Integer-cent money helpers. Current silent failures:
  - `splitEvenly(100, 0)` — division by zero; returns empty array.
  - `splitEvenly(100, -2)` — n is negative; returns nonsense.
  - `applyDiscount(10000, 150)` — percent > 100; returns negative balance (financial bug).
Constraints:
- Add guards ONLY inside `splitEvenly` and `applyDiscount`; do NOT touch other functions.
- Throw `new Error(...)` with a descriptive message; no assertions or external libraries.
- Also add tests for the new throw paths to `app/src/money.test.ts`.
Acceptance criteria:
- `splitEvenly(100, 0)` throws (message mentions "positive").
- `applyDiscount(10000, 150)` throws (message mentions "0" and "100").
- `npx vitest run` passes (new guard tests pass, no regressions).
Output:
- Updated guard sections of `money.ts` (not full file).
- New `it()` blocks for `money.test.ts`.
- vitest run summary.
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are hardening a financial TypeScript module with input validation guards.
Add throw-on-invalid guards to splitEvenly and applyDiscount.
Add vitest tests for the new throw paths in money.test.ts.
Run cd app && npx vitest run to confirm all tests pass.
</instructions>

<context>
Target: app/src/money.ts — only splitEvenly and applyDiscount.

Current silent failures:
- splitEvenly(totalCents, 0)  → empty array (division by zero)
- splitEvenly(totalCents, -1) → nonsense result
- applyDiscount(10000, 150)   → -5000 (negative balance)

Required post-guard behavior:
- splitEvenly:    throw Error if n ≤ 0 or !Number.isInteger(n)
- applyDiscount:  throw Error if percent < 0 or percent > 100
</context>

<constraints>
- Edit money.ts: add guards at the top of splitEvenly and applyDiscount only.
- Edit money.test.ts: add it() blocks for each new throw path.
- Do NOT change formatCents, parseAmount, or any unrelated code.
- Use native Error; no external libraries.
- All tests (old + new) must pass after the change.
</constraints>

<output_format>
1. Guard code for splitEvenly and applyDiscount (function bodies only).
2. New it() blocks for money.test.ts.
3. vitest run output.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | GPT / Copilot | inline "current silent failures" list is easy for GPT to parse |
| XML | Claude Code | separate context/constraints keep target scope narrow |

## Verified

- [x] Run against `app/src/money.ts` and `app/src/money.test.ts`
- [x] Guards added to `splitEvenly` (n ≤ 0 → throw) and `applyDiscount` (percent outside 0–100 → throw); 4 new guard tests added to `money.test.ts`; `vitest run` 19/19 pass
