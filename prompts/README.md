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

| Prompt | Category | Target | Command? |
|--------|----------|--------|----------|
| `add-tests.md` | tests | `app/src/money.ts` | ✅ `/add-tests` |
| `review-pr.md` | review | `app/src/money.ts` | ✅ `/review` |
| `write-docs.md` | docs | `app/src/money.ts` | — |
| `refactor.md` | refactor | `app/src/money.ts` | — |
| `debug.md` | debug | a failing test / stack trace | ✅ `/debug` |
| `explain-code.md` | docs / onboarding | `app/src/money.ts` | — |
| `edge-cases.md` | tests / analysis | `app/src/money.ts` | — |
| `harden-validation.md` | refactor / safety | `applyDiscount` in `money.ts` | — |
| `commit-message.md` | git | staged diff | — |
| `pr-description.md` | review / docs | a branch diff | — |
| `name-things.md` | refactor | `app/src/money.ts` | — |

Covers all required categories: **tests, review, docs, refactoring, debug**.
**Two dialects (markdown + XML):** `add-tests.md` and `review-pr.md` each carry
both. **Promoted commands** live in `.claude/commands/`: `/add-tests`, `/review`,
`/debug`. See `docs/walkthrough.md` for the full checklist.

## Safety

Prompts must contain **no real secrets or PII** — only placeholders and synthetic
examples. If a prompt needs sensitive context, mask/synthesize it first
(see `docs/sanitization-checklist.md`).
