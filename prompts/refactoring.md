---
name: code-refactoring
description: Refactoring TypeScript to slash cognitive load, boost performance, and make reading code feel like poetry.
version: 2
---

# Refactor Code

## Baseline (weak) — what you started from

clean up this code and make it better

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Principal Frontend Engineer and Clean Code Architect.
Goal: Refactor TypeScript to improve readability, performance, maintainability. No behavior changes.
Context: app/src/**/*.ts
Constraints:
- Modify only .ts files. Do not change .md, .json, configs.
- Follow SOLID and DRY principles.
- No breaking changes to public APIs.
- No secrets/PII in output.

Acceptance criteria:
- Reduced cognitive complexity and nested blocks.
- Extracted reusable logic into pure, testable helpers.
- Corrected inefficient operations.
Output:
- Clean, refactored code passing identical tests.
Stop rules:
- If file is empty or already optimal.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
  <who_acts>Principal Frontend Engineer and Clean Code Architect.</who_acts>
  <what_to_do>
    Identify technical debt and code smells. Refactor to improve modularity, simplify control flows, apply modern ESNext patterns.
  </what_to_do>
  <how_to_verify_before_finishing>Types remain strict. Public interfaces preserved. Original business logic unchanged.</how_to_verify_before_finishing>
</instructions>

<context>
  <relevant_files_facts_only>app/src/**/*.ts files requiring optimization.</relevant_files_facts_only>
</context>

<constraints>
  - Modify ONLY .ts files.
  - No breaking changes.
  - Stop if file is already optimized.
</constraints>

<output_format>
  Return refactored code + bulleted list of architectural improvements.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex / ChatGPT | outcome-first, shorter |
| XML | Claude Code / Claude | structure + multishot |