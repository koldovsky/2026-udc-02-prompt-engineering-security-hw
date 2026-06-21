# Prompt cookbook

Reusable, **proven** prompts for this repo's routine — not chat history, not
generic copies from the internet. This is Task A of the WS2 homework.

## How to use

1. Copy `_template.md` → `prompts/<verb-object>.md`.
2. Fill the 6 blocks (Role / Goal / Context / Constraints / Acceptance / Output / Stop).
3. **Run it against a real target** in `app/` and tick "Verified".
4. Promote the most useful ones to commands (`.cursor/commands/` or
   `.claude/commands/`) so the whole team calls them with `/name`.

## Index (11 proven prompts)

| Prompt | Category | Target | Command? |
|--------|----------|--------|----------|
| `review-pr.md` | review | `app/src/money.ts` | ✅ `/review-pr` |
| `add-tests.md` | tests | `app/src/money.ts` | ✅ `/add-tests` · **dual dialect (md + XML)** |
| `write-docs.md` | docs | `app/src/money.ts` | — |
| `explain-code.md` | docs | `app/src/money.ts` | — |
| `refactor-safe.md` | refactor | `app/src/money.ts` | — |
| `add-validation.md` | refactor | `app/src/money.ts` | — |
| `debug-stacktrace.md` | debug | a failing test / stack trace | — |
| `fix-bug.md` | debug | `app/src/money.ts` (splitEvenly) | — |
| `edge-case-hunter.md` | review | `app/src/money.ts` | — |
| `perf-review.md` | review | `app/src/money.ts` | — |
| `commit-message.md` | review | a staged diff | — |

Categories covered: **tests, review, docs, refactoring, debug** ✅.
Dual-dialect entry (markdown + XML): **`add-tests.md`** ✅.
Promoted commands (`.claude/commands/`): **`/add-tests`, `/review-pr`** ✅.
See `docs/walkthrough.md` for the full checklist.

## Safety

Prompts must contain **no real secrets or PII** — only placeholders and synthetic
examples. If a prompt needs sensitive context, mask/synthesize it first
(see `docs/sanitization-checklist.md`).
