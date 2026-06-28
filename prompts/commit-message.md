---
name: commit-message
description: Write a Conventional Commits message from a staged diff. Use before committing.
version: 1
---

# Commit message

Turns a staged diff into a clean Conventional Commits message — no fluff, no
invented changes.

## Baseline (weak)

```
напиши коміт
```

## Production — markdown (GPT dialect)

```markdown
Role: Engineer in this repo writing commit history that future devs can read.
Goal: Write a Conventional Commits message for the changes in $ARGUMENTS
  (default: the currently staged diff).
Context: Use `git diff --staged` as the single source of truth.
Constraints:
- Describe ONLY what the diff changes; do not invent or speculate.
- Format: `type(scope): subject` (<=72 chars) + a short body of bullet points.
- No secrets/PII in the message (no keys, tokens, file dumps).
Acceptance criteria:
- type is one of feat/fix/docs/refactor/test/chore and matches the diff.
- Body explains the "why" in 1–3 bullets.
Output:
- The commit message in a code block, ready to paste.
Stop rules:
- If nothing is staged, STOP and say so.
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot / ChatGPT | outcome-first, short |

## Verified

- [x] Run against a staged change in `app/`
- [x] Message matched the diff; no invented changes
