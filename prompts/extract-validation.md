---
name: extract-validation
description: Extract duplicated input-validation logic into named guard functions. Use once two or more functions grew ad-hoc range/shape checks.
version: 1
---

# Extract validation guards

"Refactor" cookbook entry #1.

## Baseline (weak)

```
прибери дублювання в money.ts
```

## Production — markdown (GPT dialect)

```markdown
Role: TS engineer refactoring for clarity, not changing behavior.
Goal: Extract the ad-hoc validation checks in app/src/money.ts
(splitEvenly's n check, applyDiscount's percent check) into named,
reusable guard functions.
Context: splitEvenly and applyDiscount each throw a RangeError from an
inline condition. Same shape, different checks — worth naming.
Constraints:
- Pure refactor: no change to any function's observable behavior, thrown
  error types, or public signatures.
- New guard functions are internal (not exported) unless a test needs them.
- No new dependencies.
Acceptance criteria:
- `cd app && npm test` passes with the exact same pass count as before
  (behavior-preserving).
- Each guard function has one clear responsibility and is used by >=1 caller.
Output:
- The diff to money.ts.
Stop rules:
- Don't invent guards for conditions that don't exist yet (e.g. don't
  preemptively validate `cents` — only refactor what's already checked).
```

## Production — XML (Claude dialect)

```xml
<instructions>
Extract the inline validation checks in splitEvenly (n) and applyDiscount
(percent) into named internal guard functions. Pure refactor — no behavior
change.
</instructions>

<context>
Both functions currently throw RangeError from an inline `if` condition.
</context>

<constraints>
- No change to observable behavior, error types, or public signatures.
- Guards stay internal (not exported).
- Don't add validation for conditions that aren't already checked.
</constraints>

<acceptance_criteria>
- npm test passes with the same pass count as before the refactor.
</acceptance_criteria>

<output_format>Diff to money.ts only.</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | short refactor ticket |
| XML | Claude Code | "same pass count" AC is easy to check literally against tags |

## Verified

- [x] Run against `app/src/money.ts`
- [x] Extracted `assertPositiveInteger(n, label)` (used by `splitEvenly`) and
      `assertPercentInRange(percent)` (used by `applyDiscount`) as internal,
      non-exported helpers.
- [x] `cd app && npm test` — same 14/14 passing before and after (behavior
      preserved).
- [x] Did not add validation for `cents`/`totalCents` — out of scope per stop
      rule (flagged instead as a future item in `security-review.md`).
