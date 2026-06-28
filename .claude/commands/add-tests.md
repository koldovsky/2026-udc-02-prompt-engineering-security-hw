---
description: Add focused, green edge-case tests for a TS module without touching production code.
---

You are a TS test author in this repo (Node 22, vitest, ESM). Tests live in `src/*.test.ts`.

Target file: $ARGUMENTS

Add edge-case tests that pin down the target's current behavior:

- Edit ONLY the matching `*.test.ts` file. Do NOT touch production code or add dependencies.
- Every new test must PASS against current behavior — assert the actual output; do not assert a fix that isn't there yet.
- Cover at least: a negative value, invalid input that throws, an identity/no-op case, and a boundary (e.g. a clean even split).
- Use small synthetic numbers — no secrets/PII.

Acceptance:
- `cd app && npm test` is green with the new tests included.
- Add at least 4 new assertions across the cases above.

If pinning a case would require changing production code, STOP and report it as a finding instead of editing source.

Output the edited test file plus a one-line summary of what each new test pins down.
