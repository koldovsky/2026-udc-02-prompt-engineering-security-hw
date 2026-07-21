# Prompt cookbook

Reusable, **proven** prompts for this repo's routine — not chat history, not
generic copies from the internet. This is Task A of the WS2 homework.

## How to use

1. Copy `_template.md` → `prompts/<verb-object>.md`.
2. Fill the 6 blocks (Role / Goal / Context / Constraints / Acceptance / Output / Stop).
3. **Run it against a real target** in `app/` and tick "Verified".
4. Promote the most useful ones to commands (`.cursor/commands/` or
   `.claude/commands/`) so the whole team calls them with `/name`.

## Index (11 prompts)

Every prompt below is written in **both dialects** (markdown + XML) per the
`_template.md` structure — not just the one required by the checklist.

| Prompt | Category | Target | Command? |
|--------|----------|--------|----------|
| [`review-pr.md`](review-pr.md) | review | `app/src/money.ts` | ✅ `/review-pr` |
| [`security-review.md`](security-review.md) | review | `app/src/money.ts` | |
| [`add-tests.md`](add-tests.md) | tests | `app/src/money.ts` | ✅ `/add-tests` |
| [`add-boundary-tests.md`](add-boundary-tests.md) | tests | `app/src/money.test.ts` | |
| [`write-jsdoc.md`](write-jsdoc.md) | docs | `app/src/money.ts` | |
| [`write-readme-section.md`](write-readme-section.md) | docs | `app/README.md` | |
| [`extract-validation.md`](extract-validation.md) | refactor | `app/src/money.ts` | |
| [`extract-constants.md`](extract-constants.md) | refactor | `app/src/money.ts` | |
| [`debug-parse-overflow.md`](debug-parse-overflow.md) | debug | `app/src/money.ts` | |
| [`debug-report-format-mismatch.md`](debug-report-format-mismatch.md) | debug | `app/src/money.ts` | |
| [`meta-improve-prompt.md`](meta-improve-prompt.md) | meta | `materials/weak-prompt.md` | |

The two ✅ rows are the promoted commands in `.claude/commands/`.

Covers all five required categories: **tests, review, docs, refactoring,
debug** — with two entries each, plus one meta-prompting write-up (Task A.3).
See `docs/walkthrough.md` for the full checklist.

## Run order (if replaying against a fresh clone of `app/`)

The prompts build on each other's output. Applied in this order, `cd app &&
npm test` and `npm run typecheck` stay green throughout:

1. `add-tests.md` — adds edge-case tests, fixes the planted `splitEvenly`
   remainder bug + adds `applyDiscount`/`splitEvenly` validation.
2. `add-boundary-tests.md` — adds boundary-value tests on top.
3. `extract-validation.md`, `extract-constants.md` — refactor the validation
   added in step 1, behavior-preserving.
4. `debug-parse-overflow.md` — finds and fixes a numeric-precision bug in
   `parseAmount`.
5. `debug-report-format-mismatch.md` — triages a report, concludes "not a
   bug," documents the limitation.
6. `write-jsdoc.md`, `write-readme-section.md` — docs, once behavior is stable.
7. `review-pr.md`, `security-review.md` — review passes (read-only).

## Safety

Prompts must contain **no real secrets or PII** — only placeholders and synthetic
examples. If a prompt needs sensitive context, mask/synthesize it first
(see `docs/sanitization-checklist.md`).
