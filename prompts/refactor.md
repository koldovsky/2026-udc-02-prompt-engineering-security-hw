---
name: refactor
description: Refactor money.ts for readability and maintainability; extract helpers, improve variable names, reduce duplication
version: 1
---

# Refactor money.ts

## Baseline (weak)

```
покращи код в money.ts
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior TS developer focused on readability, maintainability, and clean code principles.

Goal: Refactor `app/src/money.ts` to improve readability and reduce duplication without changing the public API or behavior.

Context:
- File: `app/src/money.ts` — 4 utility functions with some code patterns repeated
- Tests: comprehensive test suite in `app/src/money.test.ts` (27 tests, all passing)
- Constraints: Node 22, TypeScript, Vitest

Constraints:
- Public API must remain identical (function signatures, names, behavior)
- Tests must still pass after refactoring (`npm test`)
- No new dependencies
- Do NOT fix the known splitEvenly bug (remainder cents) — that's for a separate task
- Do NOT add abstractions beyond what the small module needs (keep it simple)

Acceptance criteria:
- Code is more readable (better variable names, clearer logic)
- Code duplication reduced (e.g., repeated padding, formatting logic)
- All 27 tests still pass
- No behavior changes

Output:
- Modified `app/src/money.ts` file (paste full file)
- One-line summary of what you improved (e.g., "extracted padZero helper, renamed vars for clarity")

Stop rules:
- Stop if any test fails; do NOT debug/fix tests, ask instead
- Do NOT refactor test file
- Do NOT change function names or signatures
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a senior TS developer. Refactor `app/src/money.ts` for readability and maintainability without changing public API or behavior. Keep it simple — no over-engineering.
</instructions>

<context>
File: `app/src/money.ts` — 4 utility functions for money handling in integer cents. Tests in `app/src/money.test.ts` (27 tests, all passing).
</context>

<constraints>
- Public API identical (same function names, signatures, behavior)
- All 27 tests must pass after refactoring
- No new dependencies; no new abstractions beyond what's needed
- Do NOT fix splitEvenly remainder bug
- Do NOT refactor test file
</constraints>

<output_format>
Full refactored `app/src/money.ts` + one-line improvement summary (e.g., "extracted padZero, renamed for clarity").
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | outcome-first, clear "no API changes" rule |
| XML | Claude Code | structure, "keep it simple" emphasis |

## Verified

- [ ] All 27 tests pass after refactoring
- [ ] Public API identical
- [ ] Code is more readable
