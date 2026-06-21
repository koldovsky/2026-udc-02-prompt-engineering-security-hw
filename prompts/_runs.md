# Cookbook run log — real verification evidence

Actual end-to-end runs of the read-only cookbook prompts against
`app/src/money.ts` (post-fix state). Captured 2026-06-21. Code-modifying prompts
(`add-tests`, `fix-bug`, `add-validation`, `review-pr`) were verified by the
landed code + `npm test` (10/10 green) and are not repeated here.

Raw behavior was captured with a throwaway `src/_probe.test.ts` run under vitest,
then deleted. Reproduce with the snippets noted below.

---

## `edge-case-hunter.md` → `app/src/money.ts`

Real unhandled cases found (post-fix — these survive the bug fixes):

| Function | Input | Current behavior (observed) | Expected | Severity |
|---|---|---|---|---|
| `formatCents` | `150.7` (non-integer) | `"1.50.69999999999999"` | reject or render `"150.70"` | high — `money.ts:14-15` assume integer cents |
| `splitEvenly` | `(100.5, 3)` (non-integer total) | `[34,34,33]` (sums to 101, ≠ 100.5) | reject non-integer total | medium — `money.ts:47-49` |
| `parseAmount` | `"99999999999999999.99"` | `10000000000000000000` (precision loss) | reject > `Number.MAX_SAFE_INTEGER` | medium — `money.ts:25` |
| `applyDiscount` | `(150.7, 10)` | `136` (silently rounds non-integer cents) | reject non-integer cents | low — `money.ts:67` |

Coverage summary: the bug-fix closed the remainder/percent gaps; the remaining
gaps are all about **non-integer / out-of-safe-range numeric inputs** not being
guarded. Read-only — no code changed.

> **Update (code review D1, 2026-06-21):** the non-integer-input gaps for
> `formatCents`, `splitEvenly`, and `applyDiscount` were subsequently **fixed**
> (they now throw) with tests added. The `parseAmount` precision gap (> 2^53)
> remains **deferred** (pre-existing; `parseAmount` was not in scope).

## `perf-review.md` → `app/src/money.ts`

Verdict: **allocation-light, optimal for its size.** Each function is O(n) or
O(1); `splitEvenly` makes a single `Array.from` of exactly `n` elements
(`money.ts:50`) with no intermediate copies. No needless allocations, no O(n²),
no repeated work. No changes urged — the risk of micro-optimizing 4 tiny pure
functions outweighs any gain.

## `explain-code.md` → `app/src/money.ts`

- **Purpose:** integer-cent money helpers; all math stays in integer cents to
  avoid float drift (`money.ts:1-8`).
- **Public API:** `formatCents(cents)` → string (`:11`); `parseAmount(str)` →
  cents, throws on garbage (`:20`); `splitEvenly(total,n)` → shares summing to
  total (`:42`); `applyDiscount(cents,percent)` → discounted cents (`:63`).
- **Invariants:** cents are integers; `splitEvenly` sum equals input; `percent ∈
  [0,100]`.
- **Gotchas:** non-integer input to `formatCents` (`:14-15`) and `splitEvenly`
  (`:47`) is not guarded; `parseAmount` loses precision above 2^53 (`:25`).
- **Example:** `formatCents(42800) === "428.00"`; `splitEvenly(10000,3) ===
  [3334,3333,3333]`.

## `debug-stacktrace.md` → real failure

Captured stack trace (throwaway probe):

```text
AssertionError: expected '1.50.69999999999999' to be '150.70'
 ❯ src/_probe.test.ts:18:32
     18|     expect(formatCents(150.7)).toBe("150.70");
```

- **Root cause:** `formatCents` (`money.ts:14-15`) assumes integer cents. For a
  non-integer like `150.7`, `Math.floor(abs/100)` = `1` and `abs % 100` =
  `50.6999…`, producing the malformed `"1.50.69999999999999"`.
- **Minimal fix (proposed, not applied):** guard at the top —
  `if (!Number.isInteger(cents)) throw new Error(...)` — plus a regression test.
- Localized before editing; no production change made in this read-only run.

## `commit-message.md` → real staged diff

Input: `git diff app/src/money.ts` (`30 insertions(+), 6 deletions(-)`) +
`app/src/money.test.ts`.

Generated message:

```text
fix(money): distribute remainder cents and validate inputs

splitEvenly now spreads leftover cents across the first shares so the sum
always equals the total, and rejects non-positive/non-integer n. applyDiscount
rejects non-finite or out-of-[0,100] percent. Adds edge-case tests.
```

No invented changes; type/scope match the files touched.

## `write-docs.md` → sandbox copy of `app/src/money.ts`

Ran on a throwaway `src/_sandbox/money.ts` (copy) to avoid touching the fixed
file. Added full TSDoc (`@param`/`@returns`/`@throws`/`@example`) to all four
exports, including the two that only had single-line comments (`formatCents`,
`parseAmount`). Result: `npx tsc --noEmit` clean and the mirrored 4-test sandbox
suite green — docs changed no behavior. Sandbox deleted after capture.

## `refactor-safe.md` → sandbox copy of `app/src/money.ts`

On the same sandbox, applied a behavior-preserving refactor: extracted two
private helpers — `signAndMagnitude(value)` and `assertPositiveInteger(n)` — and
reused them in `formatCents` and `splitEvenly`. Public API (names, signatures,
return types) unchanged. Result: `npx tsc --noEmit` clean and the 4-test sandbox
suite still green, confirming identical behavior. Sandbox deleted after capture.



