---
name: extract-constants
description: Replace magic numbers with named constants. Use when literal numbers (100, 0, 2, ...) repeat across a module without explanation.
version: 1
---

# Extract named constants

"Refactor" cookbook entry #2 — smaller and safer than
`extract-validation.md`, good first refactor prompt to demo scope discipline.

## Baseline (weak)

```
познач магічні числа в money.ts як константи
```

## Production — markdown (GPT dialect)

```markdown
Role: TS engineer refactoring for readability, not changing behavior.
Goal: Replace magic numbers in app/src/money.ts with named module-level
constants.
Context: `100` (cents per unit), `0`/`100` (percent range), `2` (max
fraction digits) appear as unexplained literals in formatCents, parseAmount,
and applyDiscount.
Constraints:
- Pure refactor: identical behavior before and after, down to the exact
  output strings/numbers.
- Constants are module-level `const`, UPPER_SNAKE_CASE, each with a one-line
  comment saying what it means.
- No new dependencies, no exported constants unless something outside the
  module needs them (nothing currently does).
Acceptance criteria:
- `cd app && npm test` passes, identical results to before the refactor.
- No bare numeric literal remains for cents-per-unit, percent bounds, or
  fraction-digit count in the four exported functions.
Output:
- The diff to money.ts.
Stop rules:
- Don't rename functions or reorder exports while you're in the file —
  stay on constants only.
```

## Production — XML (Claude dialect)

```xml
<instructions>
Replace magic numbers (cents-per-unit, percent bounds, max fraction digits) in
app/src/money.ts with named module-level constants. Pure refactor.
</instructions>

<context>
Literals `100`, `0`, `100`, `2` appear unexplained across formatCents,
parseAmount, applyDiscount.
</context>

<constraints>
- Identical behavior before/after.
- UPPER_SNAKE_CASE module-level consts, each with a one-line comment.
- Don't rename functions or reorder exports.
</constraints>

<acceptance_criteria>
- npm test passes with identical results.
- No bare literal remains for these three concepts in exported functions.
</acceptance_criteria>

<output_format>Diff to money.ts only.</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | small, mechanical refactor ticket |
| XML | Claude Code | tight constraints prevent "while I'm here" drift |

## Verified

- [x] Run against `app/src/money.ts`
- [x] Added `CENTS_PER_UNIT`, `MAX_FRACTION_DIGITS`, `MIN_PERCENT`,
      `MAX_PERCENT`; replaced the corresponding literals in `formatCents`,
      `parseAmount`, and the validation guards.
- [x] `cd app && npm test` — 14/14 passing, same results as before.
- [x] No exports, function names, or ordering changed — refactor stayed on
      constants only, per stop rule.
