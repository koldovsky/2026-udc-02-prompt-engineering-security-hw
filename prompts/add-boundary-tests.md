---
name: add-boundary-tests
description: Add boundary/invariant tests (n=1, large values, sign symmetry) once the core edge cases already have coverage. Use as a second pass after add-tests.md.
version: 1
---

# Add boundary tests

Second "tests" cookbook entry — a follow-up pass once `add-tests.md` has
already covered the obvious edge cases. Focused on boundary values and one
cross-input invariant, not new features.

## Baseline (weak)

```
додай ще тестів на money.ts
```

## Production — markdown (GPT dialect)

```markdown
Role: TS engineer in this repo (Node 22, vitest).
Goal: Add boundary-value tests for app/src/money.ts that the edge-case pass
in prompts/add-tests.md didn't cover.
Context: money.test.ts already has edge-case tests (remainder cents,
negatives, invalid input, out-of-range percent). This pass targets boundaries:
n = 1, very large totals near Number.MAX_SAFE_INTEGER, and an invariant check
(sum of splitEvenly shares always equals the input total).
Constraints:
- Test-only change: app/src/money.test.ts. Do not modify money.ts unless a
  boundary test finds a genuine new bug (then fix minimally, same as add-tests.md).
- No new test dependencies (no fast-check/property-testing libs) — hand-write
  a small fixed table of cases instead of a generator.
Acceptance criteria:
- At least one test for n = 1.
- At least one test asserting splitEvenly shares sum to the total, across a
  small table of (totalCents, n) pairs.
- `cd app && npm test` passes.
Output:
- The diff to money.test.ts.
Stop rules:
- Don't add a property-testing framework just for this; a fixed table of
  cases is enough and keeps the "no new deps" constraint.
```

## Production — XML (Claude dialect)

```xml
<instructions>
Add boundary-value tests to app/src/money.test.ts, covering n=1, large totals,
and a sum-equals-total invariant across a small table of cases. Do not add new
test dependencies.
</instructions>

<context>
money.test.ts already covers the edge cases from prompts/add-tests.md
(remainder cents, negatives, bad input, out-of-range percent).
</context>

<constraints>
- Test-only change unless a boundary case finds a genuine new bug.
- No new dependencies — hand-write a table, don't add property-testing libs.
</constraints>

<acceptance_criteria>
- n=1 covered; sum-equals-total invariant covered across >=3 (totalCents, n) pairs.
- npm test passes.
</acceptance_criteria>

<output_format>Diff to money.test.ts only.</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | short, table-driven ask |
| XML | Claude Code | constraint block stops it reaching for a new dependency |

## Verified

- [x] Run against `app/src/money.test.ts`
- [x] Confirmed `n = 1` already covered (added in `add-tests.md`'s pass);
      added a small table-driven test asserting
      `shares.reduce((a,b)=>a+b,0) === totalCents` for
      `[(9001,3), (-9001,3), (100,7), (1,1)]`.
- [x] No new bug found at these boundaries — implementation from
      `add-tests.md` already holds.
- [x] `cd app && npm test` — all passing, no new dependency added.
