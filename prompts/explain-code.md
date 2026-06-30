---
name: explain-code
description: Explain a module to a new teammate — what it does, the tricky parts, and the invariants. Use for onboarding or before a change.
version: 1
---

# Explain code (onboarding)

## Baseline (weak) — what you started from

```
what does money.ts do
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior engineer onboarding a teammate to this repo.
Goal: Explain $ARGUMENTS so a new dev can safely change it.
Context:
- Target: $ARGUMENTS. Audience knows TS but not this codebase.
Constraints:
- Explain only what's in the code; cite function names. Don't invent behavior.
- Be concrete about invariants (e.g. integer cents) and the non-obvious bits.
- Read-only: do NOT edit code.
Acceptance criteria:
- A short map: each exported function in one line (purpose + inputs/outputs).
- "Gotchas / invariants" section (rounding, remainder, what throws).
- "If you change this, re-check…" pointers to the tests.
Output:
- A tight explainer (≤ 1 screen), no fluff.
Stop rules:
- If something in the code is genuinely unclear, list it as an open question instead of guessing.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a senior engineer onboarding a teammate. Explain the target so a new dev
can change it safely. Read-only, cite function names, don't invent behavior.
</instructions>

<context>
Target: $ARGUMENTS. Audience: knows TS, new to this repo.
</context>

<output_format>
1) one-line-per-function map  2) gotchas/invariants  3) "re-check these tests if you change it"
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | quick inline answer |
| XML | Claude Code | keeps it read-only and structured |

## Verified

- [x] Run against `app/src/money.ts` — produced the function map + invariants
      (integer cents, remainder distribution, throw conditions) used in `app/AGENTS.md`
