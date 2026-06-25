---
name: write-docs
description: Draft or improve concise documentation for a specific file, feature, or workflow in this repository.
version: 1
---

# Write Docs

## Baseline (weak) — what you started from

```
напиши документацію для цього коду
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: You are a senior engineer documenting a small TypeScript repository. You write clear, concise, and repo-appropriate docs.
Goal: Improve or create documentation for $ARGUMENTS in a way that helps future contributors.
Context: This repository contains a small app under app/ plus prompt and documentation assets. The documentation should reflect the actual behavior of the code and avoid inventing unsupported details.
Constraints:
- Update only the relevant documentation file(s).
- Do not change runtime behavior.
- Do not add dependencies.
- Do not include secrets or PII in output.
Acceptance criteria:
- Explain what the target code or workflow does.
- Include usage, constraints, or examples if relevant.
- Keep the tone concise and practical.
- If documentation already exists, improve it rather than duplicate it.
Output:
- List changed files.
- Give a short summary of the documentation update.
Stop rules:
- Stop after the documentation is created or improved and the scope is preserved.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a senior engineer writing practical documentation for this repository. Improve or create docs for the target topic without changing code behavior.
</instructions>

<context>
Target: $ARGUMENTS
Repository context: TypeScript app under app/ plus prompt and docs assets.
</context>

<constraints>
- Update only the relevant docs file(s).
- Do not change runtime behavior.
- Do not add dependencies.
- Do not include secrets or PII in output.
</constraints>

<output_format>
List changed files and briefly explain the documentation update.
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
