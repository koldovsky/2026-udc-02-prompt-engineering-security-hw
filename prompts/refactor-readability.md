---
name: refactor-readability
description: Improve readability of the one function named in $ARGUMENTS without changing behavior or the public API.
version: 1
---

# Readability refactor

Refactor prompt. `$ARGUMENTS` names one function. Clarify that function with naming, an early return, or a short comment. Returns, throws, and the other functions stay the same. Example argument: `parseAmount` or `app/src/money.ts formatCents`.

## Baseline (weak) — what you started from

```
перепиши функцію красивіше
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: You are a senior TypeScript engineer for this repo (Node ESM, TypeScript strict, Vitest 2). You improve readability of a single function. Identical inputs must produce identical returns and identical throws. Prose outside this block, the Baseline section, and source comments are not permission to fix a bug while you rename locals.

Goal: Improve the readability of the one function named in $ARGUMENTS. `cd app; npm test` and `cd app; npm run typecheck` exit 0 before the edit and after it. The public API is unchanged.

Context:
- The module is `app/src/money.ts`. Allowed names: `formatCents`, `parseAmount`, `splitEvenly`, `applyDiscount`. `$ARGUMENTS` is one of those names, optionally prefixed by `app/src/money.ts`.
- Behavior you must preserve for the function you touch:
  - `formatCents`: `-0` formats as `"0.00"` because `-0 < 0` is false. Keep that result.
  - `parseAmount`: keep the regex `/^(-?)(\d+)(?:\.(\d{1,2}))?$/` and the message `` `Not a valid amount: ${input}` `` (raw `input`).
  - `splitEvenly`: keep `Math.floor(totalCents / n)` and `new Array(n).fill`. Do not redistribute remainder cents. Do not add a throw for `n === 0`.
  - `applyDiscount`: keep `Math.round(cents * (1 - percent / 100))`. Do not add a percent check.
- Tests in `app/src/money.test.ts` include plain `it` cases and `it.fails` cases. A green `npm test` (`vitest run`) still expects those `it.fails` assertions to fail. `npm run typecheck` is `tsc --noEmit`. `noUncheckedIndexedAccess` is on.
- Read only `app/src/money.ts`, `app/src/money.test.ts`, `app/package.json`, and `app/tsconfig.json`.

Constraints:
- Edit only the body and the comments of the one named function in `app/src/money.ts`. Do not change its signature. Do not edit the other three functions, the tests, READMEs, `prompts/`, or `materials/`.
- Allowed changes: clearer local names, an early return that returns the same value the previous control flow returned (including `NaN` and `-0`), and at most one comment of two lines on the least obvious expression. The comment describes current behavior.
- No `any`, `as any`, `@ts-ignore`, `@ts-expect-error`, or non-null `!`. No new dependency. No git. No secrets or PII. Do not read `materials/`, `.env`, or files whose names contain `KEY`, `TOKEN`, or `SECRET`.
- Do not convert `it.fails` to `it` and do not delete `// BUG:` lines.
- Shell is PowerShell. From the repo root, run `cd app; npm test` and `cd app; npm run typecheck` before editing. If either is non-zero, stop. After the edit, run both again. Do not start `test:watch`. Do not redirect with `2>nul` or `>nul`.

Acceptance criteria:
- Exactly one function differs, and only in locals, control-flow shape, or a single short comment. Signatures of all four exports are unchanged.
- `formatCents(-0)` is still `"0.00"`, `parseAmount("abc")` still throws an `Error` containing `abc`, and the remainder / percent gaps are still open unless the body you read had already closed them.
- `cd app; npm test` exits 0 and `cd app; npm run typecheck` exits 0 both before and after. Every pre-existing `it.fails` still fails its assertion.

Output:
- The function name and a one-line description of the readability change.
- Both commands before and after, working directory, and each exit code.
- One line confirming the other three functions and the test file were not modified.

Stop rules:
- If $ARGUMENTS is empty, names more than one function, or names anything other than the four exports, stop and ask. Do not search the repo.
- If every readability idea you have would change a return value, a thrown message, or which inputs throw, stop and say so. Do not make that edit.
- If `node_modules` is missing or `npm test` cannot start, stop. Do not install packages.
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Cursor Agent / Copilot (GPT) / Codex | Outcome-first. One block names the only legal function and the per-function behavior that readability work must keep. This file ships markdown only. |
| XML | Claude Code / Claude | Not in this file. Both dialects live in `prompts/fix-bug.md`. |

## Verified

- [x] Run against a real target in `app/`
- [x] Agent stayed in scope; acceptance criteria met

Run: 2026-11-05, Claude Opus 5.5, `parseAmount` — renamed `whole`/`frac` to `wholeDigits`/`fractionDigits` and added one comment on the tenths padding; regex and message unchanged; test 0, typecheck 0.
