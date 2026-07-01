# AGENTS.md — app/

Guidance for an Agentic IDE working specifically inside `app/`. See the
repo-level [AGENTS.md](../AGENTS.md) for the broader homework context and
security guardrails (they still apply here).

## Stack

- **Language:** TypeScript (`^5.6`), strict mode, ES2022 target, ESM
  (`"type": "module"`).
- **Runtime/tooling:** Node.js, no framework — a tiny standalone module.
- **Test runner:** [Vitest](https://vitest.dev) (`^2.1`), globals enabled via
  `tsconfig.json` (`types: ["vitest/globals"]`).
- **No bundler, no linter config present** — keep the code dependency-free
  unless there's a strong reason to add something.

## Commands

Run from inside `app/`:

```bash
npm install        # install dependencies
npm test           # vitest run — run the test suite once
npm run test:watch # vitest — watch mode
npm run typecheck  # tsc --noEmit — type-check only, no emit
```

Before considering any change to `app/` done, `npm test` and
`npm run typecheck` must both pass.

## Project layout

- `src/money.ts` — integer-cent money helpers (`formatCents`, `parseAmount`,
  `splitEvenly`, `applyDiscount`).
- `src/money.test.ts` — Vitest smoke/unit tests for the above.

## Conventions

- **Clean code:** small, single-purpose functions; descriptive names over
  abbreviations; avoid deep nesting; prefer early returns for guard clauses.
- **Types over comments:** rely on TypeScript's `strict` mode and explicit
  types/signatures to document intent. Only add comments to explain
  *non-obvious* reasoning (e.g. rounding/remainder handling), never to
  narrate what a line already says.
- **Money handling:** amounts are integer cents — never use floating-point
  math for currency. Validate inputs (e.g. reject negative/non-integer
  values) at the boundary of a function rather than deep inside logic.
- **Tests:** every exported function should have at least one test covering
  its happy path and its edge cases (zero, negative, remainder/rounding,
  invalid input). Keep tests deterministic and framework-idiomatic
  (`describe`/`it`/`expect` from Vitest).
- **No hand-fixing planted exercises:** if you notice a bug while exploring
  `src/money.ts`, don't silently patch it — this module is an intentional
  cookbook-prompt target (see `README.md`). Drive fixes through a prompt
  (e.g. `/review`, `/add-tests`, `/fix-bug`) unless the user explicitly asks
  for a direct fix.
- **Never read or print `app/.env`** — it's local-only and gitignored.
