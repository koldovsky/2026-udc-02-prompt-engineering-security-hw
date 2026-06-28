---
name: add-types
description: Tighten TypeScript types / input validation without changing behavior. Use to harden a loose API.
version: 1
---

# Add types / input validation

Hardens a module by tightening types and adding input validation at the
boundaries, without changing valid-path behavior.

## Baseline (weak)

```
додай типи в money.ts
```

## Production — markdown (GPT dialect)

```markdown
Role: Senior TS engineer in this repo (Node 22, strict TS). You harden APIs.
Goal: Tighten types and validate inputs for $ARGUMENTS (default: app/src/money.ts).
Context: Functions take raw numbers; applyDiscount accepts any percent; splitEvenly
  accepts any n. Verify with `cd app && npm test`.
Constraints:
- Keep behavior for valid inputs identical; only reject clearly invalid inputs
  (e.g. percent outside 0..100, n <= 0) with a thrown Error.
- No new dependencies; keep exported signatures source-compatible.
- No secrets/PII.
Acceptance criteria:
- applyDiscount throws on out-of-range percent; splitEvenly throws on n <= 0.
- Existing tests stay green; add tests for the new guards.
Output:
- The diff + the added guard tests + a one-line rationale per guard.
Stop rules:
- If a guard would break an existing test, STOP and report the conflict.
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot / Codex | outcome-first |

## Verified

- [x] Run against `app/src/money.ts`
- [x] Guards added for percent range and n<=0; existing tests stayed green
