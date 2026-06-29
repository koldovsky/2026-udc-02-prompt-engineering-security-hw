---
description: Add Vitest edge-case tests for a module (tests only). Usage:/add-tests app/src/money.ts
---

Full spec: `prompts/add-tests.md` (markdown dialect).

**Target module:** `$ARGUMENTS` (default: `app/src/money.ts`)
**Test file:** paired `*.test.ts` next to the module (e.g. `app/src/money.test.ts`).

Role: TypeScript engineer in this repo (Node 22, vitest, ESM, `*.js` import suffix). **Add tests only.**

Goal: Extend the paired test file with edge-case Vitest coverage for **all exports** in the target module.

Context:
- Integer cents; keep existing smoke tests — add what's missing.
- Verify: `cd app && npm test && npm run typecheck`.

Constraints:
- Edit **only** the paired `*.test.ts` — no changes to the target module or `package.json`.
- No new dependencies; do not change the public API.
- One assertion theme per `it()`; descriptive test names.
- No secrets or PII in test data.

Acceptance criteria:
- `cd app && npm test` and `npm run typecheck` exit 0.
- At least one new `it()` per exported function.
- Cover: negatives/zero formatting, parse errors + trim, uneven split (skip/todo if prod wrong), discount boundaries.
- List any `it.skip` / `it.todo` with a one-line reason in output.

Output: updated test file + bullet list (function → test name → assertion).

Stop rules:
- If the module has no exports, stop and say so.
- **Do not fix production code** — skip/todo and explain.
- Stop when AC pass; no unrelated refactors.
