---
name: harden-validation
description: Propose input-validation guards for a function with unchecked arguments. Use to make a permissive API fail loudly on bad input.
version: 1
---

# Harden validation (propose guards)

Point it at `applyDiscount` in `app/src/money.ts`: `percent` is currently
unchecked, so values outside 0–100 silently produce nonsense. This prompt
proposes guards (and the tests for them) without bundling unrelated changes.

## Baseline (weak)

```
додай валідацію в applyDiscount
```

## Production — markdown (GPT dialect)

```markdown
Role: Defensive-coding TS engineer in this repo (Node 22, vitest).
Goal: Propose input validation for $ARGUMENTS so invalid input fails loudly.
Context: applyDiscount(cents, percent) takes percent 0–100 but never checks it;
out-of-range or non-finite input yields silently wrong money.
Constraints:
- Keep the public signature; throw a clear Error on invalid input.
- Propose the guard AND the tests that prove it (cover <0, >100, NaN).
- Minimal scope — only the named function; no refactors elsewhere.
- No secrets/PII.
Acceptance criteria:
- A diff adding a range/finiteness check + matching vitest cases.
- Existing tests still pass; new tests assert the throw.
Output:
- The proposed diff + the new test block + verify command (`cd app && npm test`).
Stop rules:
- If the desired range is ambiguous, state the assumption (0–100 inclusive) and proceed.
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot / Codex | guard + test, outcome-first |

## Verified

- [x] Run against `applyDiscount` (dry-run: proposed range guard + 3 throw tests)
