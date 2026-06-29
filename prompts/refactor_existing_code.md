---
name: refactor-existing-code
description: Refactor money.ts — fix splitEvenly remainder, add applyDiscount range guard, extract shared validateRange helper. Use when the codebase has known bugs and DRY violations to clean up.
version: 2026-06-29
---

# Refactor existing code

A worked example for Task C of WS2. Point it at `app/src/money.ts` and it
should produce a refactored file that fixes the `splitEvenly` remainder bug,
adds a range guard to `applyDiscount`, and extracts a shared `validateRange`
helper — making all four currently-failing tests pass.

## Baseline (weak)

```
зроби рефакторинг money.ts
```

## Production — markdown (GPT dialect)

```markdown
Role: Senior TS engineer in this repo (Node 22, vitest). You refactor
precisely — no scope creep, no new dependencies, no API changes.
Goal: Refactor app/src/money.ts with three targeted changes:
  1. Fix `splitEvenly` so remainder cents are distributed (e.g. splitEvenly(1001, 10)
     must sum to 1001; splitEvenly(100, 0) must throw).
  2. Add a [0, 100] range guard to `applyDiscount` (negative or >100 percent must throw).
  3. Extract a private `validateRange(value, min, max, name)` helper and use it
     in both `applyDiscount` and `addTax` to remove duplicated validation logic.
Context: Integer-cent money helpers (formatCents, parseAmount, splitEvenly,
applyDiscount, addTax) live in app/src/money.ts. Current defects:
  - splitEvenly uses floor division and silently loses remainder cents; n=0 is not guarded.
  - applyDiscount has no range check — percent values outside [0, 100] pass silently.
  `addTax` already throws when taxPercent is outside [0, 100] — use it as the model.
Constraints:
- Edit only app/src/money.ts; do NOT touch money.test.ts or any other file.
- No new npm dependencies — vitest is already installed.
- Keep all existing exported function signatures unchanged.
- `validateRange` must NOT be exported — private module helper only.
- No secrets or PII in code.
Acceptance criteria:
- `splitEvenly(1001, 10)` returns an array whose elements sum to 1001.
- `splitEvenly(100, 0)` throws.
- `applyDiscount(10000, -10)` throws.
- `applyDiscount(10000, 110)` throws.
- `validateRange` is called inside both `applyDiscount` and `addTax` (no duplicated range logic).
- `npx vitest run` exits 0.
Output:
- The updated app/src/money.ts only. No prose, no diff — the complete file content.
Stop rules:
- If `validateRange` already exists in the file, adapt the existing helper instead of creating a duplicate.
- If any acceptance criterion cannot be met without changing money.test.ts, stop and explain why.
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are a senior TS engineer. Refactor app/src/money.ts with three targeted changes:
1. Fix splitEvenly to distribute remainder cents (splitEvenly(1001,10) must sum to
   1001; splitEvenly(100,0) must throw).
2. Add a [0,100] range guard to applyDiscount so negative or >100 percent values throw.
3. Extract a private validateRange(value, min, max, name) helper and call it in
   both applyDiscount and addTax, removing all duplicated validation logic.
All pre-existing tests must continue to pass. Do not change any public API.
</instructions>

<context>
Target: app/src/money.ts (integer-cent money helpers — formatCents, parseAmount,
splitEvenly, applyDiscount, addTax). Tests live in app/src/money.test.ts (vitest, Node 22).
Current defects to fix:
- splitEvenly: floor division loses remainder cents; n=0 is unguarded (returns [] instead of throwing).
- applyDiscount: no range validation — percent values outside [0, 100] pass silently.
Reference: addTax already throws when taxPercent is outside [0, 100] — mirror that
pattern in the new shared helper.
</context>

<constraints>
- Edit only app/src/money.ts; do not modify any other file.
- No new npm dependencies (vitest is already present).
- validateRange must NOT be exported — it is a private module helper.
- Do not rename or change the signature of any existing exported function.
- No secrets or PII in code — use synthetic values only.
</constraints>

<output_format>
Return the updated app/src/money.ts in full. No prose, no diff — complete file
content only, ready to write directly.
</output_format>

<stop_rules>
- If validateRange already exists in the file, reuse or adapt it instead of creating a duplicate.
- If any acceptance criterion cannot be met without editing money.test.ts, stop and explain why.
</stop_rules>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / ChatGPT | outcome-first; the three-step goal reads naturally as numbered prose |
| XML | Claude Code / Claude | structured tags keep defect list, constraints, and output format unambiguous; multishot-friendly |

## Verified

- [x] Run against `app/src/money.ts`
- [x] Agent stayed in scope; `npx vitest run` exits 0 with all 4 previously-failing tests now passing
