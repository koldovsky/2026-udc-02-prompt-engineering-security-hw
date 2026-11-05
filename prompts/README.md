# Prompt cookbook

Reusable, **proven** prompts for this repo's routine — not chat history, not
generic copies from the internet. This is Task A of the WS2 homework.

## How to use

1. Copy `_template.md` → `prompts/<verb-object>.md`.
2. Fill the 6 blocks (Role / Goal / Context / Constraints / Acceptance / Output / Stop).
3. **Run it against a real target** in `app/` and tick "Verified".
4. Promote the most useful ones to commands (`.cursor/commands/` or
   `.claude/commands/`) so the whole team calls them with `/name`.

## Commands

Promoted to `.cursor/commands/`; pass the target file as the argument:
`/add-tests app/src/money.ts` · `/review-security app/src/money.ts`

## Index

| Prompt | Category | Target | Dialects | Verified | Command |
|--------|----------|--------|----------|----------|---------|
| `add-tests.md` | tests | `app/src/money.ts` | md | yes | `/add-tests` |
| `add-regression-test.md` | tests | `app/src/money.ts` → `money.test.ts` | md | yes | — |
| `review-pr.md` | review | `app/src/money.ts` | md+XML | yes | — |
| `review-security.md` | review | `app/src/money.ts` | md | yes | `/review-security` |
| `write-jsdoc.md` | docs | `app/src/money.ts` | md | yes | — |
| `update-readme.md` | docs | `app/README.md` | md | yes | — |
| `refactor-readability.md` | refactor | `parseAmount` in `app/src/money.ts` | md | yes | — |
| `refactor-extract-guards.md` | refactor | `app/src/money.ts` | md | stopped-by-rule | — |
| `fix-bug.md` | debug | `app/src/money.ts` | md+XML | yes (first run stopped-by-rule, then split) | — |
| `explain-stack-trace.md` | debug | a stack trace / log (`money.ts`) | md | yes | — |
| `triage-it-fails.md` | debug | `app/src/money.test.ts` | md | yes | — |

Covers **tests, review, docs, refactoring, debug**; `review-pr.md` and
`fix-bug.md` ship both dialects (markdown + XML). See `docs/walkthrough.md` for
the full checklist.

## Safety

Prompts must contain **no real secrets or PII** — only placeholders and synthetic
examples. If a prompt needs sensitive context, mask/synthesize it first
(see `docs/sanitization-checklist.md`).
