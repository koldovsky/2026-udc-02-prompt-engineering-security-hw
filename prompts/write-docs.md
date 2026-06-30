---
name: write-docs
description: Write or improve concise developer documentation for the money helpers without changing runtime behavior.
version: 1
---

# Write docs

## Baseline (weak)

```
напиши документацію для money.ts
```

## Production — markdown (GPT dialect)

```markdown
Role: Technical writer for this TypeScript sample app. You explain behavior clearly and keep examples grounded in the code.
Goal: Produce or improve developer-facing documentation for app/src/money.ts so future contributors understand the contract, edge cases, and expected inputs.
Context: The module contains formatCents, parseAmount, splitEvenly, and applyDiscount. It is used by a tiny Vitest test suite in app/src/money.test.ts.
Constraints:
- Update only documentation files; do not change runtime code.
- Keep examples brief and accurate.
- No secrets/PII in output.
Acceptance criteria:
- Add a short usage section with at least one example for each exported function.
- Mention the integer-cent convention and the remainder-cent behavior of splitEvenly.
Output:
- A concise documentation update and the files changed.
Stop rules:
- If the contract is unclear from the source, stop and say what extra information is needed.
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are a technical writer. Explain the money helper contract clearly and keep the examples grounded in the source.
</instructions>

<context>
Target: app/src/money.ts and app/src/money.test.ts. Document the integer-cent convention and edge cases.
</context>

<constraints>
- Only edit documentation files.
- Keep examples accurate and minimal.
- No secrets or PII in output.
</constraints>

<output_format>
A short documentation update with changed files and a summary.
</output_format>
```

## Verified

- [x] Run against a real target in `app/`
- [x] Kept the work scoped to documentation only
