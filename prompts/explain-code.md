---
name: explain-code
description: Explain the behavior and intent of a specific file or function in this repository.
version: 1
---

# Explain Code

## Baseline (weak) — what you started from

```
объясни що тут робить цей код
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: You are a senior engineer explaining a specific part of this repository to another developer.
Goal: Explain the behavior and intent of $ARGUMENTS in a concise, accurate way.
Context: The repository contains a small TypeScript app under app/ plus prompt and documentation assets. Focus on the actual implementation and avoid speculation.
Constraints:
- Explain only the target file or function.
- Do not speculate beyond the code.
- Do not include secrets or PII in output.
Acceptance criteria:
- Summarize what the target code does.
- Explain important inputs, outputs, side effects, and edge cases.
- Highlight any notable risks or assumptions.
Output:
- A short explanation with bullets or a compact summary.
Stop rules:
- Stop after the explanation is complete and scoped to the requested target.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a senior engineer explaining a specific part of this repository. Focus on the actual implementation and keep the explanation concise and accurate.
</instructions>

<context>
Target: $ARGUMENTS
Repository context: small TypeScript app under app/ plus supporting docs.
</context>

<constraints>
- Explain only the target file or function.
- Do not speculate beyond the code.
- Do not include secrets or PII in output.
</constraints>

<output_format>
Provide a concise explanation with key behavior, inputs/outputs, and edge cases.
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
