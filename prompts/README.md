# Prompt cookbook

Reusable, **proven** prompts for this repo's routine — not chat history, not
generic copies from the internet. Each file ships two production-ready variants
(markdown for GPT-dialect tools, XML for Claude) and records a baseline "weak"
prompt so the improvement is visible.

## Quick start

```bash
# Use a slash command (promoted prompts only)
/add-tests app/src/money.ts

# Or copy-paste the Production block from any .md into your AI tool of choice
```

## Adding a new prompt

1. Copy `_template.md` → `prompts/<verb-object>.md`.
2. Fill every block: **Role / Goal / Context / Constraints / Acceptance criteria / Output / Stop rules**.
3. Run it against a real target in `app/` and tick the Verified checklist.
4. Add a row to the index below, then promote to a slash command if the team will reuse it often.

## Template structure

Each prompt file follows this shape:

| Block | Purpose |
|-------|---------|
| **Role** | Who acts and in what stack (keeps the model in persona) |
| **Goal** | User-visible outcome in one sentence |
| **Context** | Only the files/facts the model needs — no noise |
| **Constraints** | Scope limits, what NOT to touch, no new deps, no secrets |
| **Acceptance criteria** | Verifiable conditions: a command, a test, a visible state |
| **Output** | What to return: changed files + short summary |
| **Stop rules** | When to stop and ask rather than guess |

Two dialect variants per file:
- **markdown** — outcome-first style, works well with Copilot / GPT
- **XML** — structured tags, works better with Claude Code (structure enforces rules)

## Index

| Prompt | Category | Target | Command |
|--------|----------|--------|---------|
| `review-pr.md` | review | `app/src/money.ts` | — |
| `review-security.md` | review | `app/src/money.ts` | ✅ `/review-security` |
| `add-tests.md` | tests | `app/src/money.ts` | ✅ `/add-tests` |
| `write-docs.md` | docs | `app/src/money.ts` | ✅ `/write-docs` |
| `write-readme.md` | docs | `app/src/` | — |
| `refactor-app.md` | refactor | `app/src/money.ts` | ✅ `/refactor-app` |
| `add-logs.md` | debug | `app/src/money.ts` | ✅ `/add-logs` |
| `debug-app.md` | debug | stack trace / log | ✅ `/debug-app` |
| `fix-bug.md` | bug fix | `app/src/money.ts` | — |
| `add-validation.md` | validation | `app/src/money.ts` | — |
| `improve-errors.md` | errors | `app/src/money.ts` | — |
| `sanitize-check.md` | security | any file | ✅ `/sanitize-check` |

## Safety

Prompts contain **no real secrets or PII** — only placeholders and synthetic
examples. If a prompt needs sensitive context, sanitize it first with `.claude/commands/sanitize-check.md`.
