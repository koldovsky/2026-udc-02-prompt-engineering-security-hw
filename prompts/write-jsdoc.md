---
name: write-jsdoc
description: Add complete JSDoc (@param/@returns/@throws) to exported functions in a module. Use once behavior is stable so docs don't chase a moving target.
version: 1
---

# Write JSDoc

"Docs" cookbook entry #1.

## Baseline (weak)

```
додай коментарі в money.ts
```

## Production — markdown (GPT dialect)

```markdown
Role: TS engineer documenting a stable internal module.
Goal: Add complete JSDoc to every exported function in app/src/money.ts.
Context: formatCents, parseAmount, splitEvenly, applyDiscount — all pure,
synchronous, throw on invalid input (see current inline comments/tests for
the exact contract of each).
Constraints:
- Docs only — no behavior changes, no renamed params.
- Every exported function gets @param (one per parameter), @returns, and
  @throws for each distinct error condition it can raise.
- Keep it factual: derive claims from the actual implementation and tests,
  don't invent behavior that isn't there.
Acceptance criteria:
- `cd app && npm run typecheck` still passes (JSDoc doesn't break types).
- `cd app && npm test` still passes (no behavior touched).
- Every @throws matches an actual `throw` in the function body.
Output:
- The diff to money.ts.
Stop rules:
- Don't document the internal (non-exported) helper functions with the same
  depth — a one-line comment is enough for those.
```

## Production — XML (Claude dialect)

```xml
<instructions>
Add complete JSDoc (@param, @returns, @throws) to every exported function in
app/src/money.ts. Docs only, no behavior change.
</instructions>

<context>
Functions: formatCents, parseAmount, splitEvenly, applyDiscount — pure,
synchronous, each throws on specific invalid-input conditions.
</context>

<constraints>
- No behavior/signature changes.
- Every @throws must correspond to a real throw in the function body.
- Internal (non-exported) helpers get a one-line comment, not full JSDoc.
</constraints>

<acceptance_criteria>
- npm test and npm run typecheck both still pass.
</acceptance_criteria>

<output_format>Diff to money.ts only.</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | reads like a doc-comment lint rule |
| XML | Claude Code | constraint keeps it from over-documenting internals |

## Verified

- [x] Run against `app/src/money.ts`
- [x] Added `@param`/`@returns`/`@throws` to all four exported functions
      (`formatCents`, `parseAmount`, `splitEvenly`, `applyDiscount`); kept
      one-line comments on the internal `assertPercentInRange` /
      `assertPositiveInteger` helpers per the stop rule.
- [x] `cd app && npm test` — 14/14 passing (no behavior touched)
- [x] `cd app && npm run typecheck` — clean
