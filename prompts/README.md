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
| `add-tests.md` | tests | `app/src/money.ts` | ✅ `/add-tests` |
| `find-hidden-bugs.md` | debug | `app/src/money.ts` | ✅ `/find-bugs` |
| `implement_new_feature.md` | feature | `app/src/money.ts` | — |
| `refactor_existing_code.md` | refactor | `app/src/money.ts` | — |
| `generate_documentation.md` | docs | `app/src/money.ts` | — |
| `debug.md` | debug | `app/src/money.ts` | — |
| `performance_optimization.md` | perf | `app/src/money.ts` | — |
| `architecture_review.md` | review | `app/src/money.ts` | — |
| `break_down_feature.md` | planning | generic | ✅ `/break-down-feature` |
| `validate-discount-percent.md` | feature | `app/src/money.ts` | — |
| `fix-splitevenly-negative.md` | debug | `app/src/money.ts` | — |
| `security-audit.md` | security | `app/src/money.ts` | ✅ `/security-audit` |
| `sanitize-before-commit.md` | security | staged changes | — |

Cover at least: **tests, review, docs, refactoring, debug**. Include **one**
prompt in both dialects (markdown + XML). See `docs/walkthrough.md` for the full
checklist.

## Safety

Prompts must contain **no real secrets or PII** — only placeholders and synthetic
examples. If a prompt needs sensitive context, mask/synthesize it first
(see `docs/sanitization-checklist.md`).
