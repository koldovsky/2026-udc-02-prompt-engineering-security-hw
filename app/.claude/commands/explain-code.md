---
name: explain-code
description: Explain what each function in a given file does in plain language, for onboarding/non-experts. Use $ARGUMENTS for the file path, e.g. /explain-code src/money.ts.
version: 1
---

# Explain code

## Baseline (weak) — what you started from

```
поясни цей файл
```

## Production — XML (Anthropic / Claude dialect)

```xml
<context>
    - Target file: $ARGUMENTS (path relative to the repo, e.g. src/money.ts).
    - Audience: a developer new to this codebase, not necessarily senior TypeScript.
    - If the file uses an integer-cents money convention or similar non-obvious
      convention, explain it first — infer this from the code, do not assume.
</context>

<instructions>
    <role>
        You are a senior developer explaining unfamiliar code to a teammate
        who just joined the project.
    </role>

    <task>
        For each exported function in <file>$ARGUMENTS</file>, explain:

        - What it does, in one plain-language sentence (no jargon).
        - One realistic example: input → output.
        - Any non-obvious behaviour or gotcha (e.g. known bugs, edge cases,
          what happens with invalid input) — mention only if real, do not invent risks.

        If a non-obvious data convention exists (e.g. amounts as integer cents),
        start with a 2-sentence explanation of it before covering the functions.
    </task>

    <verify>
        Before finishing, confirm:
        - Every exported function is covered.
        - No TypeScript jargon left unexplained (assume reader knows JS basics, not TS internals).
        - Examples use realistic values, not placeholders like "foo"/"bar".
    </verify>
</instructions>

<constraints>
- Read only — do not edit any file.
- Do not invent behaviour that isn't in the code.
- No secrets or PII in output.
</constraints>

<output_format>
- Plain prose + short examples, one section per function.
- No code dump of the whole file — only the 1-3 line snippet relevant to an example.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| XML | Claude Code / Claude | explicit audience framing avoids over-technical output |

## Verified

- [x] Run against a real target in `app/`
- [x] Agent stayed in scope; acceptance criteria met
