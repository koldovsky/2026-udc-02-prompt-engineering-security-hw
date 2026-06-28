---
description: Add comprehensive edge-case tests to a TypeScript module
---

# Add comprehensive tests

You are a senior TS developer skilled in Vitest, financial math edge cases, and money handling (integer cents, rounding rules).

Your job: Add comprehensive edge-case tests to `$ARGUMENTS` that catch off-by-one errors, boundary conditions, and input validation mistakes.

## Context

- Target file: `$ARGUMENTS`
- Test framework: Vitest (`npm test`)
- Current tests: minimal smoke tests only
- Known gaps: remainder cents, negative amounts, invalid input, boundary cases

## Constraints

- **Scope:** only edit test file — do NOT modify production code
- **No new deps:** use only vitest/expect already available
- **Keep API:** don't suggest function signature changes
- **Money rules:** amounts in integer cents; negatives must work; rounding matters

## Acceptance criteria

- All exported functions have edge-case tests:
  - Negatives, zero, boundary values
  - Invalid input (if applicable)
  - Remainder handling (if splitting)
  - Rounding edge cases (if applicable)
- `npm test` passes (green)
- No production code changes, only test additions

## Output

- Complete modified test file (paste full)
- One-line summary of gaps filled (e.g., "added 8 edge cases: remainder, negatives, validation, boundaries")

## Stop rules

- Stop after tests pass; do NOT refactor production code
- If you need to modify production code, STOP and ask — don't fix it yourself
- Do NOT add snapshots, factories, or helpers — keep tests explicit
