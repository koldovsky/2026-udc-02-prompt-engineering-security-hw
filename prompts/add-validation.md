---
name: add-validation
description: Add input validation with descriptive errors to splitEvenly (n > 0) and applyDiscount (0 ≤ percent ≤ 100) in app/src/money.ts.
version: 1
---

# Add Input Validation to money.ts

## Baseline (weak) — what you started from

```text
add validation to money.ts
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior TypeScript engineer hardening a utility module in `app/src/money.ts` (Node, ESM, strict TS).

Goal: Add guard clauses to `splitEvenly` and `applyDiscount` so they throw descriptive errors on invalid input instead of silently producing wrong results.

Context:
- `splitEvenly(totalCents, n)`: `n` must be a positive integer. Currently `n = 0` causes division by zero; `n < 0` or non-integer `n` produces nonsense.
- `applyDiscount(cents, percent)`: `percent` must be in 0–100. Currently `percent = 110` returns a negative amount; `percent = -10` returns more than the original.
- Error messages must include the invalid value, e.g. `"n must be a positive integer, got 0"`.
- `formatCents` and `parseAmount` do not need changes.

Constraints:
- Modify only `app/src/money.ts` and `app/src/money.test.ts`; do not touch any other file.
- Do not change function signatures.
- Do not use external validation libraries.
- Throw `Error` (not custom classes) with a message that includes the invalid value.
- No secrets or PII.

Acceptance criteria:
- `splitEvenly(100, 0)` throws `Error` with message containing "0".
- `splitEvenly(100, -1)` throws `Error` with message containing "-1".
- `splitEvenly(100, 1.5)` throws `Error` with message containing "1.5".
- `applyDiscount(100, 110)` throws `Error` with message containing "110".
- `applyDiscount(100, -5)` throws `Error` with message containing "-5".
- All previously passing tests still pass: `cd app && npx vitest run` exits 0.
- New tests for the throws are added to `app/src/money.test.ts`.

Output:
- Updated `app/src/money.ts` (guard clauses only, no logic changes elsewhere).
- Updated `app/src/money.test.ts` (new invalid-input tests for the two functions).

Stop rules:
- Do not add validation to `formatCents` or `parseAmount` — they already handle their edge cases.
- Do not change the function signatures.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a senior TypeScript engineer. Add guard clauses to splitEvenly and
applyDiscount in app/src/money.ts. Throw Error with a message that includes the
invalid value. Also add tests for the new throws in app/src/money.test.ts.
Before finishing, verify: (1) splitEvenly(100,0), splitEvenly(100,-1), and splitEvenly(100,1.5) throw, (2) applyDiscount(100,110) and applyDiscount(100,-5) throw, (3) npx vitest run exits 0.
</instructions>

<context>
File: app/src/money.ts
splitEvenly(totalCents, n): n must be a positive integer.
  - n = 0: division by zero, currently returns [].
  - n < 0 or non-integer: nonsense output.
applyDiscount(cents, percent): percent must be 0–100.
  - percent > 100: returns negative amount.
  - percent < 0: returns amount above original.
Error message format: include the invalid value, e.g. "n must be a positive integer, got 0".
</context>

<constraints>
- Modify only app/src/money.ts and app/src/money.test.ts; do not touch other files.
- Throw Error (not custom classes); include the invalid value in the message.
- Do not change function signatures or other logic.
- No external validation libraries; no new npm packages.
- No secrets or PII.
</constraints>

<output_format>
1. Updated guard clauses in app/src/money.ts.
2. New test cases in app/src/money.test.ts for each new throw.
3. Confirmation: npx vitest run result.
</output_format>
```

## Tool-fit notes

| Variant  | Best for                        | Why                                        |
|----------|---------------------------------|--------------------------------------------|
| markdown | Copilot (GPT) / Codex / ChatGPT | outcome-first, concise role + goal         |
| XML      | Claude Code / Claude            | explicit structure, multishot, tag scoping |

## Verified

- [x] splitEvenly(100, 0) throws with message containing "0"
- [x] splitEvenly(100, -1) throws with message containing "-1"
- [x] splitEvenly(100, 1.5) throws with message containing "1.5"
- [x] applyDiscount(100, 110) throws with message containing "110"
- [x] applyDiscount(100, -5) throws with message containing "-5"
- [x] Ran `cd app && npx vitest run` — all tests passed