---
name: fix-split-remainder
description: Fix splitEvenly remainder-cent distribution with tests unskipped.
version: 1
---

# Fix split remainder

## Baseline (weak)

```
splitEvenly неправильно ділить
```

## Production — markdown (GPT dialect)

```markdown
Role: TS engineer fixing a known correctness bug in app/src/money.ts.
Goal: Make `splitEvenly` distribute all cents so shares sum exactly to `totalCents`.
Context:
- Current bug: remainder cents are dropped (all shares get floor(total/n)).
- Test `distributes remainder cents so shares sum to total` may be skipped in money.test.ts — unskip it when fixed.
- Example: splitEvenly(100, 3) → [34, 33, 33] (sum 100).
Constraints:
- Edit app/src/money.ts and app/src/money.test.ts only.
- Return array length === n; every share is an integer ≥ 0 for non-negative totals.
- No new dependencies; keep function signature.
Acceptance criteria:
- shares.reduce((a,b)=>a+b,0) === totalCents for uneven totals (100/3, 10/3).
- Clean splits still work: splitEvenly(9000, 3) → [3000,3000,3000].
- Skipped remainder test is active and passing.
- cd app && npm test && npm run typecheck exit 0.
Output:
- Algorithm in one sentence + example table (total, n, shares).
Stop rules:
- If n ≤ 0, do not invent behavior — stop and ask (out of scope).
- Stop after splitEvenly is correct; do not fix applyDiscount in this pass.
```

## Production — XML (Claude dialect)

```xml
<instructions>
Fix splitEvenly remainder distribution in money.ts. Unskip and pass the remainder
test. Run npm test and typecheck in app/.
</instructions>

<context>
Bug: floor division drops remainder cents. Invariant: sum(shares) === totalCents.
</context>

<constraints>
- money.ts + money.test.ts only; integer shares; length n.
</constraints>

<output_format>
One-sentence algorithm + example rows + green test output.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | GPT | example 100/3 |
| XML | Claude | invariant explicit |

## Verified

- [x] Run against `app/src/money.ts` — [34,33,33] for 100/3; remainder test unskipped
