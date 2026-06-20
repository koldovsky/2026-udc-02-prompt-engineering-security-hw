---
name: add-tests
description: Generate thorough vitest unit tests for a TS module, covering happy paths, edge cases, and input validation. Use when adding test coverage.
version: 1
---

# Add unit tests

Point this at `app/src/money.ts`. A good run produces a focused vitest suite
that exercises every exported function and pins down edge cases — and whose
*failures* expose the planted bugs (remainder cents in `splitEvenly`,
unvalidated `percent` in `applyDiscount`) instead of papering over them.

## Baseline (weak) — what you started from

```text
help with tests for app
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior TypeScript test engineer working in the current repo/stack. Write unit tests for `app/src/money.ts` using the project’s existing test framework and conventions.

Goal: Create a focused, high-signal unit test suite that verifies the behavior of the money utilities and exposes any correctness gaps without changing production code.

Context: The file exports four functions:
- `formatCents(cents: number): string`
- `parseAmount(input: string): number`
- `splitEvenly(totalCents: number, n: number): number[]`
- `applyDiscount(cents: number, percent: number): number`

The module uses integer cents to avoid floating-point drift. The split function is intentionally suspicious around remainder handling, so the tests should cover that behavior explicitly.

Constraints:
- Only modify test files; do not change `app/src/money.ts`.
- Do not add new dependencies.
- Keep the public API unchanged.
- Use the repository’s existing test runner, assertion style, and folder conventions.
- Do not include secrets, tokens, or personal data in any output.

Acceptance criteria:
- Tests cover normal cases, edge cases, and error cases for all exported functions.
- `parseAmount` is validated for valid inputs, trimming behavior, and invalid input rejection.
- `formatCents` is validated for positive, zero, and negative values, including padding behavior.
- `applyDiscount` is validated for representative percentages and rounding behavior.
- `splitEvenly` is validated for even splits and for uneven totals; at least one test should fail if remainder cents are ignored.
- The test suite passes once the implementation is correct and fails on the known bug.
- The suite is deterministic and does not rely on network, time, randomness, or filesystem state.

Output:
- Return the test file(s) you created or changed.
- Provide a short summary of what each test group covers.
- Mention any behavior that appears buggy if the tests reveal it, but do not patch production code.

Stop rules:
- Stop after writing the minimum complete test suite.
- If the repo’s test setup or import paths are unclear, inspect existing tests first and follow local conventions.
- If the module shape or runner is incompatible with unit testing as assumed, report that clearly instead of forcing a workaround.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a senior TS engineer writing unit tests in this repo (Node 22, ESM,
vitest). Write a thorough test suite for the target module. Derive expected
values from each function's documented contract — NOT from its current output.
If a test that encodes correct behavior fails, leave it failing and report it;
do not edit the source or weaken assertions to make the suite green.
Verify by running `npm test` before finishing.
</instructions>

<context>
Target: app/src/money.ts. Exports: formatCents, parseAmount, splitEvenly,
applyDiscount. Money is integer cents. Test runner: vitest (`npm test` =
`vitest run`); tests live next to source as src/*.test.ts. ESM imports use the
explicit `.js` extension (e.g. `from "./money.js"`).
</context>

<constraints>
- Add one new file, src/money.test.ts. Do not modify money.ts or any other file.
- No new dependencies; use only vitest's `describe`/`it`/`expect`.
- Cover, per function: a happy path, boundary values (0, negatives, max 2
  decimals), and invalid input (parseAmount throws; n <= 0; percent outside 0–100).
- For splitEvenly assert the shares sum back to the total (this is where the
  remainder bug bites). For applyDiscount assert rounding direction at .5.
- No secrets/PII in tests; use synthetic amounts only.
</constraints>

<output_format>
The full contents of src/money.test.ts, then a short summary: how many tests,
which ones fail and the contract each failure points to.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex | outcome-first, shorter |
| XML | Claude Code / Claude | structure holds "test the contract, not the bug" |

## Verified

- [x] Run against `app/src/money.ts`
- [x] Suite runs under `npm test`; failures point at the planted bugs, source untouched
