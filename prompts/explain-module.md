---
name: explain-module
description: Produce a concise maintainer-oriented explanation of a target module's API, assumptions, and pitfalls.
version: 1
---

# Explain module (maintainer handoff)

## Baseline (weak) — what you started from

```
explain money.ts
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior engineer onboarding a teammate to this repo.
Goal: Explain $ARGUMENTS clearly enough that another engineer can change it safely.
Context: The sample target is `app/src/money.ts`, a small integer-cent money helper with tests in `app/src/money.test.ts`.
Constraints:
- Do not edit files in this pass unless explicitly asked.
- Base the explanation on the target file and its tests only.
- Cover responsibilities, exported functions, assumptions, and likely pitfalls.
- No secrets or PII in output.
Acceptance criteria:
- Summarize each exported function in 1-3 bullets.
- Mention at least one caveat or edge case worth reviewing.
- Keep the explanation under 250 words unless the user asked for more.
Output:
- A short sectioned explanation for maintainers.
Stop rules:
- If the file has no exported symbols, stop and say so.
```

## Production — XML (Anthropic / Claude dialect)

```xml
instructions:
  - Explain $ARGUMENTS for a teammate who may need to modify it safely.
context:
  - Primary sample target: `app/src/money.ts`
  - Companion tests: `app/src/money.test.ts`
constraints:
  - Read and explain only; do not edit code.
  - Cover exports, assumptions, and pitfalls.
  - No secrets or PII.
output_format:
  - Short maintainer-oriented explanation
  - One caveat or edge case
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex / ChatGPT | concise explanatory output |
| XML | Claude Code / Claude | keeps the read-only boundary explicit |

## Verified

- [ ] Run against a real target in `app/`
- [x] Targets `app/src/money.ts` and its tests only


