# Prompt cookbook

Reusable, **proven** prompts for this repo's routine — Task A (WS2 homework).

## How to use

1. Copy `_template.md` → `prompts/<verb-object>.md`.
2. Fill Role / Goal / Context / Constraints / Acceptance / Output / Stop.
3. Run against a real target in `app/` and tick Verified.
4. Promote useful ones to `.cursor/commands/` for `/name`.

## Index

| Prompt | Category | Target | Command? |
|--------|----------|--------|----------|
| `review-pr.md` | review | `app/src/money.ts` | `/review-pr` |
| `add-tests.md` | tests | `app/src/money.ts` | `/add-tests` |
| `add-validation-tests.md` | tests | `app/src/money.test.ts` | — |
| `write-docs.md` | docs | `app/src/money.ts` | — |
| `explain-module.md` | docs | `app/src/money.ts` | — |
| `refactor-split-evenly.md` | refactor | `app/src/money.ts` | — |
| `extract-constants.md` | refactor | `app/src/money.ts` | — |
| `fix-apply-discount.md` | refactor | `app/src/money.ts` | — |
| `debug-test-failure.md` | debug | vitest output | — |
| `improve-parse-errors.md` | debug | `app/src/money.ts` | — |

Dual dialect (markdown + XML): `review-pr.md`, `add-tests.md`.

## Safety

No real secrets or PII — only placeholders. Mask sensitive context first
(see `docs/sanitization-checklist.md`).
