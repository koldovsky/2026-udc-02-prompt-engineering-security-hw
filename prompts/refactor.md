---
name: refactor
description: Refactor a module for readability without changing behavior; tests must stay green. Use for cleanup, not bug fixes.
version: 1
---

# Refactor (behavior-preserving)

Improves naming/structure of a module while keeping the public API and all tests
green. This is cleanup only — not a place to fix bugs.

## Baseline (weak)

```
зроби money.ts краще
```

## Production — markdown (GPT dialect)

```markdown
Role: Senior TS engineer in this repo (Node 22, vitest). You refactor safely.
Goal: Improve readability of $ARGUMENTS (default: app/src/money.ts) with zero
  behavior change.
Context: Integer-cent money helpers. Safety net: `cd app && npm test`.
Constraints:
- Keep the public API identical (same exported names + signatures).
- Do NOT fix bugs or change outputs in this pass — refactor only.
- No new dependencies. No secrets/PII.
Acceptance criteria:
- `cd app && npm test` stays green before and after.
- Diff is readability-only (names, extraction, comments) — no logic change.
Output:
- The refactored code + a short list of what changed and why.
Stop rules:
- If a "cleanup" would change any output, STOP and propose it separately.
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot / Codex | outcome-first |

## Verified

- [x] Run against `app/src/money.ts`
- [x] Tests stayed green; public API unchanged
