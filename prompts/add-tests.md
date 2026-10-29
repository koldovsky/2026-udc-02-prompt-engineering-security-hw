---
name: add-tests
description: Add vitest edge-case coverage for integer-cent money helpers. Use when smoke tests are too thin.
version: 1
---

# Add tests

Structured rewrite of the weak baseline from `materials/weak-prompt.md`. Point it at
`app/src/money.ts` — the agent should extend tests only, stay in scope, and either
pass `npm test` from `app/` or stop with a bug report (no fixes to `money.ts`).

## Baseline (weak) — what you started from

```
допоможи з тестами для app
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior TS test author in this repo (Node 22, vitest). You write precise, minimal tests.
Goal: Extend `app/src/money.test.ts` with edge-case coverage for `app/src/money.ts` — document expected behavior, not current bugs.
Context:
- Module: `app/src/money.ts` — integer-cent helpers: `formatCents`, `parseAmount`, `splitEvenly`, `applyDiscount`.
- Existing: `app/src/money.test.ts` — **inspect this file first**. Extend it; do not remove or rewrite existing `it` blocks. Do not assume a fixed count (e.g. “4 smoke tests”).
- `splitEvenly` remainder rule: `base = floor(total/n)`, `rem = total % n`; first `rem` shares get `base+1`, rest get `base` (e.g. 100÷3 → [34,33,33]).
- `applyDiscount`: `percent` must be 0–100 inclusive; out-of-range should throw.
Constraints:
- Edit ONLY `app/src/money.test.ts`. Do NOT change `money.ts`, `package.json`, or other files.
- No new dependencies. No helper modules — inline test data only.
- Keep vitest style: `describe`/`it`/`expect`, import from `./money.js`.
- One scenario per `it`; do not duplicate assertions already present in `money.test.ts`.
- Synthetic amounts only — no secrets/PII.
Acceptance criteria:
- After reading `money.test.ts`, **add only cases from the list below that are not already covered**. Skip any scenario that already has an equivalent `it`. Do not remove existing tests.
- Desired coverage (add a case only if missing):
  - `formatCents`: zero, negatives
  - `parseAmount`: single fractional digit, negatives, trimmed whitespace; invalid input throws matching `/Not a valid amount/`
  - `splitEvenly`: remainder distribution per rule above (assert exact array + sum === total), `n=1`, zero total
  - `applyDiscount`: 0%, 100%, rounding to nearest cent; out-of-range percent throws matching `/percent/i`
- Run `npm test` and `npm run typecheck` from `app/` directory; both must exit 0.
- If ALL new tests pass → done.
- If any new test fails due to a production bug in `money.ts` → do NOT weaken the assertion, do NOT fix `money.ts`; stop and report (see Output).
Output:
- If green: updated `money.test.ts` + bullet list of cases added per function.
- If blocked by bug: same file (with failing tests) + for each failure: test name, expected vs actual, file:line in `money.ts`, one-line suspected defect.
Stop rules (override "all tests pass" when applicable):
- Production bug exposed → stop immediately after report; no fixes to `money.ts`.
- Need to touch any file other than `money.test.ts` → stop and ask.
- Unsure of expected behavior → read target JSDoc/signatures first; if still ambiguous, ask — do not guess.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a senior TS test author (Node 22, vitest). Extend app/src/money.test.ts
with edge-case coverage for app/src/money.ts — assert expected behavior, not bugs.
Edit only money.test.ts. Run npm test and npm run typecheck from app/ before
finishing; both must exit 0.
If all tests pass → done. If a test fails due to a production bug → do NOT weaken
assertions or fix money.ts; stop and report per output_format.
Inspect app/src/money.test.ts first; add only missing cases; do not duplicate
or remove existing tests.
</instructions>

<context>
Module: app/src/money.ts — formatCents, parseAmount, splitEvenly, applyDiscount.
Tests: app/src/money.test.ts — inspect current suite; extend only; do not
assume a fixed count (e.g. 4 smoke tests). Amounts are integer cents.
splitEvenly remainder rule: base=floor(total/n), rem=total%n; first rem shares get base+1,
rest get base (e.g. 100÷3 → [34,33,33]).
applyDiscount: percent 0–100 inclusive; out-of-range should throw.
</context>

<constraints>
- Only app/src/money.test.ts may change. No new deps. No helper modules.
- One scenario per it; do not duplicate or remove existing tests.
- Add only listed coverage items that are not already covered:
  formatCents: zero, negatives;
  parseAmount: one fractional digit, negatives, trimmed whitespace, invalid
  input throws matching /Not a valid amount/;
  splitEvenly: remainder distribution (exact array + sum === total), n=1,
  zero total;
  applyDiscount: 0% and 100% bounds, rounding to nearest cent, invalid
  percent throws matching /percent/i.
- Vitest describe/it/expect; import from ./money.js.
- Synthetic test data only — no secrets/PII.
</constraints>

<output_format>
If green: updated money.test.ts + bullet list of cases added per function.
If blocked by bug: same file (with failing tests) + per failure: test name,
expected vs actual, file:line in money.ts, one-line suspected defect.
Stop rules override "all tests pass": production bug → stop after report;
other files needed → ask; ambiguous behavior → read JSDoc then ask.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex / ChatGPT | outcome-first, explicit AC + green-or-blocked flow |
| XML | Claude Code / Claude | stop-on-bug rule and remainder rule hold across long runs |

## Verified

- [x] Run against `app/src/money.ts`
- [x] Agent stayed in scope; acceptance criteria met (edge tests added; 3 failures reported as bug report, `money.ts` untouched)
