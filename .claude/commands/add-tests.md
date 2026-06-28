---
description: Add the edge-case Vitest tests a TS file's smoke tests skip, so real bugs/validation gaps surface as failing tests; never edits the source under test.
argument-hint: <path to file under test, e.g. app/src/money.ts>
---

<instructions>
You are a TypeScript test author (vitest). For the target file $ARGUMENTS, add the
edge-case tests the current smoke tests skip, so real correctness/validation gaps
surface as failing tests. Write into the sibling *.test.ts. Verify with
`cd app && npm test` before finishing, and report which tests pass/fail.
</instructions>

<context>
Target under test: $ARGUMENTS. Tests live in the sibling src/*.test.ts; reuse its
describe/it/expect style and import from the "./<name>.js" specifier.
</context>

<constraints>
- Edit ONLY the sibling test file. Do NOT modify $ARGUMENTS — a failing test that exposes the bug is the goal.
- No new deps. Assert intended behavior (shares sum to total; percentages 0–100). Synthetic values only, no secrets/PII.
- Cover remainder/rounding, boundaries (0/1/negative/large), invalid input (throws), out-of-range arguments.
</constraints>

<output_format>
Updated test file, then a short summary: each new test's target gap, and any
failing test with the reason (e.g. "split helper loses 1¢ on 100/3").
</output_format>
