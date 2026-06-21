---
name: edge-case-hunter
description: Enumerate unhandled boundary conditions for a function without fixing them. Use alongside review to find gaps.
version: 1
---

# Edge-case hunter

Review prompt for the cookbook. Walks every boundary of `app/src/money.ts` and
reports only the unhandled cases — method-driven, not opinion-driven.

## Baseline (weak)

```
які тут можуть бути проблеми
```

## Production — markdown (GPT dialect)

```markdown
Role: Edge-case analyst for this TS repo (Node 22). Exhaustive, not adversarial.
Goal: List boundary conditions in $ARGUMENTS that are NOT currently handled.
Context: Integer-cent helpers. Read-only — you do not fix anything.
Constraints:
- Walk each function's inputs: zero, negative, very large, non-integer,
  empty/whitespace, NaN/Infinity, n=0/1, percent at 0/100 and beyond.
- Report only *unhandled* cases; skip ones already covered by code or tests.
- No code changes. No secrets/PII in examples.
Acceptance criteria:
- A table: function · input · current behavior · expected · severity.
- Each row cites file:line and is reproducible.
Output:
- The table, most severe first, then a one-line coverage summary.
Stop rules:
- If everything is handled for a function, say "no gaps" for it explicitly.
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | the input checklist forces breadth |

## Verified

- [x] Run against `app/src/money.ts` (evidence: `prompts/_runs.md`)
- [x] Found real gaps: non-integer `formatCents`/`splitEvenly`, `parseAmount` precision > 2^53



