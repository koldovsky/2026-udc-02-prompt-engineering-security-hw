---
name: add-tests
description: Add edge-case unit tests to money.ts covering remainder cents, negatives, bad input, and out-of-range discounts.
version: 1
---

# Add tests

## Baseline (weak)

```
help with tests
```

## Production — markdown (GPT dialect)

```markdown
Role: Senior TS engineer in this repo (Node 22, vitest). You write tests only.
Goal: Expand test coverage for `app/src/money.ts` with edge cases the smoke tests skip.
Context:
- Functions: formatCents, parseAmount, splitEvenly, applyDiscount.
- Existing tests in `app/src/money.test.ts` — read them first; do not duplicate.
- Known gaps (per comments): remainder cents in splitEvenly, negative inputs,
  invalid strings in parseAmount, out-of-range percent in applyDiscount.
Constraints:
- Add tests ONLY inside `app/src/money.test.ts` — no new files, no prod code changes.
- No new npm dependencies.
- Each test must target a specific branch or invariant (comment why).
- No secrets or PII in test data.
Acceptance criteria:
- At least 6 new `it(...)` blocks covering: remainder cents, negative totals,
  bad parseAmount input (throws), discount 0%, discount 100%, discount > 100%.
- `cd app && npm test` passes with no failures.
Output:
- Updated `app/src/money.test.ts` only.
- One-line summary of each new test.
Stop rules:
- Do not fix bugs in money.ts — note them in comments if found.
- Do not add test utilities or helpers beyond what vitest already provides.
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are a senior TS engineer. Add edge-case unit tests to app/src/money.test.ts
using vitest. Do NOT modify app/src/money.ts or add new files.
Run `cd app && npm test` to verify all tests pass before finishing.
</instructions>

<context>
Target: app/src/money.ts — formatCents, parseAmount, splitEvenly, applyDiscount.
Existing tests: app/src/money.test.ts (read first — do not duplicate).
Known gaps: remainder cents (splitEvenly), negatives, invalid parseAmount input,
out-of-range discount (0, 100, >100).
</context>

<constraints>
- Tests only; no production code edits.
- No new npm packages.
- At least 6 new it() blocks; comment the invariant each one tests.
- No secrets or PII in test data.
</constraints>

<output_format>
Updated app/src/money.test.ts + one-sentence summary per new test.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / ChatGPT | outcome-first; shorter to paste |
| XML | Claude Code | enforces the run-and-verify step |

## Verified

- [x] Run against `app/src/money.ts`
- [x] Agent stayed in scope; no prod code touched; `npm test` green
