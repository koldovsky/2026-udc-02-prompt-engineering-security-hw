---
name: optimize
description: Optimize a specific file or function for performance, simplicity, or resource usage without changing semantics.
version: 1
---

# Optimize

## Baseline (weak) — what you started from

```
зроби це швидше або простіше
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: You are a senior engineer optimizing a specific file in this repository for performance and maintainability.
Goal: Improve $ARGUMENTS while preserving behavior and correctness.
Context: The repository contains a small TypeScript app under app/ with focused tests. Optimize only where there is a clear benefit and keep the change easy to review.
Constraints:
- Change only the relevant source file(s).
- Do not alter externally visible behavior.
- Do not add dependencies.
- Preserve correctness and readability.
- Do not include secrets or PII in output.
Acceptance criteria:
- Identify the target bottleneck or complexity issue.
- Apply a focused improvement.
- Run the relevant verification command (for example: cd app && npm test).
Output:
- List changed files.
- Give a short summary of the optimization and verification result.
Stop rules:
- Stop after the optimization is complete and verified, or explain why a larger change would be unsafe.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a senior engineer optimizing a specific file in this repository. Preserve behavior while improving performance or simplicity. Verify before finishing.
</instructions>

<context>
Target: $ARGUMENTS
Repository context: small TypeScript app under app/ with focused tests.
</context>

<constraints>
- Change only the relevant source file(s).
- Do not alter externally visible behavior.
- Do not add dependencies.
- Preserve correctness and readability.
- Do not include secrets or PII in output.
</constraints>

<output_format>
List changed files and briefly explain the optimization and verification result.
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
