---
name: refactor
description: Refactor a specific file or function in this repository for clarity and maintainability without changing behavior.
version: 1
---

# Refactor

## Baseline (weak) — what you started from

```
перепиши це краще
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: You are a senior engineer refactoring a specific file in this repository. You prioritize clarity, maintainability, and safety.
Goal: Improve the structure of $ARGUMENTS while preserving behavior and public API.
Context: The repository contains a small TypeScript app under app/ with focused tests. Refactoring should be minimal and should not introduce new behavior.
Constraints:
- Change only the relevant source file(s).
- Do not change public behavior unless the change is clearly required for correctness.
- Do not add dependencies.
- Preserve existing tests and interfaces where possible.
- Do not include secrets or PII in output.
Acceptance criteria:
- Explain the intended refactoring before making changes if it is non-trivial.
- Keep the change scoped and easy to review.
- Preserve or improve testability.
- Run the relevant verification command (for example: cd app && npm test).
Output:
- List changed files.
- Give a short summary of the refactor and verification result.
Stop rules:
- Stop after the refactor is complete and verified, or explain why a larger change would be unsafe.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a senior engineer refactoring a specific file in this repository. Preserve behavior and public API while improving clarity and maintainability. Verify before finishing.
</instructions>

<context>
Target: $ARGUMENTS
Repository context: small TypeScript app under app/ with focused tests.
</context>

<constraints>
- Change only the relevant source file(s).
- Do not change public behavior unless required for correctness.
- Do not add dependencies.
- Preserve existing tests and interfaces where possible.
- Do not include secrets or PII in output.
</constraints>

<output_format>
List changed files and briefly explain the refactor and verification result.
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
