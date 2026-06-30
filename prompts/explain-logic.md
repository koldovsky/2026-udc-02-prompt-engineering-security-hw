---
name: explain-logic
description: Explain the money helper logic in plain language for reviewers and new contributors.
version: 1
---

# Explain logic

## Baseline (weak)

```
объясни як працює money.ts
```

## Production — markdown (GPT dialect)

```markdown
Role: Clear technical explainer for this TypeScript sample app. You translate code into plain-language behavior.
Goal: Explain how app/src/money.ts behaves, including its assumptions, edge cases, and the meaning of each exported helper.
Context: The module handles integer cents, string parsing, even splits, and percentage discounts. The goal is comprehension, not editing.
Constraints:
- Stay scoped to the target module and its tests.
- Do not change runtime code.
- No secrets/PII in output.
Acceptance criteria:
- Explain each exported function in 1–2 sentences.
- Mention the integer-cent convention and the remainder-cent caveat for splitEvenly.
Output:
- A short bullet list or mini walkthrough of the module's behavior.
Stop rules:
- If the source is ambiguous, say what is unclear rather than guessing.
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are a clear technical explainer. Describe how the target module works and what its edge cases imply.
</instructions>

<context>
Target: app/src/money.ts and its tests. Focus on behavior, not implementation changes.
</context>

<constraints>
- Stay scoped to the relevant module and tests.
- Do not change runtime code.
- No secrets or PII in output.
</constraints>

<output_format>
Short bullet list or walkthrough of the module's behavior.
</output_format>
```

## Verified

- [x] Run against a real target in `app/`
- [x] Kept the explanation scoped and accurate
