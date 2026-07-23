# Prompt cookbook

Reusable, **proven** prompts for this repo's routine — not chat history, not
generic copies from the internet. This is Task A of the WS2 homework.

## How to use

1. Copy `_template.md` → `prompts/<verb-object>.md`.
2. Fill the blocks (Goal / Context / Constraints / Acceptance Criteria / Output Format / Stop).
3. **Run it against a real target** in `app/` and tick "Verified".
4. Promote the most useful ones to commands (`.cursor/commands/` or
   `.claude/commands/`) so the whole team calls them with `/name`.

## Index

| # | Prompt | Category | Target | Dialect | Command? | Verified |
|---|--------|----------|--------|---------|----------|----------|
| 1 | `review-pr.md` | review | `git diff main -- app/src/` | md | ✅ `/review-pr` | ✅ |
| 2 | `add-tests.md` | tests | `app/src/money.ts` | md | ✅ `/add-tests` | ✅ |
| 3 | `test-edge-cases.md` | tests | `app/src/money.ts` | md | — | ✅ |
| 4 | `review-code.md` | review | `app/src/money.ts` | md | — | ✅ |
| 5 | `add-docs.md` | docs | `app/src/money.ts` | md | — | ✅ |
| 6 | `refactor-code.md` | refactor | `app/src/money.ts` | md | — | ✅ |
| 7 | `debug-code.md` | debug | `app/src/money.ts` | md | — | ✅ |
| 8 | `debug-logging.md` | debug | `app/src/money.ts` | md + xml | — | ✅ |
| 9 | `debug-logging.xml` | debug | `app/src/money.ts` | xml | — | ✅ |
| 10 | `optimize-code.md` | optimize | `app/src/money.ts` | md | — | ✅ |
| 11 | `add-types.md` | types | `app/src/money.ts` | md | — | ✅ |
| 12 | `generate-changelog.md` | docs | `app/src/` (diff vs main) | md | — | ✅ |

## Categories covered

- **tests** — `add-tests.md`, `test-edge-cases.md`
- **review** — `review-pr.md`, `review-code.md`
- **docs** — `add-docs.md`, `generate-changelog.md`
- **refactor** — `refactor-code.md`
- **debug** — `debug-code.md`, `debug-logging.md`
- **optimize** — `optimize-code.md`
- **types** — `add-types.md`

## Dual-dialect prompt

`debug-logging` exists in both Markdown (`.md`) and XML (`.xml`) — same prompt,
two dialects. Markdown suits GPT/Copilot; XML suits Claude Code (structured tags
hold constraints more reliably).

## Commands

Two prompts promoted to IDE commands:

```
.claude/commands/review-pr.md   → /review-pr <path>
.claude/commands/add-tests.md   → /add-tests <path>
.cursor/commands/review-pr.md   → @review-pr <path>
.cursor/commands/add-tests.md   → @add-tests <path>
```

Both accept `$ARGUMENTS` (file/directory path) and have `description` in frontmatter.

## Safety

Prompts contain **no real secrets or PII** — only placeholders and synthetic
examples. If a prompt needs sensitive context, mask/synthesize it first
(see `docs/sanitization-checklist.md`).
