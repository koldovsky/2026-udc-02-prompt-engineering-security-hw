---
name: refactor-safely
description: Improve readability and structure in a target file while preserving behavior and keeping tests green.
version: 1
---

# Refactor safely (behavior locked)

## Baseline (weak) — what you started from

```
refactor money.ts
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior TypeScript engineer doing low-risk refactors in a reviewed codebase.
Goal: Refactor $ARGUMENTS for readability or maintainability without changing behavior.
Context: The sample target is `app/src/money.ts`; tests live in `app/src/money.test.ts` and should lock behavior.
Constraints:
- Refactor only the target file unless a tiny companion test tweak is required to preserve clarity.
- Do not change public APIs, semantics, or dependencies.
- Keep the diff small and easy to review.
- No secrets or PII in output.
Acceptance criteria:
- Explain what became clearer and why.
- Run the relevant app verification (`npm test`, and `npm run typecheck` if types are touched).
- Finish only if checks pass.
Output:
- Changed files.
- Refactor summary.
- Verification results.
Stop rules:
- If the best change would alter behavior or public API, stop and propose it instead of applying it.
```

## Production — XML (Anthropic / Claude dialect)

```xml
instructions:
  - Refactor $ARGUMENTS for readability while preserving behavior.
  - Keep the diff small.
  - Verify with the app checks before finishing.
context:
  - Primary sample target: `app/src/money.ts`
  - Tests: `app/src/money.test.ts`
constraints:
  - No behavior changes, API changes, or new dependencies.
  - Minimal scope and reviewable diff.
  - No secrets or PII.
output_format:
  - Changed files
  - What became clearer
  - Verification results
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex / ChatGPT | good for small safe refactors |
| XML | Claude Code / Claude | enforces behavior lock |

## Verified

- [ ] Run against a real target in `app/`
- [x] Includes measurable verification steps


