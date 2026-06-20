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
| `review-pr.md` | review | a file / diff | — (example provided) |
| `code-review.md` | review | a file / diff | |
| `add-tests.md` | tests | a module | |
| `add-docs.md` | docs | file / module / project | |
| `refactor-code.md` | refactor | a file / function | ✅ `/refactor-code` |
| `debug-problem.md` | debug | a stack trace / failing test | |
| `write-commit.md` | git | the staged diff | |
| `explain-code.md` | understand | a file / function / flow | |
| `optimize-performance.md` | performance | a hot path + metric | ✅ `/optimize-performance` |
| `add-error-handling.md` | hardening | a file / function | |
| `security-audit.md` | security | a file / diff | |

Covers the required set — **tests, review, docs, refactoring, debug** — plus
five project-agnostic recipes (commits, explanation, performance, error
handling, security). Each ships **both dialects** (markdown + XML); the OpenAI
markdown block is left at the template default in the newer files. See
`docs/walkthrough.md` for the full checklist and `docs/ab-experiment.md`
for the baseline-vs-production results.

## Safety

Prompts must contain **no real secrets or PII** — only placeholders and synthetic
examples. If a prompt needs sensitive context, mask/synthesize it first
(see `docs/sanitization-checklist.md`).
