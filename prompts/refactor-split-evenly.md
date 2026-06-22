---
name: refactor-split-evenly
description: Fix splitEvenly remainder-cent distribution with minimal diff and tests.
version: 1
---

# Refactor splitEvenly (remainder cents)

## Baseline (weak)

```
пофікси splitEvenly
```

## Production — markdown (GPT dialect)

```markdown
Role: Careful TS refactorer in this repo (vitest, integer cents).
Goal: Fix `splitEvenly` so the sum of shares equals `totalCents` when division is not exact.
Context:
- Bug: `app/src/money.ts` — `splitEvenly` drops remainder cents (e.g. 10001 / 3 → [3333,3333,3333] = 9999).
- Tests: extend `app/src/money.test.ts` if needed.
Constraints:
- Change ONLY `splitEvenly` in `money.ts` plus tests in `money.test.ts`.
- Keep signature `(totalCents: number, n: number): number[]`.
- Distribute remainder +1 cent to the first `remainder` shares (document the rule in a one-line comment).
- No new dependencies.
Acceptance criteria:
- `splitEvenly(10001, 3)` → `[3334, 3334, 3333]` (sum = 10001).
- `splitEvenly(9000, 3)` still → `[3000, 3000, 3000]`.
- `cd app && npm test` green.
Output:
- One-sentence explanation of remainder rule + test names added.
Stop rules:
- If `n <= 0`, throw or document — do not silently return empty array without a test.
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Cursor Agent | precise AC for money math |

## Verified

- [x] Run against `app/src/money.ts`
- [x] Remainder distributed; tests green
