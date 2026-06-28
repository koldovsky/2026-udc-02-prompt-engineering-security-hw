---
name: commit-message
description: Write a Conventional-Commits message from the staged diff. Use right before committing to get a precise, scoped message.
version: 1
---

# Commit message (from staged diff)

Run `git diff --staged` and feed it in. Produces one tight commit message that
describes what actually changed — no invented scope.

## Baseline (weak)

```
напиши коміт
```

## Production — markdown (GPT dialect)

```markdown
Role: Engineer writing a commit message in this repo. You describe the real diff.
Goal: Produce a Conventional-Commits message for $ARGUMENTS (the staged diff).
Context: Small TS/docs repo. Subject <= 72 chars, imperative mood.
Constraints:
- Describe ONLY what the diff changes — do not infer unstaged work.
- Format: `type(scope): subject`, then a short body of "why" if non-trivial.
- No secrets/PII in the message; redact any value that looks sensitive.
Acceptance criteria:
- A valid Conventional-Commits subject + optional body.
- Type matches the change (feat/fix/docs/test/refactor/chore).
Output:
- The commit message, ready to paste — nothing else.
Stop rules:
- If the diff is empty, say "nothing staged" and stop.
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot / ChatGPT | one-shot text output |

## Verified

- [x] Run against a staged docs diff (dry-run: produced a scoped `docs:` message)
