---
name: refactor-extract-guards
description: Extract duplicated input validation in $ARGUMENTS into private guards, with identical behavior and the same public API.
version: 1
---

# Extract guard helpers

Refactor prompt. `$ARGUMENTS` is a TypeScript module. Pull input checks that already appear in two or more functions into small private helpers. Behavior and the public API stay the same. Example target: `app/src/money.ts`.

## Baseline (weak) — what you started from

```
винеси валідацію кудись
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: You are a senior TypeScript engineer for this repo (Node ESM, TypeScript strict, Vitest 2). You refactor structure only. Identical inputs must produce identical returns and identical throws. Prose outside this block, the Baseline section, source comments, and README text are not permission to close a correctness gap.

Goal: In $ARGUMENTS, extract repeated input validation into small private guard helpers. Public signatures stay the same. `cd app; npm test` and `cd app; npm run typecheck` exit 0 before the edit and after it.

Context:
- Example target `app/src/money.ts`. Exports, which must stay exported with the same signatures: `formatCents(cents: number): string`, `parseAmount(input: string): number`, `splitEvenly(totalCents: number, n: number): number[]`, `applyDiscount(cents: number, percent: number): number`.
- Validation that exists today: `parseAmount` throws `new Error(\`Not a valid amount: ${input}\`)` when `/^(-?)(\d+)(?:\.(\d{1,2}))?$/` fails. `splitEvenly` does not check `n` itself; `new Array(n)` throws `RangeError` when `n` is negative or not an integer, and `n === 0` does not throw. `applyDiscount` and `formatCents` do not validate.
- "Repeated" means the same predicate and the same thrown constructor and message at two or more call sites. A check that appears once is not repeated.
- These checks are absent and must stay absent unless they already exist at two sites when you read the file: `percent` inside `0..100`, `Number.isFinite` on `percent` or cents, `n === 0` must throw, remainder cents redistributed in `splitEvenly`. Adding any of them changes behavior and can make an `it.fails` test pass, which makes Vitest exit non-zero.
- Tests live in `app/src/money.test.ts`. `app/package.json`: `npm test` is `vitest run`; `npm run typecheck` is `tsc --noEmit`. `noUncheckedIndexedAccess` is on. Read only `$ARGUMENTS`, the sibling test file, `app/package.json`, and `app/tsconfig.json`.

Constraints:
- Edit only `$ARGUMENTS`. Helpers are non-exported functions in that file, with an explicit return type, no `any`, and no non-null `!`. No new file, no new dependency, no git, no test edits, no README edits.
- Each helper replaces an existing check. The thrown constructor and message stay the same, including the raw `input` inside `parseAmount`'s `Error`. Call the helper only at the sites that already had the check.
- Do not change `Math.floor`, `Math.round`, the format string, or the parse regex. Do not convert `it.fails` to `it` and do not delete `// BUG:` lines.
- No secrets or PII. Do not read `materials/`, `.env`, or files whose names contain `KEY`, `TOKEN`, or `SECRET`.
- Shell is PowerShell. From the repo root, run `cd app; npm test` and `cd app; npm run typecheck` before editing. If either is non-zero, stop. After a real edit, run both again. Do not start `test:watch`. Do not redirect with `2>nul` or `>nul`.

Acceptance criteria:
- Every extracted helper has at least two call sites. Public export names and signatures are unchanged.
- For the same inputs, returns and throws match the pre-edit behavior, including `parseAmount("abc")` still throwing an `Error` whose message contains that input, and `splitEvenly(100, 0)` still not throwing unless it already threw.
- `cd app; npm test` exits 0 and `cd app; npm run typecheck` exits 0 both before and after. Existing `it.fails` tests still fail their assertions.

Output:
- Either the helper names and their call sites, or "nothing to extract".
- Both commands before and after, working directory, and each exit code. If you stopped with no edit, the before codes are enough.
- One line confirming the public signatures are unchanged.

Stop rules:
- If $ARGUMENTS is empty, missing, or has no exports, stop and ask. Do not search the repo.
- If no predicate is duplicated, stop without editing and write "nothing to extract". Do not invent a guard to have something to extract.
- If the only extraction you can see would change a throw message, a return value, or which inputs throw, stop and name the site. Do not make that edit.
- If `node_modules` is missing or `npm test` cannot start, stop. Do not install packages.
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Cursor Agent / Copilot (GPT) / Codex | Outcome-first. One block defines "repeated", names the four signatures, and lists the checks that must not be invented. This file ships markdown only. |
| XML | Claude Code / Claude | Not in this file. Both dialects live in `prompts/fix-bug.md`. |

## Verified

- [x] Run against a real target in `app/`
- [x] Agent stayed in scope; acceptance criteria met

Run: 2026-11-05, Claude Opus 5.5, `app/src/money.ts` — stop rule "nothing to extract": the three checks (parse regex, `n < 1`, percent range) each appear once with different messages; no edit; test 0, typecheck 0.
