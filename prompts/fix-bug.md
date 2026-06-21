---
name: fix-bug
description: Drive a guarded fix for a known bug — test-first, minimal diff, behavior pinned by a new regression test. Use for the planted money.ts bugs.
version: 1
---

# Fix a known bug (test-first)

Fix prompt for the cookbook. Drives the planted `splitEvenly` remainder-cent bug
fix in `app/src/money.ts` using red→green discipline.

## Baseline (weak)

```
полагодь баг у splitEvenly
```

## Production — markdown (GPT dialect)

```markdown
Role: Senior TS engineer in this repo (Node 22, vitest), test-first discipline.
Goal: Fix the remainder-cent bug in splitEvenly within $ARGUMENTS so the sum of
shares always equals the input total.
Context: splitEvenly(totalCents, n) currently floors each share and drops the
remainder, so shares don't sum back to totalCents.
Constraints:
- Write a FAILING test first (red), then the minimal fix (green).
- Keep the signature and return type. Distribute the remainder deterministically
  (first `r` shares get +1 cent). Handle negative totals consistently.
- No new dependencies. No unrelated edits.
Acceptance criteria:
- New test asserts sum(splitEvenly(t, n)) === t for divisible and non-divisible
  totals, including negatives. `cd app && npm test` green.
Output:
- The failing test, the patch, and confirmation tests pass.
Stop rules:
- If n <= 0, define and document the behavior (throw) instead of guessing.
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | red→green framing prevents "fix without proof" |

## Verified

- [x] Run against `app/src/money.ts`
- [x] Remainder distributed; shares sum to total; `npm test` green

