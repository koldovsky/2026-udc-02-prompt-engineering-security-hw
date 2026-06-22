---
name: add-tests
description: Add focused vitest cases for money.ts edge cases without changing production code.
version: 1
---

# Add tests (edge cases)

## Baseline (weak)

```
допоможи з тестами для app
```

## Production — markdown (OpenAI / GPT dialect)

```markdown
Role: QA-minded TS developer in this repo (Node 22, vitest, ESM).
Goal: Add missing edge-case tests for `app/src/money.ts` so bugs surface before merge.
Context:
- Target: `app/src/money.ts` — integer-cent helpers.
- Existing tests: `app/src/money.test.ts` (smoke only).
Constraints:
- Edit ONLY `app/src/money.test.ts` — do NOT change `money.ts` or add dependencies.
- No secrets/PII in test data; use synthetic amounts only.
Acceptance criteria:
- New tests cover: remainder cents in `splitEvenly`, invalid `parseAmount`, out-of-range `percent` in `applyDiscount`.
- `cd app && npm test` passes (expected failures on planted bugs — note which).
Output:
- List new test cases and which edge case each covers.
Stop rules:
- If asked to fix production code, stop and say tests-only pass first.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
Add vitest edge-case tests for app/src/money.ts. Edit only app/src/money.test.ts.
Do not change money.ts or add deps. Run cd app && npm test before finishing.
</instructions>

<context>
Integer-cent money helpers. Existing smoke tests skip remainder cents and bad input.
</context>

<constraints>
- Tests file only; no production edits.
- Synthetic amounts only; no secrets/PII.
</constraints>

<output_format>
New test list + npm test result.
</output_format>
```

## Verified

- [x] Run against `app/src/money.ts`
- [x] Agent stayed in scope; tests run green
