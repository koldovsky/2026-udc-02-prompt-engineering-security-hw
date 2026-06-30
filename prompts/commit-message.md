---
name: commit-message
description: Write a Conventional-Commits message from the staged diff — accurate, scoped, no secrets. Use right before committing.
version: 1
---

# Commit message

## Baseline (weak) — what you started from

```
write a commit message
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Engineer writing a precise commit message for this repo.
Goal: Summarize the STAGED diff ($ARGUMENTS = `git diff --cached`) as a commit.
Context:
- Conventional Commits: type(scope): subject. Types: feat, fix, test, docs, refactor, chore.
Constraints:
- Describe only what the diff actually changes; don't claim untouched behavior.
- Subject ≤ 72 chars, imperative mood. Body: what + why, not how.
- NEVER include secrets, tokens, keys, or PII in the message.
Acceptance criteria:
- One subject line + optional body bullets that match the diff.
- Scope reflects the touched area (e.g. fix(money): …).
Output:
- The commit message only, in a code block.
Stop rules:
- If the diff mixes unrelated changes, suggest splitting into separate commits.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
Write a Conventional-Commits message for the staged diff. Describe only what the
diff changes. Subject ≤ 72 chars, imperative. Never include secrets/PII.
</instructions>

<context>
Staged diff: $ARGUMENTS (`git diff --cached`). Types: feat|fix|test|docs|refactor|chore.
</context>

<output_format>
A single fenced commit message: `type(scope): subject` + optional body bullets.
</output_format>

<stop_rules>
If unrelated changes are mixed, recommend splitting into separate commits.
</stop_rules>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | reads the diff inline |
| XML | Claude Code | enforces the "describe only the diff" rule |

## Verified

- [ ] Run against a staged diff in this repo (`git add -p` then invoke).
