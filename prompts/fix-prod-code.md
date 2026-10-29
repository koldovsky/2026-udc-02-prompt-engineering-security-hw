---
name: fix-prod-code
description: Minimal production fixes in money.ts so all vitest cases pass. Use after add-tests (or any pass) leaves one or more failing tests.
version: 1
---

# Fix production code

Follow-up to `prompts/add-tests.md`. When **one or more** tests in
`app/src/money.test.ts` fail, this prompt drives a **minimal** fix in
`app/src/money.ts` only — failing tests are the specification; do not weaken
or edit them.

## Baseline (weak) — what you started from

```
виправи баги в money.ts
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior TS engineer in this repo (Node 22, vitest). You ship minimal, correct fixes.
Goal: Fix `app/src/money.ts` so **every** test in `app/src/money.test.ts` passes — one or many failures, any function, any scenario.
Context:
- Module: `app/src/money.ts` — integer-cent helpers: `formatCents`, `parseAmount`, `splitEvenly`, `applyDiscount`.
- Tests: `app/src/money.test.ts` — full suite (smoke + edge cases); each failing `it(...)` name, assertion, and matcher define the required behavior.
- Workflow: run `npm test` from `app/` first → read failure output (test name, expected vs received, throw matchers) → fix production code to satisfy **only** what red tests require.
- Amounts are **integer cents**; keep existing public function signatures unchanged.
Constraints:
- Edit ONLY `app/src/money.ts`. Do NOT change `money.test.ts`, `package.json`, or other files.
- No new dependencies. No new exported functions unless unavoidable — prefer fixing inline.
- Minimal diff: one fix per root cause; do not refactor unrelated code or add behavior beyond what failing tests demand.
- Do not weaken, skip, or delete tests to get green.
- No secrets/PII in code or comments.
Acceptance criteria:
- `npm test` and `npm run typecheck` from `app/` directory both exit 0 — **all** tests green (0 failures).
- Every previously failing test now passes without modifying test source.
- Fixes are traceable: each change in `money.ts` maps to at least one formerly red test name.
- Public API unchanged: same four exported functions, same parameter types and return types.
- Passing tests remain passing — no regressions.
Output:
- Updated `money.ts` + bullet list per fix: function changed → one-line what changed → test name(s) satisfied.
- If started with failures: briefly note how many tests failed before vs after.
Stop rules (override "ship fast" when applicable):
- All tests already pass before edits → stop; report "nothing to fix" and do not churn `money.ts`.
- A failing test expectation contradicts JSDoc or seems ambiguous → stop; cite test name and conflict; do not change tests or prod without asking.
- Fix requires editing `money.test.ts` or any file other than `money.ts` → stop and ask.
- Fix would need new dependencies, new exports, or API signature changes → stop and ask.
- After fix, any test still red → stop; list remaining failures; do not guess or broaden scope beyond them.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a senior TS engineer (Node 22, vitest). Fix app/src/money.ts so every test
in app/src/money.test.ts passes. One or more failures — any test, any function.
Run npm test from app/ first; read failure output; minimal prod diff only.
Do not edit tests. Re-run npm test and npm run typecheck before finishing —
both must exit 0 (0 test failures).
</instructions>

<context>
Module: app/src/money.ts — formatCents, parseAmount, splitEvenly, applyDiscount.
Tests: app/src/money.test.ts — full suite; failing it() blocks are the spec
(test name, expected/received, toThrow matchers). Integer cents.
</context>

<constraints>
- Only app/src/money.ts may change. No new deps. Keep public API signatures.
- Fix only what red tests require; no unrelated refactor.
- Do not weaken, skip, or delete tests. No regressions on green tests.
- No secrets/PII.
</constraints>

<output_format>
Updated money.ts + per fix: function → one-line change → test name(s) satisfied.
Note failure count before/after if any were red.
Stop: all green already → no churn; test vs JSDoc conflict → report;
other files/deps/API change needed → ask; still red after fix → list remainders.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex / ChatGPT | workflow-first: run tests → read failures → minimal fix |
| XML | Claude Code / Claude | "any red test" + stop rules hold on long runs |

## Verified

- [x] Run after `prompts/add-tests.md` when one or more tests fail (any subset)
- [x] Agent stayed in scope; `npm test` + `typecheck` fully green (30/30, after adding `rejects negative n`); tests untouched
