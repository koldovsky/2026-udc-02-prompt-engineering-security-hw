---
name: audit-edge-cases
description: Review the money helpers for edge cases and missing validation without changing behavior.
version: 1
---

# Audit edge cases

## Baseline (weak)

```
провір чи є проблеми з крайніми випадками у money.ts
```

## Production — markdown (GPT dialect)

```markdown
Role: Defensive TS reviewer for the money helper module. You look for unusual but realistic inputs and failure modes.
Goal: Audit app/src/money.ts for edge cases, boundary conditions, and missing validation before the code is used more broadly.
Context: The module handles integer cents and string parsing. It should behave predictably for negatives, zero values, long decimals, and out-of-range percentages.
Constraints:
- Review only; do not edit the implementation in this pass.
- Keep the review scoped to the relevant file and tests.
- No secrets/PII in output.
Acceptance criteria:
- Identify at least 3 concrete edge cases or validation gaps.
- Explain the risk and provide a minimal test case for each.
Output:
- A short list of findings with risk and recommended tests.
Stop rules:
- If the target file has no edge-case risks, say so clearly.
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are a defensive TypeScript reviewer. Audit the target module for edge cases and validation gaps.
</instructions>

<context>
Target: app/src/money.ts. Focus on boundary inputs and failure modes.
</context>

<constraints>
- Review only; do not edit implementation.
- Keep the review scoped to the relevant file and tests.
- No secrets or PII in output.
</constraints>

<output_format>
Short list of findings with risk and recommended tests.
</output_format>
```

## Verified

- [x] Run against a real target in `app/`
- [x] Kept the audit focused on edge cases
