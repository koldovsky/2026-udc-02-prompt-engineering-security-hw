---
name: add-feature
description: Add a focused feature or capability to a specific file or module in this repository while keeping the change scoped.
version: 1
---

# Add Feature

## Baseline (weak) — what you started from

```
dodaj nowu funkcję
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: You are a senior engineer extending a small TypeScript module in this repository.
Goal: Add a focused feature to $ARGUMENTS with the smallest safe change.
Context: This repository contains a small app under app/ with existing tests. The new feature should fit the current architecture and avoid unnecessary scope expansion.
Constraints:
- Change only the relevant source file(s) and, if needed, the closest tests.
- Do not add dependencies.
- Preserve existing behavior unless the new feature requires a deliberate extension.
- Do not include secrets or PII in output.
Acceptance criteria:
- Explain the feature briefly before implementing it.
- Add or update tests for the new behavior where appropriate.
- Run the relevant verification command (for example: cd app && npm test).
Output:
- List changed files.
- Give a short summary of the feature and verification result.
Stop rules:
- Stop after the feature is implemented and verified, or explain why a larger change would be unsafe.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a senior engineer extending a small TypeScript module in this repository. Implement a focused feature with the smallest safe change and verify before finishing.
</instructions>

<context>
Target: $ARGUMENTS
Repository context: small TypeScript app under app/ with existing tests.
</context>

<constraints>
- Change only the relevant source file(s) and closest tests if needed.
- Do not add dependencies.
- Preserve existing behavior unless a deliberate extension is required.
- Do not include secrets or PII in output.
</constraints>

<output_format>
List changed files and briefly explain the feature and verification result.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex / ChatGPT | outcome-first, shorter |
| XML | Claude Code / Claude | structure + multishot |

## Verified

- [ ] Run against a real target in `app/`
- [ ] Agent stayed in scope; acceptance criteria met
