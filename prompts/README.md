# Prompt cookbook

Reusable, **proven** prompts for this repo's routine — not chat history, not
generic copies from the internet. This is Task A of the WS2 homework.

## How to use

1. Copy `_template.md` → `prompts/<verb-object>.md`.
2. Fill the 6 blocks (Role / Goal / Context / Constraints / Acceptance / Output / Stop).
3. **Run it against a real target** in `app/` and tick "Verified".
4. Promote the most useful ones to commands (`.cursor/commands/` or
   `.claude/commands/`) so the whole team calls them with `/name`.

## Index (12 prompts)

| Prompt | Category | Target | Dialects | Command? |
|--------|----------|--------|----------|----------|
| `review-pr.md` | review | `app/src/money.ts` | md + xml | `/review` |
| `add-tests.md` | tests | `app/src/money.ts` | md + xml | `/add-tests` |
| `write-docs.md` | docs | `app/src/money.ts` | md + xml | — |
| `refactor.md` | refactor | `app/src/money.ts` | md + xml | — |
| `debug.md` | debug | a failing test / stack trace | md + xml | — |
| `fix-bug.md` | bug-fix | `app/src/money.ts` (`splitEvenly`) | md + xml | — |
| `add-validation.md` | hardening | `app/src/money.ts` (`applyDiscount`) | md + xml | — |
| `explain-code.md` | onboarding | `app/src/money.ts` | md + xml | — |
| `commit-message.md` | git | staged diff | md + xml | — |
| `pr-description.md` | PR / docs | branch diff | md + xml | — |
| `sanitize-doc.md` | security | `materials/sensitive-ticket.md` | md + xml | `/sanitize` |
| `audit-injection.md` | security | `materials/decoy-doc.md` | md + xml | — |

Covers the required **tests, review, docs, refactoring, debug** plus bug-fix,
validation, onboarding, git, and two security prompts. Every entry carries both
dialects (markdown + XML); `add-tests.md` and `review-pr.md` are the worked
two-dialect examples.

## Commands (promoted to `.claude/commands/`)

| Command | From | What it does |
|---------|------|--------------|
| `/add-tests <file>` | `add-tests.md` | add edge-case tests, verify with `npm test` |
| `/review <file\|diff>` | `review-pr.md` | adversarial, security-aware review (read-only) |
| `/sanitize <doc>` | `sanitize-doc.md` | classify + sanitize a doc, secrets out-of-band |

Each command has a `description` in frontmatter and takes `$ARGUMENTS`. (Same
files work under `.cursor/commands/` for Cursor users.)

## Safety

Prompts must contain **no real secrets or PII** — only placeholders and synthetic
examples. If a prompt needs sensitive context, mask/synthesize it first
(see `docs/sanitization-checklist.md`).
