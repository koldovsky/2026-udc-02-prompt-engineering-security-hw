---
name: write-commit
description: Generate a Conventional Commits message from the staged diff. Read-only on git; no fabricated changes.
version: 1
---

# Write commit message

Produces a commit message from what is **actually staged**. Run `git add` first,
then point this at the staged diff.

## Baseline (weak) — what you started from

```
напиши коміт
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Engineer in this repo writing a Conventional Commits message.
Goal: Summarize the staged changes accurately.
Context: Use ONLY `git diff --staged` ($ARGUMENTS may name a scope). Node 22 TS repo.
Constraints:
- Describe only what the diff shows — invent nothing, claim no tests you didn't see.
- Subject: `type(scope): summary`, imperative, ≤72 chars. Body explains why, wraps at 72.
- No secrets/PII in the message.
Acceptance criteria:
- Subject ≤72 chars, valid Conventional Commits type (feat/fix/docs/refactor/test/chore).
- Body lists the concrete changes; nothing unstaged is mentioned.
Output:
- The commit message in a code block, ready to paste.
Stop rules:
- If nothing is staged, say so and stop.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
Write a Conventional Commits message from the staged diff only. Describe only
what the diff shows — no invented changes, no unverified test claims.
</instructions>

<context>
Source: `git diff --staged` (scope hint: $ARGUMENTS). Node 22 TS repo.
</context>

<constraints>
- Subject `type(scope): summary`, imperative, ≤72 chars. No secrets/PII.
- If nothing is staged, stop and say so.
</constraints>

<output_format>
A single fenced commit message ready to paste.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | concise |
| XML | Claude Code | "diff only, invent nothing" holds |

## Verified

- [ ] Authored; ready to run against a real staged diff in this repo