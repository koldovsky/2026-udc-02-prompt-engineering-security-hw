# Prompt cookbook

Reusable, **proven** prompts for this repo's routine — not chat history, not
generic copies from the internet. This is Task A of the WS2 homework.

## How to use

1. Create `prompts/<verb-object>.md` with the 6 blocks: Role / Goal / Context / Constraints / Acceptance / Output / Stop.
2. **Run it against a real target** in `app/` and tick "Verified".
3. Promote the most useful ones to commands (`.cursor/commands/` or
   `.claude/commands/`) so the whole team calls them with `/name`.

## Index

| Prompt | Category | Target | Verified |
|--------|----------|--------|----------|
| `add-tests.md` | tests | `app/src/money.ts` | ✅ 16/16 vitest pass |
| `enrich-jsdoc.md` | docs | `app/src/money.ts` | ✅ @param/@returns/@throws/@example added |
| `explain-module.md` | docs | `app/src/money.ts` | ✅ 300-word onboarding explanation |
| `generate-changelog.md` | docs | `git diff main...HEAD` | ✅ valid Keep-a-Changelog entry |
| `fix-remainder-bug.md` | debug | `app/src/money.ts` | ✅ vitest 15 fail → 16/16 pass |
| `add-input-guards.md` | refactor | `app/src/money.ts` | ✅ guards + tests added |
| `extract-cents-type.md` | refactor | `app/src/money.ts` | ✅ branded Cents type, tsc clean |
| `diagnose-error.md` | debug | stack trace | ✅ root cause at money.ts:23 |
| `security-audit.md` | security | `app/src/money.ts` | ✅ 3 findings catalogued |
| `trace-test-failure.md` | debug | vitest output + `app/src/money.ts` | ✅ traced remainder bug to `money.ts:37` |

All 10 prompts ship both a **markdown** (GPT/Copilot) and **XML** (Claude) dialect.

## Safety

Prompts must contain **no real secrets or PII** — only placeholders and synthetic
examples. If a prompt needs sensitive context, mask/synthesize it first
(see `docs/sanitization-checklist.md`).
