---
name: add-validation
description: Add input validation to a public function with clear errors and tests, without breaking existing callers. Use to harden boundaries.
version: 1
---

# Add input validation

Hardening prompt for the cookbook. Adds range/precondition checks to
`applyDiscount` in `app/src/money.ts`.

## Baseline (weak)

```
додай перевірки у applyDiscount
```

## Production — markdown (GPT dialect)

```markdown
Role: Senior TS engineer in this repo (Node 22, vitest).
Goal: Validate inputs of applyDiscount in $ARGUMENTS so out-of-range percent is
rejected with a clear error.
Context: applyDiscount(cents, percent) currently trusts percent ∈ [0,100] and
silently produces wrong results outside it.
Constraints:
- Keep the signature. Throw a descriptive Error for percent < 0 or > 100
  (and non-finite). Do not change valid-range behavior.
- No new dependencies. Add tests for the new guards and the happy path.
Acceptance criteria:
- Valid inputs unchanged; invalid percent throws with a useful message.
- `cd app && npm test` green, including new boundary tests (0, 100, -1, 101, NaN).
Output:
- The patched function + new tests + one-line rationale.
Stop rules:
- If changing behavior would break an existing caller, STOP and list the callers.
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | explicit boundary list makes acceptance testable |

## Verified

- [x] Run against `app/src/money.ts`
- [x] Out-of-range percent throws; boundary tests pass; `npm test` green

