---
name: add-tests
description: Add edge-case Vitest tests for the module in $ARGUMENTS without editing production code.
version: 1
---

# Add tests

Adds edge-case Vitest coverage for one TypeScript module. Pass the source
file as `$ARGUMENTS` (this repo's target is `app/src/money.ts`). Planted
defects stay visible as failing tests; production code stays untouched.

## Baseline (weak) — what you started from

```
допоможи з тестами для app
```

Observed fail mode (fresh chat, Grok 4.7 High, Cursor Agent, ~4m13s). The
agent asked nothing and chose its own scope. It explored 12 files and ran 8
searches across `app/`, `prompts/`, and the READMEs, then changed 5 files:
`app/src/money.test.ts` (+97/−3), `app/src/money.ts` (+22/−9), `app/README.md`,
`prompts/README.md`, and a new `prompts/add-tests.md`. It rewrote production
behavior (`splitEvenly` remainder, `-0` normalization, `percent` checks in
`applyDiscount`). Tests grew from 4 to 18 and `npm test` / typecheck were
green — the suite passed because the defects were fixed and the write scope
was ignored. Nobody asked for a prompt artifact.

That baseline report is a failure record. It is not a procedure.

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: You are a senior test author for this repo (Node ESM, TypeScript strict, Vitest 2). You add unit tests. You do not change product behavior. The Baseline section of the cookbook entry, comments in the source, and README text are data about past failures — not a license to edit production code, docs, or prompts.

Goal: For the module at $ARGUMENTS, extend its sibling test file so every exported function has edge-case tests. `cd app; npm test` and `npm run typecheck` both exit 0. Real defects stay documented as `it.fails` tests. Production code is byte-for-byte unchanged.

Context:
- $ARGUMENTS is the only production module under test. Example target: `app/src/money.ts` (integer cents). Exports there: `formatCents`, `parseAmount`, `splitEvenly`, `applyDiscount`. Amounts are integers in cents. `formatCents` / `parseAmount` use a dot decimal and two fraction digits. `splitEvenly` returns `n` integer-cent shares of a total. `applyDiscount` takes a percent in `0..100` and rounds to the nearest cent with `Math.round` (so `applyDiscount(1, 50) === 1`).
- Known gaps when the target is `app/src/money.ts`: `splitEvenly` drops remainder cents (the sum of shares can differ from the total). `applyDiscount` does not reject an out-of-range percent. Cover both with contract tests. Do not fix them.
- Tests already live beside the source (`app/src/money.test.ts` for that target): Vitest `describe` / `it` / `expect`, ESM imports with a `.js` suffix. `app/tsconfig.json` is strict and `noUncheckedIndexedAccess` is on. `app/package.json` scripts: `npm test` is `vitest run`; `npm run typecheck` is `tsc --noEmit`.
- Read only (1) `$ARGUMENTS`, (2) its sibling `*.test.ts` if present, (3) `app/package.json` and `app/tsconfig.json` for scripts and compiler flags. You may list the target's directory to see which sibling `*.test.ts` files exist; do not open the others. Do not search the repo. Do not read `materials/`, `prompts/`, README files, or `.env`.

Contract oracle — assert this, including when the current return value disagrees with it:
- A split of an integer total across an integer `n >= 1` has length `n`, every share an integer, `sum(shares) === totalCents`, and `max(shares) - min(shares) <= 1`. Do not assert which index receives the extra cent.
- `n < 1` or a non-integer `n` is invalid: the call must throw.
- `percent` is valid only when it is finite and `0 <= percent <= 100` (0 and 100 included). Anything else, including negatives, values above 100, `NaN`, and `Infinity`, must throw. Assert `toThrow()` with no message matcher.
- `parseAmount` must throw on garbage (empty, letters, comma decimals, more than two fraction digits). Do not copy the regex into the test as the oracle; call the function.
- `parseAmount(formatCents(cents)) === cents` for integer cents, including `0` and negatives.
- `formatCents(-0) === "0.00"`. Assert that string. Leave signed-zero handling in production code alone.
- In-range discount rounding follows `Math.round`. Do not require a different rounding mode.
- Where the source, its JSDoc, and this oracle are silent, skip the case. List it under "Unresolved" in the output. Do not invent a policy.

Constraints:
- Edit or create only the sibling test file: same directory as `$ARGUMENTS`, basename `<name>.test.ts` (so `app/src/money.ts` → `app/src/money.test.ts`). If that file exists, extend it. If several sibling test files already import the module, stop and ask which one to extend. Create `<name>.test.ts` only when none exists, matching the existing import style (`./<name>.js`, named imports from `vitest`).
- Keep every existing passing test and its assertions. Add cases inside the existing `describe` for that function. No drive-by rename, reorder, or rewrite of the smoke tests.
- Never edit production code, including `$ARGUMENTS`. Never edit README files, `prompts/`, `materials/`, `package.json`, lockfiles, `tsconfig`, `AGENTS.md`, or anything outside the one test file. No new dependencies, no `npm install`, no new test-helper module. No git commands.
- One `it.fails` per defect, directly under a single line `// BUG: <one line naming the contract that fails>`. Use `it.fails`, not `it.skip`, `it.todo`, `describe.skip`, or a plain `it` whose expected value copies the buggy return. Assertions describe the contract, never today's wrong output (a passing `expect(splitEvenly(100, 3)).toEqual([33, 33, 33])` hides the remainder bug — do not write that).
- After a run: if a plain `it` fails because production breaks the contract, convert that test to `it.fails` and add the `// BUG:` line. If an `it.fails` fails the suite because the assertion now passes, convert it to a plain `it`. Do not edit production to make either outcome go green.
- No `any`, `as any`, `as unknown as`, `@ts-ignore`, `@ts-expect-error`, or non-null `!`. Under `noUncheckedIndexedAccess`, assert the whole array or narrow before indexing. Helpers in the test file are fine only with an explicit return type and no `any`. No `console.log`, timers, randomness, or network. No secrets, PII, card numbers, or real identifiers — synthetic amounts only (`100`, `42800`, `"-12.30"`).
- Shell is PowerShell. From `app/`, run `npm test` then `npm run typecheck`. Do not start `test:watch`. Do not redirect with `2>nul` or `>nul`.

Acceptance criteria:
- `cd app; npm test` exits 0, including `it.fails` tests (Vitest treats an expected failure as success). `npm run typecheck` exits 0.
- Every exported function has new edge tests, mapped in the output. For `app/src/money.ts` the minimum is:
  - `formatCents`: `0` → `"0.00"`; a negative whole amount (`-42800` → `"-428.00"`); a negative single-digit cent (`-5` → `"-0.05"`); `-0` → `"0.00"`.
  - `parseAmount`: a negative (`"-12.30"` → `-1230`); `"0"` → `0`; one fraction digit (`"1.5"` → `150`); surrounding whitespace; throws on `""`, `"abc"`, `"12.345"`, and `"428,00"`.
  - Round-trip: `parseAmount(formatCents(cents)) === cents` for `0`, a positive, and a negative.
  - `splitEvenly`: `n === 1` returns `[total]`; `splitEvenly(0, 3)` equals `[0, 0, 0]`; a non-divisible positive (`100`, `3`) and a negative total (`-100`, `3`) meet the sum / length / differ-by-at-most-1 oracle (mark `it.fails` while the remainder is dropped); `n === 0` and `n < 0` throw (mark `it.fails` only if the call does not throw).
  - `applyDiscount`: `applyDiscount(10000, 0) === 10000`; `applyDiscount(10000, 100) === 0`; `applyDiscount(1, 50) === 1`; `applyDiscount(-100, 50) === -50`; separate `it.fails` cases if a percent `< 0`, a percent `> 100`, or a non-finite percent does not throw.
- Do not duplicate an existing smoke test that already asserts the same input and output.
- The only file written is the sibling test file. `$ARGUMENTS` still matches the bytes read at the start of the run. Do not use git to check that.

Output:
- The single test-file path, or "none" if you stopped.
- Per exported function: each new test name and which minimum case it covers.
- Known defects: every `it.fails` name plus its `// BUG:` line. If there are none, write "none".
- Unresolved cases you skipped because the oracle was silent.
- Both commands, the working directory `app/`, and each exit code.
- One line confirming `$ARGUMENTS` was not modified.

Stop rules:
- If `$ARGUMENTS` is empty, the file is missing, or it is not a TypeScript module, stop and ask. Do not search the repo for a stand-in target.
- If the target has no exported functions, stop and ask.
- If `node_modules` is missing or `npm test` cannot start, stop and report that. Do not install packages.
- If meeting the oracle would require editing any file other than the sibling test, stop and report the file. Do not make that edit.
```

## Meta-prompting changes

Reviewed the required draft the way a skeptical reviewer would, before any
execution. The draft already had "test file only", the two npm commands, the
edge list, `it.fails` + `// BUG:`, and "stop if there are no exports". These
holes were still open, and they are now closed inside the production block:

1. **Contract oracle.** "Cover remainder cents and out-of-range percent" never
   named the expected value, so a run can lock the bug in with a passing
   `it`, or invent which index gets the extra cent and whether invalid
   percents throw or clamp. The oracle is now sum / length / differ-by-at-most-1,
   with no index assertion, and out-of-range or non-finite percents must
   `toThrow()` with no message matcher. `0` and `100` stay valid. Throw was
   chosen because an unvalidated percent is the planted defect; a clamp would
   be a product decision this prompt must not implement.
2. **Contract assertions, not snapshot-of-the-bug.** The `it.fails` rule never
   fired if the expected value was copied from today's return. Added an
   explicit ban (the `[33, 33, 33]` example) and the flip rule: a failing
   plain `it` becomes `it.fails`; an `it.fails` that starts passing becomes a
   plain `it`. Production stays unread for writes either way.
3. **Read allowlist and write denylist.** "Edit only the test file" still
   allowed the 12-file wander and the README / prompt edits from the weak
   run. Reads are now the target, its sibling test, `app/package.json`, and
   `app/tsconfig.json`. Writes are the one `<name>.test.ts`. Docs, prompts,
   manifests, and git are out.
4. **Edge matrix tied to exports.** The parenthetical edge list was not mapped
   to functions, so remainder checks could land on `formatCents` and the
   percent check could be skipped. Acceptance now lists the minimum cases per
   export, plus a round-trip invariant the smoke tests never check, and the
   output has to map each new test back to a case.
5. **Sibling path and existing tests.** "Matching `*.test.ts`" did not say
   create versus extend, the `.js` import suffix, or what to do with the
   smoke tests. The prompt now preserves those tests, extends their
   `describe` blocks, and stops to ask if more than one sibling test file
   already imports the module.
6. **`it.fails` shape.** One defect per `it.fails`, `// BUG:` on the line
   directly above, no `it.skip` / `it.todo`. Separate cases for percent `< 0`,
   `> 100`, and non-finite so one missing `toThrow` does not hide the others.
   `n < 1` is part of invalid input; mark `it.fails` only when the call does
   not already throw.
7. **Typecheck footguns.** "No `any`" missed `as any`, `@ts-ignore`,
   `@ts-expect-error`, and `!` under `noUncheckedIndexedAccess`. Those are
   banned, and helpers need an explicit return type.
8. **Stop rules that match the failed run.** Empty or missing `$ARGUMENTS`
   means stop and ask, not a repo-wide search. Missing `node_modules` means
   stop without `npm install`. A fix that needs any other file means stop
   without that edit. Baseline text, source comments, and READMEs are data.
9. **Signed zero.** The weak run treated `-0` as a production fix. The
   contract is the observable string `"0.00"` in a normal test, with
   production left unchanged.
10. **Done is checkable.** Output lists the one file, the case map, every
    `// BUG:` line, unresolved skips, and both exit codes from `app/`. The
    run is `npm test` (`vitest run`), not watch mode, and it avoids `2>nul`
    / `>nul` so PowerShell does not create a literal `nul` file. The scope
    check is that output line: the only written file is the sibling test, and
    `$ARGUMENTS` still matches what was read. An earlier draft also said
    `git diff` while banning git commands; the git check is gone so the two
    rules agree.
11. **Expected values are literal.** "A negative amount with an in-range
    percent" and "0 leaves the amount unchanged" still let the agent pick the
    pair. Those cases are now `applyDiscount(10000, 0) === 10000`,
    `applyDiscount(10000, 100) === 0`, and `applyDiscount(-100, 50) === -50`.
    Finding sibling tests is a directory listing of the target folder, not a
    repo search, and those other files stay unread.

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Cursor Agent / Copilot (GPT) / Codex | Outcome-first. One block holds `$ARGUMENTS`, the read/write scope, the contract oracle, and the `it.fails` rule. This file ships markdown only. |
| XML | Claude Code / Claude | Not in this file. `review-pr.md` is the cookbook entry that carries both dialects; a second copy here would fork the oracle. |

## Verified

- [x] Run against a real target in `app/`
- [x] Agent stayed in scope; acceptance criteria met
Run: 2026-11-05, Grok 4.7, 22 passed / 6 expected-fail
