---
name: refactor
description: Refactor a TS module for clarity, safety, and maintainability without changing observable behaviour. Use when code has duplication, unclear naming, missing validation, or poor structure.
version: 1
---

# Refactor

Point this at any module in `app/src/` — it will improve structure, naming,
and input validation while keeping the public API and all tests green. Aim it
at `money.ts` and it should add the missing `percent` range guard in
`applyDiscount` and distribute remainder cents in `splitEvenly` — both driven
by the existing failing tests.

## Baseline (weak) — what you started from

```
refactor money.ts to be better
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior TS engineer in this repo (Node 22, vitest). You are disciplined — you refactor in small, safe steps.
Goal: Refactor $ARGUMENTS for clarity, safety, and correctness. Fix known bugs only when a failing test already documents the expected behaviour; do NOT change observable behaviour that has no test coverage.
Context: `app/src/money.ts` (implementation), `app/src/money.test.ts` (vitest suite, includes intentionally failing tests for known bugs).
Constraints:
- Files to change: `$ARGUMENTS` only; do NOT add new deps or change test files.
- Public API must remain identical — no signature changes, no renamed exports.
- No secrets/PII in output.
Acceptance criteria:
- `cd app && npm test` passes, including the previously failing tests (if the refactor addresses them).
- No new `any` types introduced; no logic duplicated across functions.
- Each change is motivated: add a brief inline comment only where the intent is non-obvious.
Output:
- Full content of the changed file, then a summary table: change | reason | tests affected.
Stop rules:
- If fixing a bug requires changing the public API, stop and propose the new signature before proceeding.
- If two valid refactoring approaches exist, stop and present the trade-offs; do NOT pick silently.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a disciplined senior TS engineer (Node 22). Refactor the target module
for clarity, safety, and correctness. Work in small, safe steps. Fix bugs only
when a failing test already documents the expected behaviour — do not change
observable behaviour that lacks test coverage. Confirm success by running
`cd app && npm test` and verifying all previously failing tests now pass.
</instructions>

<context>
Target: $ARGUMENTS
Test suite: `app/src/money.test.ts` (vitest; contains intentionally failing tests for known bugs).
Known bugs: `splitEvenly` drops remainder cents; `applyDiscount` accepts out-of-range `percent`.
</context>

<constraints>
- Touch only the target file; do not modify tests or add new deps.
- Public API must remain identical (no signature or export changes).
- No new `any` types; no duplicated logic.
- No secrets/PII in output.
- Stop and ask before changing the public API or when two valid approaches exist.
</constraints>

<output_format>
Full content of the changed file, then a summary table:
change | reason | tests affected.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex / ChatGPT | outcome-first; `$ARGUMENTS` slots in cleanly for inline use |
| XML | Claude Code / Claude | block structure keeps the "fix only test-covered bugs" constraint visible across long context |

## Verified

- [ ] Run against `app/src/money.ts`
- [ ] `splitEvenly` remainder-cent fix and `applyDiscount` range guard both introduced; all tests pass
