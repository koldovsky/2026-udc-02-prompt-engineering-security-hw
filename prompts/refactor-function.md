---
name: refactor-function
description: Refactor splitEvenly in app/src/money.ts to distribute remainder cents across first shares, keeping all tests green.
version: 1
---

# Refactor Function

## Baseline (weak) — what you started from

```
fix the splitEvenly function
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: TypeScript engineer in a Vitest project. Target: `app/src/money.ts`, function `splitEvenly`.
Goal: Fix `splitEvenly` so the sum of shares always equals `totalCents`. Distribute remainder cents one-per-share to the first `r` shares (where `r = totalCents % n`). Public signature must not change.
Context:
- Current bug: `Math.floor(totalCents / n)` drops remainder; `splitEvenly(10, 3)` → [3,3,3], sum=9
- Fix: first `r` shares get `base + 1`; rest get `base`
- Test file: `app/src/money.test.ts` — the bug-doc test expects sum===9 with comment "BUG: should be 10"; UPDATE that test to expect sum===10 and remove the BUG comment
Constraints:
- Edit `app/src/money.ts` (the fix) and `app/src/money.test.ts` (update bug-doc test); no other files
- Keep public signature: `splitEvenly(totalCents: number, n: number): number[]`
- No new npm dependencies
- No secrets or PII in output
Acceptance criteria:
- `cd app && npm test` passes, all 19 tests green
- `splitEvenly(10, 3)` → [4,3,3] (sum=10)
- `splitEvenly(9000, 3)` → [3000,3000,3000] (unchanged)
- `splitEvenly(1000, 4)` → [250,250,250,250]
Output:
- Updated `app/src/money.ts` and `app/src/money.test.ts`
- One-sentence summary of the change
Stop rules:
- Do not change other functions in money.ts
- If fix requires signature change, stop and report instead
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a TypeScript engineer. Fix the `splitEvenly` remainder bug in `app/src/money.ts`: distribute leftover cents to the first `r` shares instead of dropping them. Also update the bug-doc test in `app/src/money.test.ts` to assert the correct sum. Run `cd app && npm test` — all 19 tests must pass.
</instructions>

<context>
Bug location: app/src/money.ts, function splitEvenly (line ~36)

Current (broken):
  const base = Math.floor(totalCents / n);
  const shares = new Array(n).fill(base);
  return shares;

Fix pattern:
  const base = Math.floor(totalCents / n);
  const remainder = totalCents % n;
  return Array.from({ length: n }, (_, i) => base + (i < remainder ? 1 : 0));

Test to update in app/src/money.test.ts:
  Old: expect(shares.reduce((a, b) => a + b, 0)).toBe(9); // BUG: should be 10
  New: expect(shares.reduce((a, b) => a + b, 0)).toBe(10);
  Also update the test name to remove "BUG" label.

Verification cases:
  splitEvenly(10, 3)    → [4, 3, 3]   sum=10 ✓
  splitEvenly(9000, 3)  → [3000,3000,3000]  sum=9000 ✓
  splitEvenly(1000, 4)  → [250,250,250,250] sum=1000 ✓
</context>

<constraints>
- Edit only app/src/money.ts and app/src/money.test.ts
- Do not change function signature or other functions
- No new npm dependencies
- No secrets or PII in output
</constraints>

<output_format>
- Diffs for both changed files
- One sentence: what changed and that tests pass
</output_format>

<stop_rules>
- If the fix causes other tests to fail, report without guessing a second fix
- Do not touch formatCents, parseAmount, or applyDiscount
</stop_rules>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex / ChatGPT | outcome-first, shorter |
| XML | Claude Code / Claude | structure + multishot |

## Verified

- [ ] Run against a real target in `app/`
- [ ] Agent stayed in scope; acceptance criteria met
