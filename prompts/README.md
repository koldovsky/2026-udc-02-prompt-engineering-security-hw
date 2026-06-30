# Prompt cookbook

Reusable, **proven** prompts for this repo's routine — not chat history, not
generic copies from the internet. This is Task A of the WS2 homework.

## How to use

1. Copy `_template.md` → `prompts/<verb-object>.md`.
2. Fill the 6 blocks (Role / Goal / Context / Constraints / Acceptance / Output / Stop).
3. **Run it against a real target** in `app/` and tick "Verified".
4. Promote the most useful ones to commands (`.cursor/commands/` or
   `.claude/commands/`) so the whole team calls them with `/name`.

## Index (11 prompts — covers tests, review, docs, refactor, debug + git/security)

| Prompt | Category | Target | Command? |
|--------|----------|--------|----------|
| `review-pr.md` | review | `app/src/money.ts` | ✅ `/review-pr` |
| `add-tests.md` | tests | `app/src/money.ts` | ✅ `/add-tests` |
| `fix-bug.md` | tests / fix | `app/src/money.ts` (`splitEvenly`) | — |
| `harden-input.md` | tests / security | `app/src/money.ts` (`applyDiscount`) | — |
| `write-docs.md` | docs | `app/src/money.ts` | — |
| `explain-code.md` | docs / onboarding | `app/src/money.ts` | — |
| `refactor-module.md` | refactor | `app/src/money.ts` | — |
| `debug-failure.md` | debug | a stack trace / failing test | — |
| `write-commit.md` | git | staged diff | — |
| `pr-description.md` | git | branch diff vs `main` | — |
| `sanitize-snippet.md` | security | any snippet (pairs with Task B) | — |

Every prompt ships **both dialects** (markdown for GPT/Copilot, XML for Claude),
following `_template.md` and the `review-pr.md` quality bar.

**Commands** (`.claude/commands/`, callable as `/name <path>`):

| Command | Wraps | Usage |
|---------|-------|-------|
| `/review-pr` | `review-pr.md` | `/review-pr app/src/money.ts` |
| `/add-tests` | `add-tests.md` | `/add-tests app/src/money.ts` |

Cover at least: **tests, review, docs, refactoring, debug** ✅. See
`docs/walkthrough.md` for the full checklist.

## Safety

Prompts must contain **no real secrets or PII** — only placeholders and synthetic
examples. If a prompt needs sensitive context, mask/synthesize it first
(see `docs/sanitization-checklist.md`).
