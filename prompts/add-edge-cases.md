---
name: add-edge-cases
description: Find and document edge cases for money.ts then add tests for the most dangerous ones.
version: 1
---

# Add edge-case tests

## Baseline (weak)

```
find edge cases in money.ts
```

## Production — markdown (GPT dialect)

```markdown
Role: QA engineer and TS developer, working in this repo (Node 22, vitest).
Goal: Enumerate edge cases across all four money.ts functions, then add tests for
      the ones most likely to cause production bugs (priority: data-loss, silent
      wrong result, crash).
Context:
- Functions: formatCents, parseAmount, splitEvenly, applyDiscount.
- Existing tests cover only happy paths — see `app/src/money.test.ts`.
- Consider: zero, negative, very large numbers, non-integer inputs, NaN, Infinity.
Constraints:
- Write tests in `app/src/money.test.ts` only.
- Do not edit production code; note bugs in test comments instead.
- At least 8 new `it(...)` blocks.
- Each test must have a comment explaining the edge case and expected invariant.
- No secrets or PII in test data.
Acceptance criteria:
- Tests cover: zero cents, INT_MAX-scale, negative amounts, NaN input, Infinity.
- `cd app && npm test` passes (skip expected-to-fail cases with `it.todo`).
Output:
- Updated `app/src/money.test.ts`.
- Markdown list of top 3 risks found.
Stop rules:
- Use `it.todo` for failing cases if fixing requires prod code change.
- Do not add a test runner or change vitest config.
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are a QA engineer. Add edge-case unit tests to app/src/money.test.ts using
vitest. Do not edit production code — note bugs in test comments instead.
Verify `cd app && npm test` passes (use it.todo for cases that expose unfixed bugs).
</instructions>

<context>
Target: app/src/money.ts — formatCents, parseAmount, splitEvenly, applyDiscount.
Existing tests: app/src/money.test.ts (happy paths only — do not duplicate).
Edge-case candidates: zero, negative, NaN, Infinity, very large numbers, non-integer n.
</context>

<constraints>
- Tests in app/src/money.test.ts only; no production code changes; no new packages.
- At least 8 new it() blocks; each must have a comment stating the invariant.
- Use it.todo for cases that require a prod fix.
- No secrets or PII in test data.
</constraints>

<output_format>
Updated app/src/money.test.ts + markdown list of top 3 risks found.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | QA-style enumeration fits prose format |
| XML | Claude Code | constraint list enforces minimum count and comment style |

## Verified

- [x] Run against `app/src/money.ts`
- [x] 8+ edge-case tests added; `npm test` green
