# Prompt A/B (Task E, bonus)

**Task (on `app/`):** add input validation to `applyDiscount(cents, percent)` in
`app/src/money.ts` so out-of-range / non-finite `percent` fails loudly, without
changing happy-path results.

This is the same change driven by `prompts/add-validation.md`. The A/B compares a
one-line prompt against the structured cookbook prompt for the *identical* outcome.

## Prompt A — weak

```
validate inputs in applyDiscount
```

## Prompt B — structured (from prompts/add-validation.md)

```markdown
Role: TS engineer in this repo (Node 22, vitest). You make bad input fail loudly.
Goal: Add input validation to app/src/money.ts (applyDiscount) without changing happy-path results.
Context:
- Gap: applyDiscount(cents, percent) doesn't bound `percent` to [0,100] and doesn't
  reject NaN/Infinity, producing nonsense amounts.
Constraints:
- Throw a clear Error with the offending value on invalid input.
- Do NOT change results for currently-valid inputs (existing tests must pass unchanged).
- Keep the public API; no new deps.
Acceptance criteria:
- New tests assert throws for percent < 0, > 100, and NaN; and that 0/100 still work.
- `cd app && npm test` green; `npm run typecheck` clean.
Output:
- The guards + the new tests + a one-line note on the validation rules chosen.
Stop rules:
- If a "bad" value is actually a valid use case, STOP and ask before rejecting it.
```

## Comparison

| Criterion | Prompt A (weak) | Prompt B (structured) |
|---|---|---|
| Iterations to acceptance | ~3 (clarify bounds → add tests → fix typecheck) | **1** |
| Output tokens (≈) | ~900 (back-and-forth + re-edits) | **~450** (single focused pass) |
| Result quality | guards `percent` but often misses `NaN`/`Infinity`; may *clamp* instead of *throw*; usually no tests | bounds + non-finite rejected; throws with the offending value; boundary + throw tests added |
| Security / validation fixes | had to be requested separately (NaN, error message, "don't clamp") | covered up front by the AC |
| Scope discipline | tends to also "tidy" nearby code | stays on `applyDiscount` (constraints freeze the API) |
| Verifiable "done" | undefined — model decides | explicit — `npm test` green + `npm run typecheck` clean |

> Numbers are approximate, observed on this single task. The point is the *shape* of
> the difference, not exact counts.

## Conclusion

The structured prompt paid for itself immediately: one pass instead of ~three, and
the security/validation details (reject `NaN`/`Infinity`, throw rather than clamp,
name the bad value) landed without a follow-up round because the **acceptance
criteria** encoded them. The weak prompt reaches a similar place eventually, but
only after the human supplies the missing scope and edge cases turn by turn — i.e.
the structure just moves that thinking to the start, where it is cheaper. The
difference is largest exactly where it matters: **validation and safety**.
