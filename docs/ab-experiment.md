# A/B Experiment (Task E)

**Task:** Add input validation to `applyDiscount` and `splitEvenly` in `app/src/money.ts`
so they throw descriptive errors on bad input instead of returning silent wrong results.

---

## Prompt A — baseline (weak)

```
add validation to applyDiscount
```

**What the agent produced:**

```ts
export function applyDiscount(cents: number, percent: number): number {
  if (percent < 0 || percent > 100) throw new Error("Invalid percent");
  return Math.round(cents * (1 - percent / 100));
}
```

- One guard, one function, generic `Error` (no error subtype).
- `splitEvenly` not touched — not mentioned in the prompt.
- No tests added — not requested.
- Error message carries no context (`"Invalid percent"` — what was the actual value?).
- Negative `cents` (refunds) not considered — could have been accidentally blocked.
- Needed a second prompt to cover `splitEvenly` and a third to add tests.

---

## Prompt B — structured (from `prompts/add-validation.md`)

```
Role: Defensive TS engineer, working in this repo (Node 22, vitest).
Goal: Add input validation to `applyDiscount` and `splitEvenly` in `app/src/money.ts`
      so they throw descriptive errors on bad input instead of returning NaN/Infinity.
Context:
- `applyDiscount(cents, percent)`: percent must be 0–100.
- `splitEvenly(totalCents, n)`: n must be ≥1 integer.
- `parseAmount` already throws on invalid string — use it as a style reference.
Constraints:
- RangeError for out-of-range numeric arguments.
- TypeError for wrong type (e.g. non-integer n).
- Do not validate `cents` (negative cents is valid for refunds).
- No new npm dependencies.
Acceptance criteria:
- applyDiscount(100, -1) throws RangeError.
- applyDiscount(100, 101) throws RangeError.
- splitEvenly(100, 0) throws RangeError.
- splitEvenly(100, -1) throws RangeError.
- splitEvenly(100, 1.5) throws TypeError.
- cd app && npm test passes.
Output:
- Updated money.ts + new tests in money.test.ts.
```

**What the agent produced:**

```ts
// splitEvenly
if (!Number.isInteger(n)) throw new TypeError(`n must be an integer, got ${n}`);
if (n < 1) throw new RangeError(`n must be ≥ 1, got ${n}`);

// applyDiscount
if (percent < 0 || percent > 100) throw new RangeError(`percent must be 0–100, got ${percent}`);
```

- Both functions covered in one pass.
- Correct error subtypes (`RangeError` / `TypeError`) matching `parseAmount` style.
- Error messages include the actual bad value.
- 5 new tests covering all 5 acceptance criteria.
- `cents` intentionally left unvalidated (refund case explicitly noted).
- `npm test` green after first attempt — no follow-up prompt needed.

---

## Comparison

| Criterion | Prompt A (weak) | Prompt B (structured) |
|---|---|---|
| Iterations to acceptance | 3 (A → cover splitEvenly → add tests) | 1 |
| Functions covered | 1 of 2 | 2 of 2 |
| Error type | generic `Error` | `RangeError` / `TypeError` (correct) |
| Error message quality | `"Invalid percent"` (no value) | includes actual bad value |
| Tests added | 0 | 5 |
| Refund edge case (`cents < 0`) | not considered | explicitly excluded per constraint |
| Security / correctness notes | none | noted why `cents` is not validated |
| `npm test` green first try | yes (but incomplete) | yes (complete) |
| Output tokens (approx.) | ~120 | ~380 |

---

## Conclusion

The structured prompt cost ~260 extra tokens to write but saved two follow-up
iterations. The biggest difference was not the quantity of output but its
**completeness**: Prompt B covered both functions, chose the right error subtypes,
added tests, and handled the refund edge case correctly — all in one pass. Prompt A
produced a syntactically valid but semantically incomplete result that required
manual review to catch what was missing. For defensive code changes where missing a
case has real consequences, the structure investment pays for itself immediately.
