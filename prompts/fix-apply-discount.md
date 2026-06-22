---
name: fix-apply-discount
description: Add percent validation to applyDiscount and cover with tests.
version: 1
---

# Fix applyDiscount validation

## Baseline (weak)

```
applyDiscount ламається на дивних значеннях
```

## Production — markdown (GPT dialect)

```markdown
Role: TS developer focused on input validation and integer-cent math.
Goal: Harden `applyDiscount` against invalid `percent` values.
Context:
- `app/src/money.ts` — `applyDiscount(cents, percent)` accepts any number today (e.g. 150 or -10).
- Tests in `app/src/money.test.ts`.
Constraints:
- Valid range: `percent` in [0, 100] inclusive; throw `RangeError` with a clear message otherwise.
- Do not change happy-path results for valid inputs.
- No new dependencies.
Acceptance criteria:
- Tests for `percent = -1`, `101`, and `NaN` expect throws.
- Existing discount test still passes.
- `cd app && npm test` green.
Output:
- Validation rule summary + new test names.
Stop rules:
- Do not refactor unrelated functions in the same pass.
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Cursor Agent | validation AC are easy to verify |

## Verified

- [x] Run against `app/src/money.ts`
- [x] Range check added; tests green
