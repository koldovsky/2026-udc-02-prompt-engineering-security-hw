---
name: explain-code
description: Produce a plain-English explanation of app/src/money.ts for a developer new to the module; read-only.
version: 1
---

# Explain Code

## Baseline (weak) — what you started from

```
explain money.ts
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior TypeScript engineer onboarding a new team member. Target: `app/src/money.ts`.
Goal: Write a clear, concise explanation of the module — purpose, design decisions, each function's contract, and known issues.
Context:
- Module stores money as integer cents to avoid float drift
- Four exports: formatCents, parseAmount, splitEvenly, applyDiscount
- Known bug in splitEvenly: remainder cents dropped
- Audience: developer who knows TypeScript but hasn't seen this code
Constraints:
- Read only — do not edit any file
- Output is plain prose + short code snippets; no new files
- No secrets or PII in output
Acceptance criteria:
- Explains why integer cents (not floats) are used
- Covers each function: inputs, outputs, edge cases, known issues
- Flags the splitEvenly remainder bug explicitly
- Suitable for pasting into a PR description or team wiki
Output:
- Plain-text explanation (500–800 words)
- One code snippet per function showing a typical call
Stop rules:
- Do not suggest or implement fixes
- Do not read files outside app/src/money.ts
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a senior TypeScript engineer. Read `app/src/money.ts` and write a developer-facing explanation of the module. Do NOT edit any file. Output is prose + short inline examples only.
</instructions>

<context>
Target file: app/src/money.ts
Audience: TypeScript developer new to this module
Key things to cover:
- Why integer cents instead of floats (float drift problem)
- formatCents: negative support, padding
- parseAmount: regex contract, what throws, whitespace trim
- splitEvenly: even split contract, KNOWN BUG (remainder dropped, documented)
- applyDiscount: rounding behaviour, missing range guard
</context>

<constraints>
- Read only — do not modify any file
- No secrets or PII in output
- No new files; output inline in response
</constraints>

<output_format>
Sections:
1. Purpose (2–3 sentences)
2. Design decision: integer cents (why, trade-offs)
3. API reference — one subsection per function:
   - Signature
   - What it does
   - Edge cases / known issues
   - Example call
4. Known bugs (list)
5. Suggested next steps (max 3 bullets)
Target length: 500–800 words.
</output_format>

<stop_rules>
- Do not write or suggest code fixes
- If behaviour is ambiguous from reading the code, note it as "unclear" rather than guessing
</stop_rules>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex / ChatGPT | outcome-first, shorter |
| XML | Claude Code / Claude | structure + multishot |

## Verified

- [ ] Run against a real target in `app/`
- [ ] Agent stayed in scope; acceptance criteria met
