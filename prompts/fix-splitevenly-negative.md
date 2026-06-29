---
name: fix-splitevenly-negative
description: Fix splitEvenly so it conserves cents for negative totals. Use when a money split must always sum back to the original amount, including refunds/credits.
version: 1
---

# Fix `splitEvenly` for negative totals

`splitEvenly(totalCents, n)` in `app/src/money.ts` distributes remainder cents
with `for (i = 0; i < remainder; i++) shares[i] += 1`. JavaScript's `%` keeps
the sign of the dividend, so for a negative total the remainder is negative and
the loop body never runs:

```
splitEvenly(-10001, 3)  // [-3334, -3334, -3334]  → sums to -10002, NOT -10001
```

The invariant "shares always sum exactly to `totalCents`" — promised in the
docstring — breaks for refunds/credits. The goal is to restore it for negative
amounts without changing correct positive-total behaviour.

## Baseline (weak) — what you started from

```
splitEvenly не ділить правильно негативні суми — почини
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior TS engineer in this repo (Node 22, vitest). You write minimal,
idiomatic TypeScript — no new dependencies, no over-engineering.
Goal: Fix splitEvenly(totalCents, n) in app/src/money.ts so the returned shares
always sum exactly to totalCents, including negative totals, and add tests in
app/src/money.test.ts that fail before the fix and pass after.
Context: splitEvenly computes base = Math.floor(totalCents / n) and
remainder = totalCents % n, then adds 1 cent to the first `remainder` entries.
For negative totals, JS `%` yields a negative remainder, so the distribution
loop never runs and the result under-sums by up to (n-1) cents. The docstring
guarantees the shares sum exactly to totalCents.
Constraints:
- Edit only app/src/money.ts and app/src/money.test.ts; do NOT touch any other file.
- Preserve existing positive-total behaviour exactly (same arrays for current cases).
- Keep the n <= 0 guard and the public signature unchanged.
- No new npm dependencies; no secrets or PII — synthetic values only.
Acceptance criteria:
- For any integer totalCents and n > 0, the returned array has length n and
  sums exactly to totalCents.
- splitEvenly(-10001, 3) sums to -10001 (e.g. [-3334, -3334, -3333]).
- splitEvenly(10001, 3) and splitEvenly(10000, 4) are unchanged.
- splitEvenly(300, 1) === [300]; n = 0 still throws.
- `npx vitest run` exits 0 with all pre-existing tests still passing.
Output:
- The updated app/src/money.ts and app/src/money.test.ts (no explanatory prose).
Stop rules:
- If splitEvenly already conserves cents for negative totals, report it and stop.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a senior TS engineer. Fix splitEvenly(totalCents, n) in app/src/money.ts
so the returned shares always sum exactly to totalCents — including negative
totals — then add tests in app/src/money.test.ts that fail before your fix and
pass after. Do not change behaviour for inputs that are already correct.
</instructions>

<context>
Target: app/src/money.ts. splitEvenly does base = Math.floor(totalCents / n),
remainder = totalCents % n, then adds 1 to the first `remainder` entries. JS `%`
keeps the dividend's sign, so a negative total gives a negative remainder and the
loop never executes: splitEvenly(-10001, 3) returns [-3334, -3334, -3334], which
sums to -10002 instead of -10001. The docstring promises the shares sum exactly
to totalCents. Tests live in app/src/money.test.ts (vitest, Node 22).
</context>

<constraints>
- Edit only app/src/money.ts and app/src/money.test.ts; do not modify any other file.
- Preserve current output for all positive-total cases; keep the n <= 0 guard and signature.
- No new npm dependencies; no secrets or PII — synthetic test values only.
- Add new cases inside the existing splitEvenly describe block.
</constraints>

<output_format>
Return both updated files in full — first app/src/money.ts, then
app/src/money.test.ts. Complete file contents only, no prose, no diff.
</output_format>

<stop_rules>
- If splitEvenly already conserves cents for negative totals, report it and stop.
- If vitest is not present in package.json, report it and stop.
</stop_rules>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex / ChatGPT | outcome-first; the sum invariant reads naturally as prose |
| XML | Claude Code / Claude | tags isolate the bug explanation, constraints, and stop rules |

## Verified

- [ ] Run against `app/src/money.ts` + `app/src/money.test.ts`
- [ ] New test for `splitEvenly(-10001, 3)` fails pre-fix, passes post-fix; positive cases unchanged; `npx vitest run` exits 0
