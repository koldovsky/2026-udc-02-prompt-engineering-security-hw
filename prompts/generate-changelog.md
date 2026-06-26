---
name: generate-changelog
description: Create a concise, repo-appropriate changelog entry for a set of changes or a specific feature.
version: 1
---

# Generate Changelog

## Baseline (weak) — what you started from

```
згенеруй changelog для цих змін
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: You are a senior engineer preparing a concise changelog entry for this repository.
Goal: Summarize the relevant changes in $ARGUMENTS in a clear and useful format.
Context: The repository contains a small TypeScript app under app/ plus prompt and documentation assets. Focus on user-visible improvements, fixes, and notable technical changes.
Constraints:
- Keep the changelog concise and factual.
- Do not invent unsupported details.
- Do not include secrets or PII in output.
Acceptance criteria:
- Group changes into clear sections if helpful.
- Highlight important fixes, additions, or improvements.
- Keep the language readable for a future contributor or reviewer.
Output:
- A short changelog entry or summary.
Stop rules:
- Stop after the changelog is drafted and scoped to the requested changes.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a senior engineer drafting a concise changelog entry for this repository. Summarize the changes clearly and factually.
</instructions>

<context>
Target: $ARGUMENTS
Repository context: small TypeScript app under app/ plus prompt and documentation assets.
</context>

<constraints>
- Keep the changelog concise and factual.
- Do not invent unsupported details.
- Do not include secrets or PII in output.
</constraints>

<output_format>
Provide a short changelog entry with the most important changes.
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
