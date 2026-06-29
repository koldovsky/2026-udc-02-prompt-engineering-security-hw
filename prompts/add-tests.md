---
name: add-tests
description: Add Vitest edge-case tests for money helpers. Use when coverage is thin.
version: 2
---

# Add tests

Structured rewrite of the weak baseline from `materials/weak-prompt.md`. Point it at
`app/src/money.ts` — the agent should extend `money.test.ts` with edge cases the
smoke tests skip, without touching production code.

**Dual dialect (Task A, step 6):** this file is the participant's prompt in **both**
markdown (GPT / Copilot) and XML (Claude) — same contract, two encodings, like
[`review-pr.md`](./review-pr.md).

## Meta-prompting (v1 → v2)

Improvements added before execution:

- Split vague "cover edge cases" into **per-function, verifiable** acceptance rows.
- Added **minimum new-test count** and **naming** rules so "done" is measurable.
- Required **explicit skip/todo inventory** in output when production is wrong.
- Added `npm run typecheck` as a second gate alongside `npm test`.
- Clarified: **extend** existing smoke tests — do not delete or weaken them.

## Baseline (weak)

```
допоможи з тестами для app
```

## Production — markdown (GPT dialect)

```markdown
Role: TypeScript engineer in this repo (Node 22, vitest, ESM, `*.js` import suffix). You add tests only.
Goal: Extend app/src/money.test.ts with edge-case Vitest coverage for all four exports in app/src/money.ts.
Context:
- Target module: app/src/money.ts (integer cents; exports: formatCents, parseAmount, splitEvenly, applyDiscount).
- Existing file app/src/money.test.ts has minimal happy-path smoke tests — keep them; add what's missing.
- Known gap: splitEvenly may not distribute remainder cents (see comment in money.ts).
- Verify: cd app && npm test && npm run typecheck.
Constraints:
- Edit only app/src/money.test.ts — no changes to money.ts or package.json.
- No new dependencies; do not change the public API or production behavior.
- One assertion theme per `it()`; descriptive test names (behavior, not implementation).
- Use expect(() => …).toThrow for parseAmount errors; no mocks unless unavoidable.
- No secrets or PII in test data.
Acceptance criteria:
- cd app && npm test exits 0; cd app && npm run typecheck exits 0.
- At least 5 new `it()` blocks added (beyond the existing smoke tests).
- formatCents: new test asserts negative cents (e.g. -42800 → "-428.00") and zero (0 → "0.00").
- parseAmount: new test for trimmed input; new test with ≥2 invalid strings that throw /Not a valid amount/; new test for negative string (e.g. "-12.50" → -1250).
- splitEvenly: new test for uneven total where shares must sum to totalCents — if production fails, mark it.skip or it.todo with a one-line reason (do not fix money.ts).
- applyDiscount: new test covers 0% (unchanged), 100% (zero), and percent > 100 (documents current behavior).
- Existing smoke tests still present and passing unchanged.
- Every it.skip / it.todo listed in output with the reason.
Output:
- Updated money.test.ts.
- Bullet list: function → new test name → what it asserts.
- Skipped/todo table (if any): test name → why skipped.
Stop rules:
- If money.ts has no exported functions, stop and say so.
- Do not fix production code to make tests pass — skip/todo and explain.
- Stop when acceptance criteria pass; do not refactor tests or add unrelated files.
```

## Production — XML (Claude dialect)

```xml
<instructions>
TypeScript engineer (Node 22, vitest, ESM). Extend app/src/money.test.ts with
edge-case tests for all four exports in app/src/money.ts. Tests only — do not
edit money.ts. Run cd app && npm test && npm run typecheck before finishing.
</instructions>

<context>
Module: app/src/money.ts — formatCents, parseAmount, splitEvenly, applyDiscount (integer cents).
File: app/src/money.test.ts — keep existing smoke tests; add missing edge cases.
Known gap: splitEvenly remainder cents may be wrong (see money.ts comment).
</context>

<constraints>
- Edit only app/src/money.test.ts; no new deps; keep public API unchanged.
- ≥5 new it() blocks; one behavior per test; descriptive names.
- parseAmount errors: expect(() => …).toThrow(/Not a valid amount/).
- If remainder test fails on production, it.skip or it.todo with one-line reason.
- No secrets or PII in test data.
</constraints>

<acceptance_criteria>
- npm test and npm run typecheck both exit 0 in app/.
- formatCents: negatives + zero.
- parseAmount: trim, ≥2 invalid inputs throw, negative string parses.
- splitEvenly: uneven total — shares sum to total or skip/todo with reason.
- applyDiscount: 0%, 100%, percent &gt; 100.
- Existing smoke tests unchanged and passing.
</acceptance_criteria>

<output_format>
1. Updated money.test.ts
2. Bullets: function → test name → assertion
3. Skip/todo table (if any): name → reason
</output_format>

<stop_rules>
- If money.ts has no exports, stop and say so.
- Do not fix production code — skip/todo and explain.
- Stop when acceptance criteria pass; no unrelated refactors.
</stop_rules>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex | Role/Goal/AC/Stop as labeled blocks — outcome-first |
| XML | Claude Code / Claude | Same contract in tags; `<acceptance_criteria>` + `<stop_rules>` |

## Verified

- [x] Run against `app/src/money.ts` (v1)
- [x] Agent stayed in scope (`money.test.ts` only); `cd app && npm test` green (9 passed, 1 skipped remainder)
- [x] Re-run with v2 AC: 11 passed, 1 skipped; typecheck green; zero + negative parseAmount added
- [x] After debug/fix-split prompts: 13 passed, 0 skipped; remainder + percent guard fixed via cookbook
