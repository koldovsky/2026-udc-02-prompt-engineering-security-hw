---
name: write-docs
description: Write accurate JSDoc / README docs for a module from its real behavior and tests. Use to document code without inventing behavior.
version: 1
---

# Write docs

## Baseline (weak) — what you started from

```
document money.ts
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Technical writer who reads code before documenting it.
Goal: Write/refresh docs for $ARGUMENTS that match its ACTUAL behavior.
Context:
- Target: $ARGUMENTS. Ground truth = the code + src/*.test.ts (don't invent behavior).
Constraints:
- Document only what the code does; mark edge cases that throw.
- Do NOT change runtime code — comments/JSDoc and README prose only.
- No secrets/PII in examples — use synthetic amounts.
Acceptance criteria:
- Every exported function has a one-line summary + params + return + "throws when".
- Examples are copy-pasteable and correct (match the tests).
- `npm run typecheck` still clean.
Output:
- Updated JSDoc in the file and/or a README section.
Stop rules:
- If the code and an existing comment disagree, STOP and flag it — don't silently "fix" docs.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a technical writer who reads code first. Document the target so the docs
match actual behavior, including which inputs throw. Do not change runtime code.
Verify examples against the tests.
</instructions>

<context>
Target: $ARGUMENTS. Ground truth: the code and src/*.test.ts.
</context>

<constraints>
- JSDoc/README prose only; no runtime changes.
- Synthetic example values; no secrets/PII.
</constraints>

<output_format>
Updated JSDoc and/or README section with correct, copy-pasteable examples.
</output_format>

<stop_rules>
If code and an existing comment disagree, flag it instead of editing docs to match.
</stop_rules>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | quick inline JSDoc |
| XML | Claude Code | the "don't invent behavior" rule sticks |

## Verified

- [x] Run against `app/src/money.ts`
- [x] JSDoc for `splitEvenly`/`applyDiscount` now states remainder handling and "throws when"
