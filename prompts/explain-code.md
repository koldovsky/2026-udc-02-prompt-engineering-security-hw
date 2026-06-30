---
name: explain-code
description: Explain a module to a newcomer — what each export does, gotchas, and known defects. Read-only, no edits.
version: 1
---

# Explain code (onboarding)

Read-only walkthrough of a file for someone new to the repo. Point it at
`app/src/money.ts`.

## Baseline (weak) — what you started from

```
поясни що робить money.ts
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior engineer onboarding a teammate to this repo (Node 22, TS, ESM).
Goal: Explain $ARGUMENTS clearly enough to modify it safely.
Context: Integer-cent money helpers; tests in src/*.test.ts.
Constraints:
- READ-ONLY. Do not edit any file. No secrets/PII in the explanation.
- Be concrete: cite file:line; flag the planted defects, don't fix them.
Acceptance criteria:
- One paragraph per export: purpose, inputs/outputs, one gotcha.
- A "Known issues" list with file:line for each defect.
Output:
- A short markdown brief (≤1 screen).
Stop rules:
- If the file is empty or unparyseable, say so and stop.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a senior engineer onboarding a teammate. Explain the target file so they
can change it safely. Read-only — do not edit anything. Cite file:line.
</instructions>

<context>
Target: $ARGUMENTS (integer-cent helpers). Tests in src/*.test.ts. Flag planted
defects but do not fix them.
</context>

<constraints>
- Read-only; no secrets/PII; ≤1 screen.
</constraints>

<output_format>
Per-export paragraph + a "Known issues" list with file:line.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | quick brief |
| XML | Claude Code | "read-only" is unambiguous |

## Verified

- [ ] Authored against `app/src/money.ts`; ready to run (read-only)
