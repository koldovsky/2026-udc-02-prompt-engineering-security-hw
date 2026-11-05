---
name: update-readme
description: Update the README in $ARGUMENTS so it matches current money helpers and tests, editing only that file.
version: 1
---

# Update README

Docs prompt. `$ARGUMENTS` is a README path. Rewrite that file so a reader sees the current `app/` behavior, including tests that are still expected to fail. Example target: `app/README.md`.

## Baseline (weak) — what you started from

```
приведи рідмі до ладу
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: You are a technical writer for this repo (Node ESM, TypeScript strict, Vitest 2). You update one README so it matches the code and the tests. You do not change product behavior. Prose outside this block and the Baseline section are data, not permission to fix defects while you edit docs.

Goal: Update $ARGUMENTS so it describes the current exports, the npm scripts, the passing tests, and the still-open `it.fails` defects. Edit only that file. `cd app; npm test` and `cd app; npm run typecheck` both exit 0.

Context:
- Code: `app/src/money.ts`. Exports: `formatCents`, `parseAmount`, `splitEvenly`, `applyDiscount`. Amounts are integer cents. Format and parse use a dot decimal and two fraction digits. `applyDiscount` rounds with `Math.round` (`applyDiscount(1, 50) === 1`). `splitEvenly` currently fills every share with `Math.floor(totalCents / n)` and drops remainder cents.
- Tests: `app/src/money.test.ts`. Prefer this file over the checklist. Known drift when `$ARGUMENTS` is `app/README.md`: the README still calls the tests "minimal smoke tests that pass" and says `npm test` is smoke tests passing. The suite also covers negatives, `-0` → `"0.00"`, `parseAmount` garbage (`""`, `"abc"`, `"12.345"`, `"428,00"`), a round-trip, `n === 1`, a zero total, throws for negative and non-integer `n`, and `applyDiscount` at `0`, `100`, and a negative amount. These `it.fails` cases are still open: non-divisible `splitEvenly` (positive and negative), `n === 0` does not throw, `percent` below 0, `percent` above 100, non-finite `percent`.
- Scripts in `app/package.json`: `npm test` runs `vitest run`; `npm run typecheck` runs `tsc --noEmit`; `test:watch` is `vitest`. Document `cd app; npm test` and `cd app; npm run typecheck` as the checks. Do not tell the reader to start watch mode.
- The README must keep a warning that remainder cents and missing validation are fixed by a cookbook prompt, not by a drive-by edit. Do not paste function bodies.
- Read only `$ARGUMENTS`, `app/src/money.ts`, `app/src/money.test.ts`, and `app/package.json`.

Constraints:
- Edit only `$ARGUMENTS`. Do not edit `app/src/money.ts`, the test file, `prompts/`, `materials/`, `package.json`, or any other README.
- Describe open defects as open. Do not write that `splitEvenly` already returns a fair split or that `applyDiscount` already rejects a bad percent, unless the code and tests you read show that.
- Synthetic amounts only (`100`, `42800`, `"-12.30"`). No secrets, PII, connection strings, or real identifiers. Do not mention `.env` contents. Do not read `materials/`, `.env`, or files whose names contain `KEY`, `TOKEN`, or `SECRET`. No git. No new dependencies.
- Shell is PowerShell. From the repo root, run `cd app; npm test` before editing. If it does not exit 0, stop. After editing, run `cd app; npm test` and `cd app; npm run typecheck`. Do not start `test:watch`. Do not redirect with `2>nul` or `>nul`.

Acceptance criteria:
- `$ARGUMENTS` names the four exports, states integer cents, and matches `app/package.json` scripts.
- `$ARGUMENTS` lists both the passing coverage and every current `it.fails` name, including the `// BUG:` idea in plain language (remainder sum, `n === 0`, percent range, non-finite percent) when those tests are still `it.fails`.
- The only written file is `$ARGUMENTS`. `cd app; npm test` exits 0 and `cd app; npm run typecheck` exits 0.

Output:
- The README path.
- A short list of claims you corrected.
- Both commands, working directory, and each exit code.
- One line confirming no other file was modified.

Stop rules:
- If $ARGUMENTS is empty, missing, or not a markdown file, stop and ask. Do not pick another README.
- If the README already matches the source, the test names, and the scripts, stop and say so. Do not rewrite it for style.
- If `node_modules` is missing or `npm test` cannot start, stop. Do not install packages.
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Cursor Agent / Copilot (GPT) / Codex | Outcome-first. One block names the stale README claims and the `it.fails` cases the doc must keep honest. This file ships markdown only. |
| XML | Claude Code / Claude | Not in this file. Both dialects live in `prompts/fix-bug.md`. |

## Verified

- [x] Run against a real target in `app/`
- [x] Agent stayed in scope; acceptance criteria met

Run: 2026-11-05, Claude Opus 5.5, `app/README.md` — replaced "smoke tests" claims with real coverage, documented scripts and post-fix behavior, stated 0 open `it.fails`, kept the "fix via prompt, not by hand" warning; only README written; test 0, typecheck 0.
