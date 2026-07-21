# app/AGENTS.md

Scoped guidance for agents working inside `app/` only (see root `AGENTS.md`
for repo-wide rules).

## Stack

- TypeScript (ESM, `"type": "module"`), no framework — plain functions.
- Test runner: **Vitest**. Type checking: `tsc --noEmit` (no build step; this
  package is not published/bundled).

## Commands

```bash
npm install
npm test          # vitest run — must stay green before/after any change
npm run test:watch
npm run typecheck # tsc --noEmit
```

## Conventions

- Money is always **integer cents** (`number`), never floats — see
  `src/money.ts` header comment. Don't introduce `parseFloat`/decimal math.
- Invalid input **throws** (`Error` for shape, `RangeError` for out-of-range),
  it never returns `NaN` or a silently-wrong value. New functions should
  follow the same contract.
- Constants (`CENTS_PER_UNIT`, `MAX_FRACTION_DIGITS`, `MIN_PERCENT`,
  `MAX_PERCENT`) live at the top of `money.ts`; reuse them instead of
  re-hardcoding `100` / `0` / `100`.
