# A/B prompts (Task E, bonus)

Task (on `app/`): add input validation to `app/src/money.ts` — `applyDiscount`
should reject `percent` outside 0–100 (and NaN / non-finite), `splitEvenly` should
reject `n <= 0` / non-integer. Acceptance bar: guard clauses that **throw** (don't
clamp) with safe messages (name the param + constraint, no payload/PII), tests for
the throws, valid-input behavior unchanged, `npm test` + `npm run typecheck` green.

Method: each prompt run once in its own `/clear`ed session, starting from an
identical snapshot of `money.ts` + `money.test.ts`. Tokens/cost read from `/usage`
(cumulative, so Prompt B figures are the increment). Edits were **observed, not
applied** in both runs — hence "0 lines" in `/usage`; the comparison is on the
quality and completeness of each single-shot proposal.

## Prompt A — weak

> add some validation to app/src/money.ts

## Prompt B — structured

> ```xml
> <instructions>
> You are a defensive TS engineer. Add entry guard clauses to app/src/money.ts so
> invalid args throw with clear, safe messages — without changing behavior for valid
> input. Match the existing parseAmount throw style. Verify with `cd app && npm test`.
> </instructions>
> <context>
> Small TS module in app/src/; tests in the sibling *.test.ts. Precedent:
> parseAmount throws `Not a valid amount: ...`.
> </context>
> <constraints>
> - Throw (don't clamp) on out-of-range/NaN/non-finite/wrong-type. Messages name the
>   param + constraint, no secrets/PII or full payloads.
> - Valid-input behavior unchanged. No new deps. Add tests for the throws.
> </constraints>
> <output_format>
> Updated source + tests + a table: function → rejected inputs → error message.
> </output_format>
> ```

## Comparison

| Criterion | Prompt A (weak) | Prompt B (structured) |
|---|---|---|
| Iterations to acceptance | 1 shot, but **below bar** — would need ≥2 more rounds | **1 shot, at bar** |
| Output tokens (≈) | 2.6k | 4.6k |
| Cost (`/usage`) | $0.2318 | ~$0.21 (incremental) |
| Result quality | Partial — added some validation, **no range checks, no tests**; scope guessed | Complete — range checks, safe messages, throw-tests, + rejected-inputs table |
| Security / validation fixes | Would have to ask separately (missed range checks, safe-message rule, tests) | Handled immediately (param-named messages, no payload/PII; tests included) |

## Conclusion

For roughly the same cost and a single turn, the structured prompt hit the
acceptance bar in one shot — range checks, safe (param-named, no-payload) error
messages, and throw-tests all included — while the weak prompt produced a partial
patch that omitted range checks and tests and would have needed extra rounds. The
biggest gap is on the **security/validation** dimension: structure front-loads the
safe-error-message and edge-case requirements so they arrive immediately instead of
being chased down later.
