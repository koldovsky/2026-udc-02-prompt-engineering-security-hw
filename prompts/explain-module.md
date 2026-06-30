---
name: explain-module
description: Generate a concise developer-onboarding explanation of a TS module — what it does, why, and gotchas.
version: 1
---

# Explain module for onboarding

## Baseline (weak)

```
explain what money.ts does
```

## Production — markdown (GPT dialect)

```markdown
Role: You are a senior engineer writing an onboarding guide for a new team member.
Goal: Explain $ARGUMENTS — its purpose, design decisions, and known limitations — in plain language a junior developer can follow.
Context: TypeScript module in a financial application. Reader knows TypeScript basics but is new to this codebase.
Constraints:
- Max 300 words total.
- Cover: why integer cents (not floats), what each export does in one sentence, known bugs or limitations, how to extend safely.
- No secrets or PII.
- Do not modify any file — explanation only.
Acceptance criteria:
- A junior dev reading the output can use all four exports correctly without reading the source code.
Output:
- Structured explanation: Overview → Exports (table) → Gotchas → How to extend.
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are a senior engineer writing a 300-word onboarding explanation of a module for a new team member.
Cover: design rationale, each export in one sentence, known limitations, and how to extend safely.
Read the target file — do not modify it.
</instructions>

<context>
Target: $ARGUMENTS — TypeScript module in a financial app.
Reader: junior developer, knows TypeScript, first day on this codebase.
</context>

<constraints>
- Max 300 words.
- No code changes — explanation only.
- No secrets or PII.
</constraints>

<output_format>
## Overview
## Exports (one-sentence each, table format)
## Gotchas
## How to extend
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | GPT / Copilot Chat | natural prose suits GPT's conversational style |
| XML | Claude Code | structured sections stay consistent across runs |

## Verified

- [x] Run against `app/src/money.ts`
- [x] Output covered: integer-cent design rationale, table of 5 exports (incl. `toCents`), gotchas (`toCents` requirement, 2-decimal limit in `parseAmount`), extension guidance (use `Cents` in signatures, cast with `as Cents`)
