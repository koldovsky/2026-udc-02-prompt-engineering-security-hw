---
name: add-usage-examples
description: Add small, realistic usage examples for a target module without changing behavior.
version: 1
---

# Add usage examples (small and concrete)

## Baseline (weak) — what you started from

```
show how this works
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior TypeScript maintainer writing practical examples for teammates.
Goal: Add concise, realistic usage examples for $ARGUMENTS so another engineer can understand how to call it correctly.
Context: The main sample target is `app/src/money.ts`, which works with integer cents and exposes formatting, parsing, splitting, and discount helpers.
Constraints:
- Prefer README snippets, doc comments, or nearby documentation.
- Do not change runtime behavior or add demo dependencies.
- Examples must match the actual current API.
- No secrets or PII in output.
Acceptance criteria:
- Add at least 3 examples covering distinct functions or use cases.
- Use copyable examples with expected outputs where useful.
- Keep examples short and repo-specific.
Output:
- Changed files.
- Example scenarios added.
Stop rules:
- If there is no suitable documentation surface in scope, stop and suggest the smallest one.
```

## Production — XML (Anthropic / Claude dialect)

```xml
instructions:
  - Add concise, realistic usage examples for $ARGUMENTS without changing behavior.
context:
  - Primary sample target: `app/src/money.ts` in a tiny TypeScript app.
constraints:
  - Docs/examples only.
  - Examples must match the current API exactly.
  - No new dependencies, secrets, or PII.
output_format:
  - Changed files
  - Example scenarios added
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex / ChatGPT | concise examples with expected outputs |
| XML | Claude Code / Claude | keeps examples-only scope tight |

## Verified

- [ ] Run against a real target in `app/`
- [x] Tied to `app/src/money.ts`


