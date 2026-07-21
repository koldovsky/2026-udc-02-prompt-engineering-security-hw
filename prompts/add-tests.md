---
name: add-tests
description: Add edge-case tests for a money helper, surface and fix any bug the new tests reveal. Use when a module has only smoke tests.
version: 1
---

# Add tests

Task A.2 of the homework. Compare this to `materials/weak-prompt.md`
(`допоможи з тестами для app`) — that one has no scope, no goal, no AC, no
stop rule, so the agent guesses the file, guesses which edge cases matter,
and doesn't know when to stop. This version fixes all four.

## Baseline (weak) — what you started from

```
допоможи з тестами для app
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: TS engineer in this repo (Node 22, vitest). You write tests before you touch behavior.
Goal: Add missing edge-case tests for `app/src/money.ts`, then fix any bug they reveal.
Context: Integer-cent money helpers (formatCents, parseAmount, splitEvenly,
applyDiscount). Existing tests in app/src/money.test.ts only cover the happy path.
Constraints:
- Scope: app/src/money.ts and app/src/money.test.ts only. No new dependencies.
- Keep the public function signatures (names, params, return types) unchanged.
- If a new test fails against current code, fix the minimal amount of source
  needed to make it pass — don't rewrite unrelated logic.
- No secrets/PII in test fixtures.
Acceptance criteria:
- New tests cover: remainder-cent distribution in splitEvenly, negative
  amounts, invalid/garbage input to parseAmount, out-of-range percent in
  applyDiscount, invalid n in splitEvenly.
- `cd app && npm test` passes, 0 failures.
- `cd app && npm run typecheck` passes.
Output:
- The diff to money.ts (if any) and money.test.ts, plus a one-line summary of
  any bug fixed.
Stop rules:
- Do not add tests for behavior outside these four functions.
- If everything already passes and no bug is found, say so — don't invent
  extra assertions just to look thorough.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a TS engineer in this repo. Add missing edge-case tests for
app/src/money.ts, then fix any bug the new tests reveal. Verify with
`cd app && npm test` before finishing.
</instructions>

<context>
Target: app/src/money.ts (formatCents, parseAmount, splitEvenly, applyDiscount).
Existing tests: app/src/money.test.ts — smoke-test only, happy path.
</context>

<constraints>
- Scope: app/src/money.ts + app/src/money.test.ts only, no new deps.
- Keep public function signatures unchanged.
- Fix only what a new failing test requires — no unrelated rewrites.
- No secrets/PII in fixtures.
</constraints>

<acceptance_criteria>
- Cover: splitEvenly remainder cents, negative amounts, invalid parseAmount
  input, out-of-range applyDiscount percent, invalid splitEvenly n.
- npm test and npm run typecheck both pass.
</acceptance_criteria>

<output_format>
Diff summary + one line describing any bug fixed. State plainly if nothing
needed fixing.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex | outcome-first, reads like a ticket |
| XML | Claude Code | tags keep "fix only what's required" from bleeding into scope creep |

## Verified

- [x] Run against `app/src/money.ts` + `app/src/money.test.ts`
- [x] Surfaced 3 real issues and fixed them in scope:
  1. `splitEvenly` dropped remainder cents instead of distributing them
     (`splitEvenly(9001, 3)` returned `[3000,3000,3000]`, summing to 9000, not
     9001) — fixed with a trunc + remainder-distribution loop.
  2. `applyDiscount` accepted `percent` outside `[0, 100]` silently — added a
     `RangeError` guard.
  3. `splitEvenly` accepted `n <= 0` / non-integer `n` silently (would divide
     by zero or return fractional shares) — added a `RangeError` guard.
- [x] `cd app && npm test` — 13/13 passing (up from 4 smoke tests)
- [x] `cd app && npm run typecheck` — clean
- [x] Agent stayed in scope: no changes outside `money.ts` / `money.test.ts`,
      no new dependencies, public API (names/params/returns) unchanged.
