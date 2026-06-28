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

| Prompt | Category | Target | Dialects |
|--------|----------|--------|----------|
| `review-pr.md` | review | `app/src/money.ts` | markdown + XML |
| `add-tests.md` | tests | `app/src/money.ts` | markdown + XML |
| `write-docs.md` | docs | `app/src/money.ts` | markdown + XML |
| `refactor-function.md` | refactor | `app/src/money.ts` | markdown + XML |
| `debug-bug.md` | debug | `app/src/money.ts` | markdown + XML |
| `fix-bug.md` | bug fix | `app/src/money.ts` | markdown + XML |
| `explain-code.md` | explain | `app/src/money.ts` | markdown + XML |
| `add-types.md` | types | `app/src/money.ts` | markdown + XML |
| `generate-changelog.md` | changelog | `app/src/money.ts` | markdown + XML |
| `security-audit.md` | security | `app/src/money.ts` | markdown + XML |
| `add-input-validation.md` | validation | `app/src/money.ts` | markdown + XML |
| `generate-pr-description.md` | PR workflow | git diff | markdown + XML |

All prompts include markdown (GPT) + XML (Claude) dialects. Verified checkboxes in each file track real runs against `app/`.

## Safety

Prompts must contain **no real secrets or PII** — only placeholders and synthetic
examples. If a prompt needs sensitive context, mask/synthesize it first
(see `docs/sanitization-checklist.md`).
