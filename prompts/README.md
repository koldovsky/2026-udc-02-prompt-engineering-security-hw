# Prompt cookbook

Reusable, **proven** prompts for this repo's routine — not chat history, not
generic copies from the internet. This is Task A of the WS2 homework.

## How to use

1. Copy `_template.md` → `prompts/<verb-object>.md`.
2. Fill the 6 blocks (Role / Goal / Context / Constraints / Acceptance / Output / Stop).
3. **Run it against a real target** in `app/` and tick "Verified".
4. Promote the most useful ones to commands (`.cursor/commands/` or
   `.claude/commands/`) so the whole team calls them with `/name`.

## Index

| Prompt | Category | Target | Command? |
|--------|----------|--------|----------|
| `review-pr.md` | review | `app/src/money.ts` | ✅ `.claude/commands/review-pr.md` |
| `add-tests.md` | tests | `app/src/money.ts` | ✅ `.claude/commands/add-tests.md` |
| `fix-bug.md` | debug/fix | `app/src/money.ts` | — |
| `review-test-suite.md` | review/tests | `app/src/money.test.ts` | — |
| `debug-failure.md` | debug | failing test output in `app/` | — |
| `refactor-safely.md` | refactor | `app/src/money.ts` | — |
| `harden-inputs.md` | security/validation | `app/src/money.ts` | — |
| `write-docs.md` | docs | `app/src/money.ts` | — |
| `explain-module.md` | docs/explain | `app/src/money.ts` | — |
| `compare-approaches.md` | design | `app/src/money.ts` | — |
| `add-typecheck-guard.md` | quality | `app/src/money.ts` | — |
| `add-usage-examples.md` | docs/examples | `app/src/money.ts` | — |

Coverage achieved: **tests, review, docs, refactor, debug**. At least one prompt is
provided in both dialects (markdown + XML), for example `review-pr.md` and
`add-tests.md`.

## Safety

Prompts must contain **no real secrets or PII** — only placeholders and synthetic
examples. If a prompt needs sensitive context, mask/synthesize it first
(see `docs/sanitization-checklist.md`).
