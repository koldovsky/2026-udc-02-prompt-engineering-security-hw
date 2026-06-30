---
name: write-docs
description: Refresh JSDoc + a short usage block for a TS module without changing behavior. Use before review or onboarding.
version: 1
---

# Write docs

Documents the exports of a module. Point it at `app/src/money.ts`. Docs only —
known bugs are described, never silently fixed.

## Baseline (weak) — what you started from

```
додай документацію до money.ts
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: TS docs author in this repo (Node 22, ESM, vitest). Docs only.
Goal: Make every export in $ARGUMENTS self-explanatory.
Context: Integer-cent money helpers. Behavior must not change.
Constraints:
- Edit only doc comments / a usage block. No logic, signature, or import changes.
- Note known defects with @remarks — do NOT fix them here.
- No secrets/PII; synthetic examples only.
Acceptance criteria:
- Each exported fn has @param, @returns, @throws (if it throws), and one example.
- `cd app && npm test` still green; `cd app && npm run typecheck` clean.
Output:
- The changed file(s) + a 2-line summary.
Stop rules:
- If accurate docs would require changing behavior, STOP and report it.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a TS docs author. Document every export of the target module. Docs only —
no logic, signature, or import changes. Verify `cd app && npm test` stays green
and `npm run typecheck` is clean before finishing.
</instructions>

<context>
Target: $ARGUMENTS (integer-cent money helpers). Note known defects with
@remarks; do not fix them.
</context>

<constraints>
- Edit only doc comments / a usage block. No secrets/PII; synthetic examples only.
- Each export: @param, @returns, @throws (if any), one example.
</constraints>

<output_format>
Changed file(s) + a short summary of what was documented.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | outcome-first |
| XML | Claude Code | structure holds the "docs only / stay green" rule |

## Verified

- [ ] Authored against `app/src/money.ts`; ready to run (docs-only scope)