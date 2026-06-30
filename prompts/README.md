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

| Prompt | Category | Target | Dialects | Command? |
|--------|----------|--------|----------|----------|
| `review-pr.md` | review | `app/src/money.ts` | md + XML | ✅ `/review-pr` |
| `add-tests.md` | tests | `app/src/money.ts` | md + XML | ✅ `/add-tests` |
| `write-docs.md` | docs | `app/src/money.ts` | md + XML | |
| `refactor-extract.md` | refactor | `app/src/money.ts` | md + XML | |
| `debug-runtime.md` | debug | stack trace / log | md + XML | |
| `fix-bug.md` | fix | `app/src/money.ts` | md + XML | |
| `add-validation.md` | validation | `app/src/money.ts` | md + XML | |
| `security-audit.md` | security | `app/src/money.ts` | md + XML | |
| `explain-code.md` | docs / onboarding | `app/src/money.ts` | md + XML | |
| `add-edge-cases.md` | tests | `app/src/money.ts` | md + XML | |
| `generate-changelog.md` | release | git diff / PR | md + XML | |
| `meta-improve-prompt.md` | meta | any prompt | md + XML | |

All prompts have both **markdown** (GPT dialect) and **XML** (Claude dialect) variants.
See `docs/walkthrough.md` for the full checklist.

## Safety

Prompts must contain **no real secrets or PII** — only placeholders and synthetic
examples. If a prompt needs sensitive context, mask/synthesize it first
(see `docs/sanitization-checklist.md`).
