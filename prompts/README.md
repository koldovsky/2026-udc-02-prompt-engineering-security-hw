# Prompt cookbook

Reusable, **proven** prompts for this repo's routine — not chat history, not
generic copies from the internet. This is Task A of the WS2 homework.

## How to use

1. Copy `_template.md` → `prompts/<verb-object>.md`.
2. Fill the 6 blocks (Role / Goal / Context / Constraints / Acceptance / Output / Stop).
3. **Run it against a real target** in `app/` and tick "Verified".
4. Promote the most useful ones to commands (`.cursor/commands/` or
   `.claude/commands/`) so the whole team calls them with `/name`.

## Index (10+ proven prompts)

| Prompt | Category | Target | Dialects | Command? |
|--------|----------|--------|----------|----------|
| `review-pr.md` | review | `app/src/money.ts` | md + XML | ✅ `/review` |
| `add-tests.md` | tests | `app/src/money.ts` | md + XML | ✅ `/add-tests` |
| `write-docs.md` | docs | `app/src/money.ts` | md | — |
| `refactor.md` | refactor | `app/src/money.ts` | md | — |
| `debug.md` | debug | failing test / stack trace | md | — |
| `fix-bug.md` | bugfix | `app/src/money.ts` (splitEvenly) | md | — |
| `explain-code.md` | explain | `app/src/money.ts` | md | — |
| `add-types.md` | types/validation | `app/src/money.ts` | md | — |
| `commit-message.md` | git | staged diff | md | — |
| `name-things.md` | naming | `app/src/money.ts` | md | — |
| `security-review.md` | security | `app/src/money.ts` | md | — |

**Coverage:** tests, review, docs, refactoring, debug (+ bugfix, types, naming,
git, security). **Two-dialect prompts:** `add-tests.md` and `review-pr.md` include
both a markdown (GPT) and an XML (Claude) variant.

## Commands

Promoted to `.claude/commands/` so the whole team calls them with `/name`:

| Command | From | Usage |
|---------|------|-------|
| `/add-tests` | `add-tests.md` | `/add-tests app/src/money.ts` |
| `/review` | `review-pr.md` | `/review app/src/money.ts` |

See `docs/walkthrough.md` for the full checklist.

## Safety

Prompts must contain **no real secrets or PII** — only placeholders and synthetic
examples. If a prompt needs sensitive context, mask/synthesize it first
(see `docs/sanitization-checklist.md`).
