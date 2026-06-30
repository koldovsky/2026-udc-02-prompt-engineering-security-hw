---
name: fix-remainder-bug
description: Fix the splitEvenly remainder-cent bug so the sum of shares always equals totalCents.
version: 1
---

# Fix remainder-cent bug in splitEvenly

## Baseline (weak)

```
fix the bug in splitEvenly
```

## Production — markdown (GPT dialect)

```markdown
Role: You are a TypeScript engineer fixing a confirmed bug.
Goal: Fix `splitEvenly` in $ARGUMENTS so the sum of returned shares always equals `totalCents`. The existing failing test (splitEvenly(1001, 3) sum ≠ 1001) must now PASS.
Context: Integer-cent money helpers. Bug: `Math.floor(totalCents / n)` silently drops remainder cents. Standard fix: compute `r = totalCents % n` and add 1 cent to the first `r` shares.
Constraints:
- Edit ONLY the body of `splitEvenly`.
- Do NOT change its signature, other functions, or tests.
- After the fix, run `cd app && npx vitest run` — all 16 tests must pass.
Acceptance criteria:
- `splitEvenly(1001, 3)` returns an array whose elements sum to 1001 (e.g. [334, 334, 333]).
- `splitEvenly(9000, 3)` still returns [3000, 3000, 3000].
Output:
- Updated `splitEvenly` function body only.
- `npx vitest run` output confirming all tests pass.
Stop rules:
- Do not alter any test expectations.
- Do not touch `applyDiscount`, `formatCents`, or `parseAmount`.
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are a TypeScript engineer fixing a confirmed bug in splitEvenly.
Fix: make the sum of returned shares always equal totalCents.
Edit ONLY the splitEvenly function body. Do not touch tests or other functions.
After fixing, run: cd app && npx vitest run — all tests must pass.
</instructions>

<context>
Target: $ARGUMENTS
Bug: Math.floor drops remainder cents.
  splitEvenly(1001, 3) → [333, 333, 333] (sum=999, loses 2 cents).
Fix algorithm:
  const base = Math.floor(totalCents / n);
  const r    = totalCents % n;
  return Array.from({ length: n }, (_, i) => base + (i < r ? 1 : 0));
Expected after fix:
  splitEvenly(1001, 3) → [334, 334, 333]  sum=1001 ✓
  splitEvenly(9000, 3) → [3000, 3000, 3000] (unchanged) ✓
</context>

<constraints>
- Edit ONLY the splitEvenly function body.
- Signature must remain: splitEvenly(totalCents: number, n: number): number[]
- All 16 existing tests must pass (previously failing remainder test included).
- Do NOT modify any test file.
</constraints>

<output_format>
1. Updated splitEvenly function.
2. vitest run output showing 16/16 pass.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | GPT / Copilot | outcome-first with test count anchor |
| XML | Claude Code | algorithm spelled out; model copies it exactly without hallucination |

## Verified

- [x] Run against `app/src/money.ts`
- [x] Fix applied; vitest went from 15 pass / 1 fail → 16/16 pass
