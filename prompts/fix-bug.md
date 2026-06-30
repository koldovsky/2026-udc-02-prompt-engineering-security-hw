---
name: fix-bug
description: Fix the remainder-cent bug in splitEvenly so shares sum to totalCents. Drive via prompt, not by hand.
version: 1
---

# Fix bug

## Baseline (weak)

```
fix splitEvenly in money.ts
```

## Production — markdown (GPT dialect)

```markdown
Role: TS engineer and bug-fixer in this repo (Node 22, vitest). You write minimal diffs.
Goal: Fix `splitEvenly` in `app/src/money.ts` so that the sum of returned shares
      always equals `totalCents`, with remainder cents distributed to the first slots.
Context:
- Current implementation: base = floor(total/n), returns [base, base, ...].
  Remainder cents (total % n) are silently dropped.
- Example: splitEvenly(10, 3) should return [4, 3, 3] (sum=10), not [3, 3, 3] (sum=9).
Constraints:
- Change only `splitEvenly` in `app/src/money.ts` — no other functions, no new files.
- Keep the function signature identical: (totalCents: number, n: number): number[].
- No new dependencies.
- No secrets or PII in output.
Acceptance criteria:
- splitEvenly(10, 3) returns [4, 3, 3].
- splitEvenly(9, 3) returns [3, 3, 3].
- splitEvenly(10, 1) returns [10].
- `cd app && npm test` passes.
Output:
- Updated `app/src/money.ts` (splitEvenly only).
- One-sentence explanation of the fix.
Stop rules:
- Do not refactor other functions or change their behavior.
- If n ≤ 0 is not currently validated, note it but do not add validation unless instructed.
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are a TS bug-fixer. Fix splitEvenly in app/src/money.ts so the sum of returned
shares always equals totalCents. Distribute remainder cents to the first slots.
Do not touch any other function. Run `cd app && npm test` to confirm before finishing.
</instructions>

<context>
Target: app/src/money.ts — splitEvenly(totalCents, n): number[].
Bug: base = floor(total/n); remainder = total % n cents are silently dropped.
Example: splitEvenly(10, 3) must return [4, 3, 3], not [3, 3, 3].
</context>

<constraints>
- Change only splitEvenly; keep its signature identical.
- No new files, no new dependencies.
- No secrets or PII in output.
</constraints>

<output_format>
Updated app/src/money.ts (splitEvenly only) + one-sentence explanation of the fix.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / ChatGPT | concrete example pins expected behavior |
| XML | Claude Code | structured acceptance criteria enforce minimal diff |

## Verified

- [x] Run against `app/src/money.ts`
- [x] splitEvenly now distributes remainder cents; `npm test` green
