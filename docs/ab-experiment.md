# A/B prompt experiment (Task E, bonus)

Task (on `app/`): **add input validation to `applyDiscount` in `app/src/money.ts`**
so an out-of-range `percent` is rejected instead of silently producing a wrong
amount.

## Prompt A — weak (baseline)

> add validation to applyDiscount

## Prompt B — structured

> Role: Senior TS engineer in this repo (Node 22, vitest).
> Goal: Validate inputs of `applyDiscount` in `app/src/money.ts` so out-of-range
> `percent` is rejected with a clear error.
> Context: `applyDiscount(cents, percent)` currently trusts `percent ∈ [0,100]`
> and silently produces wrong results outside it.
> Constraints: keep the signature; throw a descriptive `Error` for `percent < 0`,
> `> 100`, or non-finite; don't change valid-range behavior; no new deps; add tests.
> Acceptance: valid inputs unchanged; invalid `percent` throws; `cd app && npm test`
> green, including boundary tests (0, 100, -1, 101, NaN).
> Output: the patched function + new tests + one-line rationale.
> Stop rule: if a change would break an existing caller, stop and list the callers.

## Comparison

> Measurement status (2026-06-21): the previous table used estimates. The repo
> does **not** contain a captured fresh-chat Prompt A/B transcript or IDE/API
> `/cost` output, so iteration and output-token numbers are intentionally left
> unclaimed. Local validation was re-run for the landed `applyDiscount` result:
> `npm test` passed 13/13, and a temporary Vitest probe passed 3/3 for `0`, `100`,
> `-1`, `101`, `NaN`, `Infinity`, `-Infinity`, and non-integer cents.

| Criterion | Prompt A (weak) | Prompt B (structured) |
|---|---|---|
| Iterations to acceptance | Not captured in this repo; requires a fresh isolated IDE run. | Not captured; `prompts/add-validation.md` verifies a structured run occurred, but does not record iteration count. |
| Output tokens | Not captured; no IDE `/cost` or API stats artifact found. | Not captured; no IDE `/cost` or API stats artifact found. |
| Result quality | Not measured; no baseline output/log is available to judge missed cases. | Measured local result: 13/13 app tests green + 3/3 probe green; no misses in the verified set (`0`, `100`, `-1`, `101`, `NaN`, `±Infinity`, non-integer cents). |
| Security/validation edits | Not measured; baseline output unavailable. | Verified in current code: rejects out-of-range/non-finite `percent` and non-integer `cents`; preserves valid boundaries. |
| Scope discipline | Not measured; baseline output unavailable. | Verified current landed code is localized to `app/src/money.ts` and `app/src/money.test.ts`. |

## Conclusion

The original hypothesis remains plausible but **not fully validated as an A/B
measurement** because Prompt A and the IDE/API token telemetry were not captured.
The measured evidence available in this repo supports the structured prompt's
landed quality outcome: the current `applyDiscount` implementation passes the
required boundary and validation checks. To complete the bonus experiment, rerun
both prompts in fresh chats and record iterations plus IDE `/cost` or API output
token stats in this table.


