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

| Prompt | Category | Target | Verified | Command? |
|--------|----------|--------|----------|----------|
| `review-pr.md` | review | `app/src/money.ts` | ✅ | — (example provided) |
| `add-tests.md` | tests | `app/src/money.ts` | ✅ | `/add-tests` |
| `add-docs.md` | docs | `app/src/money.ts` | ✅ | `/add-docs` |
| `refactor.md` | refactor | `app/src/money.ts` | — | — |
| `debug-app.md` | debug | `app/src/money.ts` | ✅ | — |
| `fix-linter.md` | lint/types | `app/src/money.ts` | — | — |
| `write-changelog.md` | changelog | git diff / commit range | — | — |
| `add-validation.md` | validation | `app/src/money.ts` | — | — |
| `explain-code.md` | onboarding | `app/src/money.ts` | — | — |
| `debug-console.md` | debug | `app/src/money.ts` | — | — |

Cover at least: **tests, review, docs, refactoring, debug**. Include **one**
prompt in both dialects (markdown + XML). See `docs/walkthrough.md` for the full
checklist.

## Safety

Prompts must contain **no real secrets or PII** — only placeholders and synthetic
examples. If a prompt needs sensitive context, mask/synthesize it first
(see `docs/sanitization-checklist.md`).
