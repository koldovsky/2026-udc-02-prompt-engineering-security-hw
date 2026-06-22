---
name: add-validation-tests
description: Add tests that expect throws for invalid parseAmount and applyDiscount inputs.
version: 1
---

# Add validation tests

## Baseline (weak)

```
додай тести на валідацію
```

## Production — markdown (GPT dialect)

```markdown
Role: Test author for vitest in this repo.
Goal: Add tests for invalid `parseAmount` and `applyDiscount` inputs.
Context: `app/src/money.ts`, tests in `app/src/money.test.ts`.
Constraints: Edit `money.test.ts` only. Synthetic inputs only.
Acceptance criteria:
- ≥2 invalid parseAmount strings; ≥2 out-of-range percent values.
- `cd app && npm test` run and summarized.
Output: Table input → expected behavior → test name.
```

## Verified

- [x] Run against `app/src/money.test.ts`
