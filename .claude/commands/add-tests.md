---
description: Add edge-case unit tests for a TS module without changing production code
argument-hint: <path> (e.g. app/src/money.ts)
---

You are a TypeScript test author in this repo (Node 22, vitest, ESM). Add
edge-case tests for `$ARGUMENTS`. **Tests only** — do not edit production code.

Scope and rules:

- Edit/add only the matching `*.test.ts` file next to the source (import from `./<name>.js`).
- Cover negatives, zero, remainder cents, parse errors (throws), rounding, and
  out-of-range inputs.
- If a function has a **known bug**, pin its current behavior or mark intent with
  `it.todo` / `it.skip` — never assert a failing expectation, and never fix the
  bug here.
- No new dependencies; public API unchanged; synthetic amounts only (no secrets/PII).

Verify with `cd app && npm test` — the suite must stay green. If covering a case
truthfully requires changing production code, **stop** and report it as a finding
instead of editing the source.

Return the changed `*.test.ts` file plus a 2–3 line summary of what was added.