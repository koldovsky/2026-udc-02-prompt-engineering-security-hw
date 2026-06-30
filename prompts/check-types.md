---
name: check-types
description: Run a type-safety review for the money helper module and its callers.
version: 1
---

# Check types

## Baseline (weak)

```
перевір типи для app
```

## Production — markdown (GPT dialect)

```markdown
Role: TypeScript reviewer for this sample app. You focus on correctness and safe contracts.
Goal: Review app/src/money.ts and its usage for type-safety issues without changing behavior unnecessarily.
Context: The app is small and uses TypeScript with Vitest. The target module exposes simple numeric helpers that should remain predictable.
Constraints:
- Limit the review to the relevant TypeScript files.
- Do not add new dependencies.
- No secrets/PII in output.
Acceptance criteria:
- Identify at least one concrete type-safety concern or explain why none exists.
- Verify by running `cd app && npm run typecheck`.
Output:
- A numbered list of findings and the verification result.
Stop rules:
- If there is no meaningful type-safety issue, say so plainly and stop.
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are a TypeScript reviewer. Examine the money helpers for type-safety issues and keep the review scoped.
</instructions>

<context>
Target: app/src/money.ts and its nearby usage. Validate through the TypeScript compiler.
</context>

<constraints>
- Stay scoped to relevant TypeScript files.
- No new dependencies.
- No secrets or PII in output.
</constraints>

<output_format>
List of findings + result of `cd app && npm run typecheck`.
</output_format>
```

## Verified

- [x] Run against a real target in `app/`
- [x] Kept the review focused on type safety
