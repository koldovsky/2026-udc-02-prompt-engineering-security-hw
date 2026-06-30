---
name: explain-code
description: Generate a plain-language walkthrough of a TS module for onboarding. Read-only — no code changes.
version: 1
---

# Explain code

Point it at `app/src/money.ts` and it should produce a concise walkthrough
a new team member can read to understand the module without reading source.

## Baseline (weak)

```text
explain money.ts
```

## Production — markdown (GPT dialect)

```markdown
Role: Senior TS engineer writing onboarding documentation (Node 22, vitest).
Goal: Generate a plain-language walkthrough of $ARGUMENTS so a new team member understands the module without reading source code.
Context: Integer-cent money helpers. Tests in src/*.test.ts. Amounts are integer cents to avoid floating-point drift.
Constraints:
- Read-only — do NOT change any files.
- One section per exported function: purpose, parameters, return value, edge cases, how it connects to other functions in the module.
- Include a data-flow summary showing how the functions compose (e.g. parseAmount → splitEvenly → formatCents).
- Keep total output under 500 words.
- No secrets/PII in output.
Acceptance criteria:
- Every exported function has its own section.
- Edge cases and gotchas are called out (e.g. remainder cents, unvalidated percent).
- A data-flow or composition summary is included.
- Output is ≤500 words.
Output:
- A markdown walkthrough document, ready to share or paste into a wiki.
Stop rules:
- If the file has no exported functions, stop and say so.
- Do NOT suggest code changes — this is explanation only.
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are a senior TS engineer writing onboarding docs. Generate a plain-language
walkthrough of the target module. Do not change any files — read-only.
Keep output under 500 words.
</instructions>

<context>
Target: $ARGUMENTS (integer-cent money helpers). Tests in src/*.test.ts.
Amounts are integer cents to avoid floating-point drift.
</context>

<constraints>
- One section per export: purpose, params, return, edge cases, connections to other functions.
- Include a data-flow summary showing how functions compose.
- ≤500 words total. No code changes. No secrets/PII.
</constraints>

<output_format>
Markdown walkthrough with per-function sections and a data-flow summary.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | word limit + acceptance criteria keep output focused |
| XML | Claude Code | constraints enforce read-only, no accidental edits |

## Verified

- [ ] Run against `app/src/money.ts`
- [ ] Every export explained; data-flow summary present; ≤500 words
