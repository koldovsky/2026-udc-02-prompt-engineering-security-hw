---
name: add-validation
description: Add input validation guards to money.ts functions without changing their public signatures.
version: 1
---

# Add input validation

## Baseline (weak)

```
make money.ts safer
```

## Production — markdown (GPT dialect)

```markdown
Role: Defensive TS engineer, working in this repo (Node 22, vitest).
Goal: Add input validation to `applyDiscount` and `splitEvenly` in `app/src/money.ts`
      so they throw descriptive errors on bad input instead of returning NaN/Infinity.
Context:
- `applyDiscount(cents, percent)`: percent must be 0–100; currently accepts any number.
- `splitEvenly(totalCents, n)`: n must be ≥1 integer; currently accepts 0 or negative.
- `parseAmount` already throws on invalid string — use it as a style reference.
Constraints:
- Edit only `app/src/money.ts`; keep all existing exported signatures.
- Use `RangeError` for out-of-range numeric arguments.
- Use `TypeError` for wrong type (e.g. non-integer n).
- Do not add a runtime type-check library.
- No secrets or PII in output.
Acceptance criteria:
- `applyDiscount(100, -1)` throws RangeError.
- `applyDiscount(100, 101)` throws RangeError.
- `splitEvenly(100, 0)` throws RangeError.
- `splitEvenly(100, -1)` throws RangeError.
- `splitEvenly(100, 1.5)` throws TypeError.
- `cd app && npm test` passes (add tests for the above if needed).
Output:
- Updated `app/src/money.ts`.
- Any new tests added to `app/src/money.test.ts`.
Stop rules:
- Do not validate `cents` itself (negative cents is valid for refunds).
- Do not change `formatCents` or `parseAmount`.
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are a defensive TS engineer. Add input guards to applyDiscount and splitEvenly
in app/src/money.ts so they throw on bad input. Do not change formatCents or
parseAmount. Run `cd app && npm test` (adding tests if needed) before finishing.
</instructions>

<context>
Target: app/src/money.ts — applyDiscount(cents, percent), splitEvenly(totalCents, n).
applyDiscount: percent must be 0–100 → throw RangeError.
splitEvenly: n must be ≥1 integer → throw RangeError (n≤0) or TypeError (non-integer).
Reference style: parseAmount already throws on invalid string.
</context>

<constraints>
- Edit only app/src/money.ts; keep all existing exported signatures.
- RangeError for numeric out-of-range; TypeError for wrong type.
- Do not add a runtime type-check library.
- Do not validate cents (negative cents is valid for refunds).
- No secrets or PII in output.
</constraints>

<output_format>
Updated app/src/money.ts + any new tests added to app/src/money.test.ts.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | concrete throw examples pin expected behavior |
| XML | Claude Code | structured constraints prevent over-validation |

## Verified

- [x] Run against `app/src/money.ts`
- [x] Validation guards in place; `npm test` green
