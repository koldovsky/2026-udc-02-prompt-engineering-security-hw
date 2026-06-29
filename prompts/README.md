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

| Prompt | Category | Target | Command? |
|--------|----------|--------|----------|
| `review-pr.md` | review | `app/src/money.ts` | — (example provided) |
| `add-tests.md` | tests | `app/src/money.ts`, `app/src/money.test.ts` | ✅ `.claude/commands/add-tests.md` |
| `fix-money-bug.md` | fix | `app/src/money.ts`, `app/src/money.test.ts` | |
| `write-money-docs.md` | docs | `app/README.md`, `app/src/money.ts` | |
| `refactor-money.md` | refactor | `app/src/money.ts` | |
| `debug-failing-test.md` | debug | Vitest failure output | |
| `add-validation.md` | validation | `app/src/money.ts`, `app/src/money.test.ts` | |
| `improve-errors.md` | security/errors | `app/src/money.ts`, `app/src/money.test.ts` | |
| `typecheck-cleanup.md` | typecheck | `app/tsconfig.json`, `app/src/*.ts` | |
| `review-tests.md` | review/tests | `app/src/money.test.ts` | |
| `update-app-readme.md` | docs | `app/README.md` | |

Coverage: **tests, review, docs, refactoring, debug** plus validation,
typecheck, and security-aware error handling. Each cookbook entry includes both
markdown and XML dialects so it can be adapted for Codex, Copilot, ChatGPT, or
Claude Code.

Promoted commands:

- `.claude/commands/add-tests.md` — add focused Vitest edge-case coverage.
- `.claude/commands/review-money.md` — review money helpers before merge.

## Safety

Prompts must contain **no real secrets or PII** — only placeholders and synthetic
examples. If a prompt needs sensitive context, mask/synthesize it first
(see `docs/sanitization-checklist.md`).
