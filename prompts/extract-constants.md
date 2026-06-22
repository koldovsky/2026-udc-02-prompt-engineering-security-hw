---
name: extract-constants
description: Extract magic numbers from money.ts into named constants — no behavior change.
version: 1
---

# Extract constants (refactor)

## Baseline (weak)

```
прибери magic numbers з money.ts
```

## Production — markdown (GPT dialect)

```markdown
Role: Refactorer preferring named constants over magic numbers.
Goal: Replace magic numbers in `app/src/money.ts` with module-level constants.
Constraints: Behavior and public API unchanged. npm test green. No new deps.
Acceptance criteria: ≥2 named constants introduced.
Output: constant name → value → what it replaces.
```

## Verified

- [x] Run against `app/src/money.ts`
