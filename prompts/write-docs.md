---
name: write-docs
description: Add JSDoc and module README for money.ts public API without changing behavior.
version: 1
---

# Write docs (module API)

## Baseline (weak)

```
задокументуй money.ts
```

## Production — markdown (GPT dialect)

```markdown
Role: Technical writer who knows TypeScript and integer-cent money patterns.
Goal: Document the public API of `app/src/money.ts` so a new teammate can use it safely.
Context:
- Module: `app/src/money.ts` — exports `formatCents`, `parseAmount`, `splitEvenly`, `applyDiscount`.
- Amounts are integer cents; no external deps.
Constraints:
- Do NOT change function behavior or signatures.
- Add JSDoc to exported functions only; mention units (cents), valid ranges, and thrown errors.
- Optionally add a short Usage section to `app/README.md` (≤15 lines).
- No secrets/PII in examples; use amounts like `42800` → `"428.00"`.
Acceptance criteria:
- Every export has `@param`, `@returns`, and `@throws` where applicable.
- `app/README.md` lists all four functions with one-line descriptions.
- `cd app && npm test` still passes.
Output:
- Summary of docs added and one example snippet from README.
Stop rules:
- If you find bugs, list them separately — do not fix in this pass.
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot / Cursor | outcome-first for doc tasks |

## Verified

- [x] Run against `app/src/money.ts`
- [x] Docs added without behavior changes; tests green
