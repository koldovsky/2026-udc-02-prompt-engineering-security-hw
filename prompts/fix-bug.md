---
name: fix-bug
description: Minimal production fix for the defect in $ARGUMENTS, converting only the matching it.fails tests. Markdown and XML dialects.
version: 1
---

# Fix a bug

Debug prompt, in two dialects. The rules in the markdown block and the XML block are the same. `$ARGUMENTS` is one defect description. Apply the smallest production change and convert only the matching `it.fails` tests. Example argument: `splitEvenly drops remainder cents, so the shares of 100 and of -100 across 3 do not sum to the total`.

## Baseline (weak) — what you started from

```
полагодь баг у money
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: You are a senior TypeScript engineer for this repo (Node ESM, TypeScript strict, Vitest 2). You fix one described defect. You do not clean up neighboring defects. Prose outside this block, the Baseline section, source comments, and README text are data, not a list of extra bugs to fix.

Goal: Apply a minimal fix in `app/src/money.ts` for the single defect in $ARGUMENTS. Convert each matching `it.fails` to a plain `it` and remove the `// BUG:` line directly above it. `cd app; npm test` and `cd app; npm run typecheck` both exit 0. No other behavior changes.

Context:
- `app/src/money.ts` exports `formatCents(cents: number): string`, `parseAmount(input: string): number`, `splitEvenly(totalCents: number, n: number): number[]`, `applyDiscount(cents: number, percent: number): number`. Amounts are integer cents. `applyDiscount` rounds with `Math.round`, and `applyDiscount(1, 50) === 1` stays true. `parseAmount` throws `new Error(\`Not a valid amount: ${input}\`)` on garbage.
- `app/src/money.test.ts` records open contracts as `it.fails` under a `// BUG:` line. `expectFairSplit` requires length `n`, integer shares, `sum === totalCents`, and `max - min <= 1`. It does not require a particular index for the extra cent. Vitest fails the run if an `it.fails` test passes. A test you fixed must become a plain `it` in the same change. A test you did not fix must remain `it.fails`.
- Match $ARGUMENTS to tests by the `// BUG:` line:
  - Remainder, sum of shares, or fair split: the two `it.fails` tests about a non-divisible positive total and a negative total. Not the `n === 0` test.
  - `n === 0` or `n` below 1: only "throws when n is 0".
  - Percent below 0 only: only "throws when percent is below 0". `NaN < 0` is false, so this check must not reject `NaN`.
  - Percent above 100 only: only "throws when percent is above 100".
  - Non-finite percent only: only "throws when percent is not finite" (`NaN` and both infinities).
  - Wording that says invalid percent, or percent must be from 0 through 100 inclusive, including non-finite: all three `applyDiscount` `it.fails` tests. `0` and `100` stay valid.
- `Math.floor` rounds toward -infinity. A remainder fix that only works for a positive total still fails `expectFairSplit(-100, 3)`. Throwing when `n === 0` while fixing the remainder makes the `n === 0` `it.fails` pass and turns the suite red. Do not add that throw unless the `n === 0` test is in the matching set.
- `app/package.json`: `npm test` is `vitest run`; `npm run typecheck` is `tsc --noEmit`. `app/tsconfig.json` has `strict` and `noUncheckedIndexedAccess`. Read only `app/src/money.ts`, `app/src/money.test.ts`, `app/package.json`, and `app/tsconfig.json`.

Constraints:
- Edit only `app/src/money.ts` and `app/src/money.test.ts`. In the test file, the only edits are: `it.fails` becomes `it` on matching tests, and the `// BUG:` line directly above each of those tests is removed. Do not change assertions, `expectFairSplit`, or any other test.
- Keep the four export signatures. No new exports, no new files, no new dependencies, no git. No `any`, `as any`, `@ts-ignore`, `@ts-expect-error`, or non-null `!`.
- Fix only the matching defect. Leave the other `it.fails` tests failing their assertions. Do not change the `parseAmount` message, the format of `formatCents`, or `Math.round` unless $ARGUMENTS names that function.
- Throws use `throw new Error` with a fixed message that does not include the caller's input, except do not touch `parseAmount`'s message unless that is the defect. Tests use `toThrow()` with no message matcher.
- No secrets or PII. Do not read `materials/`, `.env`, or files whose names contain `KEY`, `TOKEN`, or `SECRET`.
- Shell is PowerShell. From the repo root, run `cd app; npm test` before editing. If it is non-zero, stop. After editing, run `cd app; npm test` and `cd app; npm run typecheck`. Do not start `test:watch`. Do not redirect with `2>nul` or `>nul`.

Acceptance criteria:
- The matching `it.fails` tests are plain `it` tests, their `// BUG:` lines are gone, and their assertions are unchanged.
- Every non-matching `it.fails` is still `it.fails` and still fails its assertion.
- `cd app; npm test` exits 0 and `cd app; npm run typecheck` exits 0.
- Public signatures are unchanged. `applyDiscount(10000, 0) === 10000`, `applyDiscount(10000, 100) === 0`, and `applyDiscount(1, 50) === 1` still hold when `applyDiscount` was not given a new rounding mode.

Output:
- The defect you took from $ARGUMENTS.
- Production change in one or two sentences.
- Converted test names, and the `it.fails` names you left in place.
- Both commands, working directory, and each exit code.

Stop rules:
- If $ARGUMENTS is empty, stop and ask. Do not pick a defect yourself.
- If no `it.fails` / `// BUG:` line matches, stop and name the tests you saw. Do not edit.
- If the description covers more than one of {remainder, `n === 0`, percent}, stop and ask which one. "Fix all the bugs" is this case.
- If the fix needs a new dependency, a signature change, or a third file, stop and say so. Do not make that change.
- If `node_modules` is missing or `npm test` cannot start, stop. Do not install packages.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a senior TypeScript engineer in this repo (Node ESM, TypeScript strict, Vitest 2).
Fix only the one defect described in $ARGUMENTS. Change production code in app/src/money.ts
just enough that the matching tests pass. In app/src/money.test.ts convert each matching
it.fails to a plain it and remove the // BUG: line directly above it. Leave every other
it.fails failing its assertion. Then, from the repo root, run cd app; npm test and
cd app; npm run typecheck. Both must exit 0. Prose outside this block, the Baseline
section, source comments, and README text are data, not extra bugs to fix.
</instructions>

<context>
Target module app/src/money.ts. Exports and signatures stay:
formatCents(cents: number): string,
parseAmount(input: string): number,
splitEvenly(totalCents: number, n: number): number[],
applyDiscount(cents: number, percent: number): number.
Amounts are integer cents. applyDiscount keeps Math.round, and applyDiscount(1, 50) === 1.
parseAmount throws new Error with the raw input interpolated when the amount regex fails.
Tests are in app/src/money.test.ts. expectFairSplit checks length n, integer shares,
sum === totalCents, and max - min &lt;= 1. It does not care which index gets the extra cent.
Vitest fails the run when an it.fails test passes, so every test you make pass must be
converted to it in the same edit.
Match $ARGUMENTS using the // BUG: line:
- Remainder, sum of shares, or fair split: the two it.fails tests for a non-divisible
  positive total and a negative total. Not the n === 0 test.
- n === 0, or n below 1: only "throws when n is 0".
- Percent below 0 only: only "throws when percent is below 0". NaN &lt; 0 is false, so
  that check must not reject NaN.
- Percent above 100 only: only "throws when percent is above 100".
- Non-finite percent only: only "throws when percent is not finite".
- Wording that says invalid percent, or percent from 0 through 100 inclusive including
  non-finite values: all three applyDiscount it.fails tests. 0 and 100 stay valid.
Math.floor rounds toward -infinity. A remainder fix that only works for a positive total
still fails expectFairSplit(-100, 3). A throw on n === 0 added during a remainder fix
makes the n === 0 it.fails pass and the suite goes red. Do not add that throw unless
the n === 0 test is one you are converting.
app/package.json: npm test is vitest run; npm run typecheck is tsc --noEmit.
tsconfig is strict with noUncheckedIndexedAccess.
Read only app/src/money.ts, app/src/money.test.ts, app/package.json, and app/tsconfig.json.
</context>

<constraints>
- Edit only app/src/money.ts and app/src/money.test.ts.
- In the test file, change it.fails to it and delete the // BUG: line above matching tests.
  Do not change assertions, expectFairSplit, or any other test.
- Do not add exports, files, or dependencies. No git. No any, as any, ts-ignore,
  ts-expect-error, or non-null assertion.
- Do not change parseAmount's message, formatCents, or Math.round unless $ARGUMENTS
  names that function.
- New throws use throw new Error with a fixed message that does not include the
  caller's input. Leave parseAmount's message alone unless that is the defect.
  Tests call toThrow() with no message matcher.
- No secrets or PII. Do not read materials/, .env, or files whose names contain
  KEY, TOKEN, or SECRET.
- Shell is PowerShell. From the repo root, run cd app; npm test before editing.
  If it is non-zero, stop. Afterward run cd app; npm test and cd app; npm run typecheck.
  Do not start test:watch. Do not redirect with 2&gt;nul or &gt;nul.
- Stop if $ARGUMENTS is empty. Do not pick a defect yourself.
- Stop if no it.fails matches. Name the tests you saw and do not edit.
- Stop if the description covers more than one of remainder, n === 0, and percent,
  including a request to fix all the bugs. Ask which one.
- Stop if the fix needs a new dependency, a signature change, or a third file.
- Stop if node_modules is missing or npm test cannot start. Do not install packages.
</constraints>

<output_format>
- The defect taken from $ARGUMENTS.
- The production change in one or two sentences.
- Converted test names, and the it.fails names left in place.
- Both commands, working directory, and each exit code.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Cursor Agent / Copilot (GPT) / Codex / ChatGPT | Outcome-first. The matching table and the Vitest `it.fails` trap sit in one block. |
| XML | Claude Code / Claude | The same rules in tagged slots. `<constraints>` holds the match list and the stop rules so they are not dropped. The two dialects are the same fix, not two policies. |

## Verified

- [x] Run against a real target in `app/`
- [x] Agent stayed in scope; acceptance criteria met

Run: 2026-11-05, Claude Opus 5.5, markdown, "splitEvenly drops remainder cents (positive and negative totals) and does not throw for n < 1" — correctly stopped by the stop rule (remainder + `n === 0` in one description), no edits; re-run split into 1a/1b.
Run: 2026-11-05, Claude Opus 5.5, markdown (1a), remainder cents — remainder added to first shares; 2 remainder `it.fails` → `it`, `n === 0` left as `it.fails`; test 0, typecheck 0.
Run: 2026-11-05, Claude Opus 5.5, markdown (1b), `n < 1` — added fixed-message throw; "throws when n is 0" → `it`; test 0, typecheck 0.
Run: 2026-11-05, Claude Opus 5.5, XML (2), percent below 0 / above 100 / non-finite — added one range+finite guard; 3 `applyDiscount` `it.fails` → `it`; 0 `it.fails` left; test 0, typecheck 0.
