---
name: commit-message
description: Write a Conventional Commit message from a staged diff — accurate, scoped, no fluff. Use before committing.
version: 1
---

# Commit message (Conventional Commits)

Review-adjacent prompt for the cookbook. Turns a staged diff into a precise
Conventional Commit message.

## Baseline (weak)

```
напиши коміт
```

## Production — markdown (GPT dialect)

```markdown
Role: Engineer in this repo writing a Conventional Commit for a staged diff.
Goal: Produce one commit message that accurately describes $ARGUMENTS (the diff).
Context: I will paste `git diff --staged` below. Format: type(scope): subject.
Constraints:
- Use a real type (feat, fix, test, docs, refactor, chore) matching the diff.
- Subject ≤ 72 chars, imperative mood; body explains *why*, not line-by-line.
- Do NOT invent changes not present in the diff. No secrets/PII in the message.
Acceptance criteria:
- A single message: header + optional body + optional footer (BREAKING CHANGE).
- Type/scope match the actual files changed.
Output:
- The commit message in a code block, nothing else.
Stop rules:
- If the diff mixes unrelated changes, suggest splitting into separate commits.

--- paste `git diff --staged` here ---
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | constraints keep it from narrating the diff |

## Verified

- [x] Run against the real staged `money.ts` diff (`30+/6-`); evidence: `prompts/_runs.md`
- [x] Produced `fix(money): ...` with a why-focused body; no invented changes



