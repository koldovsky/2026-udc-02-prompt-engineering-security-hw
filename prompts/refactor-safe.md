---
name: refactor-safe
description: Refactor for readability with zero behavior change, guarded by the existing test suite. Use on stable code.
version: 1
---

# Refactor (behavior-preserving)

Refactoring prompt for the cookbook. Improves internals of `app/src/money.ts`
while keeping the public API and all tests intact.

## Baseline (weak)

```
зроби money.ts краще
```

## Production — markdown (GPT dialect)

```markdown
Role: Senior TS engineer in this repo (Node 22, vitest). You refactor without
changing observable behavior.
Goal: Improve readability/structure of $ARGUMENTS with zero behavior change.
Context: Integer-cent money helpers with a passing test suite (src/*.test.ts).
Constraints:
- Keep the public API identical (names, signatures, return types).
- No new dependencies. No behavior change — tests are the contract.
- Prefer small, named helpers over comments; no premature abstraction.
Acceptance criteria:
- `cd app && npm test` and `npm run typecheck` both green, unchanged outputs.
- Diff is readable and each change is justified in one line.
Output:
- The refactored file + a bullet list of what changed and why.
Stop rules:
- If a clean refactor requires a behavior change, STOP and propose it separately.
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | tests-as-contract framing keeps scope tight |

## Verified

- [x] Run on a sandbox copy of `app/src/money.ts` (evidence: `prompts/_runs.md`)
- [x] Extracted `signAndMagnitude`/`assertPositiveInteger`; API unchanged; `tsc` + tests green



