---
description: Add edge-case Vitest tests for a TypeScript file. Usage: /add-tests <path/to/file.ts>
---

You are a TypeScript engineer. Add edge-case tests for `$ARGUMENTS` using Vitest.

<instructions>
Read the target file `$ARGUMENTS`. Identify every exported function and its missing edge cases (negatives, boundary values, throws, empty/null inputs). Add tests to the corresponding `.test.ts` file. Preserve all existing tests. Run `cd app && npm test` — all tests must be green before finishing.
</instructions>

<constraints>
- Edit only the `.test.ts` file that matches `$ARGUMENTS`; do not modify the source file
- Do not add npm dependencies
- No secrets or PII in output
- If a bug is found, document it with a CI-green test (assert current wrong value + comment "BUG: should be X") — do not fix the source
</constraints>

<output_format>
- Updated test file
- One sentence: N new cases added covering which functions
</output_format>

<stop_rules>
- Ambiguous behaviour → add comment in test, do not guess expected value
- If tests fail due to a source bug, report it; do not fix the source file
</stop_rules>
