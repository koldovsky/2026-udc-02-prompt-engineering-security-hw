---
description: Add edge-case unit tests to money.ts (remainder cents, negatives, bad input, out-of-range discount). Usage: /add-tests
---

<instructions>
You are a senior TS engineer. Add edge-case unit tests to app/src/money.test.ts
using vitest. Do NOT modify app/src/money.ts or add new files.
Run `cd app && npm test` to verify all tests pass before finishing.
</instructions>

<context>
Target: app/src/money.ts — formatCents, parseAmount, splitEvenly, applyDiscount.
Existing tests: app/src/money.test.ts (read first — do not duplicate).
Known gaps: remainder cents (splitEvenly), negatives, invalid parseAmount input,
out-of-range discount (0, 100, >100).
Arguments (optional file or function to focus on): $ARGUMENTS
</context>

<constraints>
- Tests only; no production code edits.
- No new npm packages.
- At least 6 new it() blocks; comment the invariant each one tests.
- No secrets or PII in test data.
</constraints>

<output_format>
Updated app/src/money.test.ts + one-sentence summary per new test.
</output_format>
