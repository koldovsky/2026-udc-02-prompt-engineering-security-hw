---
name: add-tests
description: Generate missing edge-case tests for a money utility module. Use when smoke tests exist but coverage is thin.
version: 2026-06-29
---

# Add tests (edge cases)

A worked example for Task A of WS2. Point it at `app/src/money.ts` and it
should produce tests that expose the remainder-cent bug in `splitEvenly` and
the missing range guard in `applyDiscount`.

## Baseline (weak)

```
напиши тести для money.ts
```

## Production — markdown (GPT dialect)

```markdown
Role: Senior TS engineer in this repo (Node 22, vitest). You write thorough,
minimal tests — no filler, no mocks unless essential.
Goal: Add missing edge-case tests to app/src/money.test.ts for all four exports in
app/src/money.ts so that existing bugs become visible as failing tests.
Context: Integer-cent money helpers (formatCents, parseAmount, splitEvenly,
applyDiscount). Existing smoke tests in app/src/money.test.ts pass — do not break
them. Known gaps (do NOT skip these):
  - splitEvenly: non-divisible totals (remainder cents lost), n=1, n=0 (expect throws)
  - formatCents: zero, negative amounts, single-digit fractional cents
  - parseAmount: throws on garbage input, handles leading/trailing whitespace,
    rejects more than 2 decimal places
  - applyDiscount: percent outside [0, 100] (negative, >100), 0%, 100%
Constraints:
- Edit only app/src/money.test.ts; do NOT touch money.ts or any other file.
- No new npm dependencies — vitest is already installed.
- No secrets or PII in test data; use synthetic values only.
Acceptance criteria:
- `npx vitest run` exits 0 (all pre-existing tests still pass).
- At least 2 new tests FAIL, exposing real bugs in the current implementation.
- Every new `it()` block has a single clear assertion; group by function in
  `describe` blocks matching the existing file structure.
Output:
- The updated app/src/money.test.ts only (no explanatory prose needed).
Stop rules:
- If money.ts has no exported functions, stop and say so.
- If all edge cases are already covered, list them and stop.
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are a senior TS engineer. Add missing edge-case tests to
app/src/money.test.ts for the four exports in the target file. Do NOT edit
money.ts. Every new test must have a single clear assertion. At least two new
tests must fail against the current implementation, exposing real bugs.
Do not break any pre-existing passing tests.
</instructions>

<context>
Target: app/src/money.ts (integer-cent money helpers — formatCents, parseAmount,
splitEvenly, applyDiscount). Tests live in app/src/money.test.ts (vitest, Node 22).
Known coverage gaps to fill:
- splitEvenly: non-divisible total (remainder cents are silently lost), n=1, n=0 (expect throws)
- formatCents: zero, negative amounts, single-digit fractional part (e.g. 5 cents)
- parseAmount: throws on garbage, trims whitespace, rejects >2 decimal places
- applyDiscount: percent outside [0, 100] (e.g. -10, 110), boundary values 0% and 100%
</context>

<constraints>
- Edit only app/src/money.test.ts; do not modify any other file.
- No new npm dependencies (vitest is already present).
- No secrets or PII in test data — use synthetic values only.
- Group new cases inside the existing describe blocks; do not restructure the file.
</constraints>

<output_format>
Return the updated app/src/money.test.ts file in full. No prose, no diff — just
the complete file content so it can be written directly.
</output_format>

<stop_rules>
- If app/src/money.ts has no exported functions, stop and say so.
- If all edge cases listed above are already covered, list them and stop.
</stop_rules>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / ChatGPT | outcome-first; the "at least 2 failing" rule is readable prose |
| XML | Claude Code / Claude | structured tags keep the gap list and constraints separate; multishot-friendly |

## Status

- [x] Run against `app/src/money.ts` + `app/src/money.test.ts`
- [x] At least 2 new failing tests surface remainder-cent bug and missing percent validation

> TODO: check both boxes once validated end-to-end; leave unchecked until then.
