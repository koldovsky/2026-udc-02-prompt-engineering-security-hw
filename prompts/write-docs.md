---
name: write-docs
description: Write or tighten JSDoc / README docs for a module from its actual code. Use to document an undocumented or stale API.
version: 1
---

# Write docs (from code)

Point it at `app/src/money.ts`; it documents the real exported API without
inventing behavior or touching logic.

## Baseline (weak)

```
додай документацію до money.ts
```

## Production — markdown (GPT dialect)

```markdown
Role: TS docs author in this repo. You document only what the code actually does.
Goal: Write accurate JSDoc for every exported function in $ARGUMENTS, plus a
short usage block for app/README.md.
Context: Integer-cent money helpers. The cents-not-floats invariant matters.
Constraints:
- Do NOT change runtime behavior — comments/docs only.
- Describe units (integer cents), parameters, return type, and throw conditions.
- Note known limitations honestly; do not claim a bug is fixed.
- No secrets/PII; examples use small synthetic amounts.
Acceptance criteria:
- Every exported function has a one-line summary + @param/@returns (+ @throws where it throws).
- README shows one runnable import + call example.
- `cd app && npm test` still green (docs-only change).
Output:
- The edited file(s) + a 2-line summary of what was documented.
Stop rules:
- If a function's behavior is ambiguous, document the observed behavior and flag the ambiguity.
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot / ChatGPT | natural for prose + code blocks |

## Verified

- [x] Run against `app/src/money.ts` (dry-run: produced accurate JSDoc, no logic change)
