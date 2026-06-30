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

| Prompt                                     | Category | Target | Command |
|--------------------------------------------|----------|--------|---------|
| [`review-pr.md`](review-pr.md)             | review | any file | `/review-pr` |
| [`add-tests.md`](add-tests.md)             | tests | `src/money.ts` | `/add-tests` |
| [`write-docs.md`](write-docs.md)           | docs | `src/money.ts` | `/write-docs` |
| [`refactor-code.md`](refactor-code.md)     | refactor | `src/money.ts` | `/refactor-code` |
| [`debug-issue.md`](debug-issue.md)         | debug | log / stack trace via `$ARGUMENTS` | `/debug-issue` |
| [`add-logs.md`](add-logs.md)               | observability | `src/money.ts` | `/add-logs` |
| [`explain-code.md`](explain-code.md)       | onboarding | any file via `$ARGUMENTS` | `/explain-code` |
| [`find-duplicates.md`](find-duplicates.md) | quality | `src/money.ts` | `/find-duplicates` |
| [`perf-check.md`](perf-check.md)           | performance | `src/money.ts` | `/perf-check` |
| [`audit-secrets.md`](audit-secrets.md)     | security | `src/money.ts` | `/audit-secrets` |

**Total: 10 prompts.** Covers: tests, review, docs, refactor, debug, observability,
onboarding, quality, performance, security.

One prompt in both dialects (markdown + XML): `review-pr.md`.

## Safety

Prompts must contain **no real secrets or PII** — only placeholders and synthetic
examples. If a prompt needs sensitive context, mask/synthesize it first
(see `docs/sanitization-checklist.md`).
