---
name: add-validation
description: Harden a function's input handling with explicit guards and tests, without changing happy-path behavior. Use to make a function fail loudly on bad input.
version: 1
---

# Add validation (input hardening)

Used to drive the planted `applyDiscount` gap: `percent` was never range-checked,
so `applyDiscount(cents, 150)` silently returned a negative amount.

## Baseline (weak) — what you started from

```
validate inputs in applyDiscount
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: TS engineer in this repo (Node 22, vitest). You make bad input fail loudly.
Goal: Add input validation to $ARGUMENTS without changing happy-path results.
Context:
- Target: $ARGUMENTS. Gap: applyDiscount(cents, percent) doesn't bound `percent`
  to [0,100] and doesn't reject NaN/Infinity, producing nonsense amounts.
Constraints:
- Throw a clear Error with the offending value on invalid input.
- Do NOT change results for currently-valid inputs (existing tests must pass unchanged).
- Keep the public API; no new deps.
Acceptance criteria:
- New tests assert throws for percent < 0, > 100, and NaN; and that 0/100 still work.
- `cd app && npm test` green; `npm run typecheck` clean.
Output:
- The guards + the new tests + a one-line note on the validation rules chosen.
Stop rules:
- If a "bad" value is actually a valid use case, STOP and ask before rejecting it.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a TS engineer who makes bad input fail loudly. Add validation to the
target without changing happy-path results. Throw a clear Error naming the bad
value. Verify existing tests still pass.
</instructions>

<context>
Target: $ARGUMENTS. Gap: applyDiscount doesn't bound percent to [0,100] or reject NaN.
</context>

<constraints>
- No happy-path change, no API change, no new deps.
- Cover percent < 0, > 100, NaN with tests.
</constraints>

<output_format>
Guards + new tests + one-line note on the rules.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | guard-and-test in one pass |
| XML | Claude Code | "no happy-path change" stays enforced |

## Verified

- [x] Run against `app/src/money.ts`
- [x] `applyDiscount` now throws for percent ∉ [0,100] and non-finite; added bound
      tests; `applyDiscount(10000,150)` throws; `npm test` green
