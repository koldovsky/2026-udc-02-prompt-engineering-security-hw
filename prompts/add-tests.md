---
name: add-tests for app  
description: adding tests for app/src/money.ts to validate the logic 
version: 2
---

# Add tests for integer-cent money helpers app/src/money.ts

## Baseline (weak) — what you started from

```
help with tests for app 
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: You are a professional test engineer extending an existing Vitest suite with edge-case coverage.
Goal: Add missing edge-case tests to `app/src/money.test.ts` so that all boundary conditions are covered and the known bug in `splitEvenly` is exposed by a failing test.
Context: `app/src/money.ts` exports four integer-cent helpers:
  - `formatCents(cents)` — converts int cents to "428.00" string; handles negatives via sign prefix.
  - `parseAmount(input)` — parses "428.00"/"428"/"-12.5" to int cents; throws on invalid input.
  - `splitEvenly(totalCents, n)` — divides total across n people; KNOWN BUG: remainder cents are silently dropped (e.g. splitEvenly(1001, 3) returns [333,333,333], losing 2 cents).
  - `applyDiscount(cents, percent)` — applies 0–100% discount, rounds to nearest cent.
  The existing `money.test.ts` covers only basic happy paths; smoke tests are already present and passing.
Constraints:
- Edit ONLY `app/src/money.test.ts`. Do NOT modify `money.ts` or anything in `materials/`.
- Do NOT fix the bug in `splitEvenly` — write a test that exposes it (it must FAIL, confirming the bug).
- No secrets or PII in test data; use synthetic amounts only.
Acceptance criteria:
- Running `cd app && npx vitest run` shows all new tests; the `splitEvenly` remainder test FAILS, every other new test PASSES.
- New tests must cover:
  - `formatCents`: negative cents (e.g. -5 → "-0.05"), zero (→ "0.00"), single-cent (1 → "0.01").
  - `parseAmount`: negative string ("-12.50" → -1250), single-digit decimal ("5.5" → 550), whitespace-padded ("  10  " → 1000), invalid throws (e.g. "abc", "1.234").
  - `splitEvenly`: non-divisible total exposes bug (splitEvenly(1001, 3) — sum of parts ≠ 1001).
  - `applyDiscount`: 0% leaves amount unchanged, 100% → 0, out-of-range percent (e.g. 150%) documented behavior.
Output:
- The full updated `money.test.ts` file.
- A one-line summary of each new `it()` block added and whether it is expected to pass or fail.
Stop rules:
- Stop and ask if the test runner is not `vitest` or the import path changes.
- Do not run `npm install`, push to git, or read/write any file outside `app/src/money.test.ts`.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a professional test engineer. Add edge-case Vitest tests to app/src/money.test.ts.
Do NOT modify money.ts or any file outside app/src/money.test.ts.
After writing, verify the suite compiles and runs with: cd app && npx vitest run
A test for the splitEvenly remainder bug must FAIL — that is intentional and correct.
</instructions>

<context>
Target file: app/src/money.ts — four integer-cent helpers.

formatCents(cents: number): string
  Converts integer cents to display string with sign. 42800→"428.00", -5→"-0.05", 0→"0.00".

parseAmount(input: string): number
  Parses decimal strings to integer cents. Throws Error on invalid input.
  "428.00"→42800, "-12.50"→-1250, "5.5"→550, "  10  "→1000 (trims whitespace).

splitEvenly(totalCents: number, n: number): number[]
  KNOWN BUG: remainder cents are dropped. splitEvenly(1001, 3) returns [333,333,333]
  (sum=999, loses 2 cents). Write a failing test to document this bug — do NOT fix money.ts.

applyDiscount(cents: number, percent: number): number
  Applies 0–100 percent discount, rounds to nearest cent.
  applyDiscount(10000, 0)→10000, applyDiscount(10000, 100)→0, applyDiscount(10000, 10)→9000.

Existing money.test.ts already has basic happy-path smoke tests for all four functions.
Do not duplicate them — only add the missing edge cases listed above.
</context>

<constraints>
- Edit ONLY app/src/money.test.ts.
- Do NOT touch materials/, .env, money.ts, or any other file.
- No secrets or PII — use synthetic numeric values only.
- Do not run npm install or any git commands.
- Do not add TODOs or placeholder comments; every it() must have a real assertion.
</constraints>

<output_format>
1. Full updated app/src/money.test.ts (replace the file content).
2. Bullet list: each new it() block, its expected result (PASS or FAIL), and one-line reason.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex / ChatGPT | outcome-first, shorter |
| XML | Claude Code / Claude | structure + multishot |

## Verified

- [x] Run against `app/src/money.test.ts`
- [x] Agent stayed in scope; 19/19 vitest pass (includes guards added by `add-input-guards` prompt)
