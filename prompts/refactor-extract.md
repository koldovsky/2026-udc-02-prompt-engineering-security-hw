---
name: refactor-extract
description: Refactor money.ts to extract a shared private helper without changing the public API or tests.
version: 1
---

# Refactor: extract helper

## Baseline (weak)

```
refactor money.ts to be cleaner
```

## Production — markdown (GPT dialect)

```markdown
Role: TS engineer focused on code clarity, working in this repo (Node 22).
Goal: Extract the repeated "absolute value + sign" pattern in `formatCents` into a
      private helper, and ensure `applyDiscount` validates its `percent` argument.
Context:
- `formatCents` manually handles sign/abs — this pattern may recur.
- `applyDiscount` accepts any percent; no range guard exists.
- Public API (exported names + signatures) must remain identical.
Constraints:
- Change only `app/src/money.ts`.
- Exported function signatures must not change (no new exports).
- All existing tests must still pass.
- Helper must be unexported (prefix with `_` or mark `/** @internal */`).
- No new npm dependencies.
- No secrets or PII in output.
Acceptance criteria:
- A private `_absAndSign(n: number): { abs: number; sign: string }` (or equivalent) exists.
- `applyDiscount` throws `RangeError` if percent < 0 or percent > 100.
- `cd app && npm test` passes.
Output:
- Updated `app/src/money.ts`.
- Brief explanation of each change and why.
Stop rules:
- Do not restructure more than asked — one helper extraction, one guard.
- Do not change `parseAmount` or `splitEvenly` in this pass.
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are a TS engineer focused on code clarity. Refactor app/src/money.ts:
1. Extract a private helper for the sign/abs pattern used in formatCents.
2. Add a RangeError guard to applyDiscount for percent outside 0–100.
Keep all exported signatures identical. Run `cd app && npm test` to verify.
</instructions>

<context>
Target: app/src/money.ts — formatCents, applyDiscount.
formatCents duplicates sign/abs logic; applyDiscount has no range guard.
Public API must stay unchanged; helper must be unexported.
</context>

<constraints>
- One helper extraction + one guard only — no further restructuring.
- Do not change parseAmount or splitEvenly.
- No new npm dependencies; no new exports.
- No secrets or PII in output.
</constraints>

<output_format>
Updated app/src/money.ts + brief explanation of each change and its rationale.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | outcome-first refactor instructions |
| XML | Claude Code | constraints block prevents scope creep |

## Verified

- [x] Run against `app/src/money.ts`
- [x] Public API unchanged; `npm test` green
