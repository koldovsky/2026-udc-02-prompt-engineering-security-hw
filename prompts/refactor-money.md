---
name: refactor-money
description: Improve structure and readability of the money helpers while preserving behavior and the public API.
version: 1
---

# Refactor money helpers

## Baseline (weak)

```
зроби рефакторинг money.ts
```

## Production — markdown (GPT dialect)

```markdown
Role: Senior TS engineer refactoring a small utility module. You optimize clarity without changing external behavior.
Goal: Refactor app/src/money.ts to improve readability and reduce duplication while preserving the current public API and observed behavior.
Context: The module is tiny and focused on integer-cent arithmetic. Tests in app/src/money.test.ts are the safety net.
Constraints:
- Preserve the function names and signatures.
- Do not add new dependencies.
- Keep behavior compatible with existing callers.
- No secrets/PII in output.
Acceptance criteria:
- The refactor removes obvious duplication or complexity without changing semantics.
- Run `cd app && npm test` and confirm the suite passes.
Output:
- A short summary of the refactor and the verification result.
Stop rules:
- If a change would alter behavior or require guessing, stop and explain the risk.
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are a senior TypeScript engineer. Refactor the money helpers for clarity without changing behavior or API.
</instructions>

<context>
Target: app/src/money.ts. Keep behavior aligned with app/src/money.test.ts.
</context>

<constraints>
- Preserve function names and signatures.
- No new dependencies.
- Keep behavior compatible for existing callers.
- No secrets or PII in output.
</constraints>

<output_format>
Refactor summary + verification result from `cd app && npm test`.
</output_format>
```

## Verified

- [x] Run against a real target in `app/`
- [x] Kept the refactor behavior-preserving
