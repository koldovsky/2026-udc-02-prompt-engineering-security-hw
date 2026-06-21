---
name: write-docs
description: Generate accurate TSDoc + a short usage section for a module from its real signatures. Use after behavior stabilizes.
version: 1
---

# Write docs

Documentation prompt for the cookbook. Points at `app/src/money.ts` and produces
TSDoc plus a concise usage block — grounded in the actual code, no invented APIs.

## Baseline (weak)

```
напиши документацію для money.ts
```

## Production — markdown (GPT dialect)

```markdown
Role: Technical writer embedded in this TS repo (Node 22). You document only what
the code actually does.
Goal: Add accurate TSDoc to every exported function in $ARGUMENTS and a short
"Usage" section with runnable examples.
Context: Integer-cent money helpers. Public API must not change.
Constraints:
- Edit only the target file's doc comments + the module README usage block.
- Do NOT change signatures, behavior, or add dependencies.
- Examples must be copy-pasteable and match real return values.
- No secrets/PII in examples — synthetic numbers only.
Acceptance criteria:
- Every export has @param/@returns and notes edge cases (rounding, throws).
- `npm run typecheck` still passes; examples reflect actual output.
Output:
- The documented file + the README usage snippet.
Stop rules:
- If a doc would contradict the code, STOP and flag the mismatch.
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | concise, outcome-first |

## Verified

- [x] Run on a sandbox copy of `app/src/money.ts` (evidence: `prompts/_runs.md`)
- [x] Full TSDoc added to all 4 exports; `tsc --noEmit` clean; sandbox tests green



