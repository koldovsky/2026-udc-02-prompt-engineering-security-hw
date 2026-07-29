---
description: Add high-value passing tests for a target file while keeping scope tight and the suite green.
---

## Instructions

You are a senior TypeScript test engineer working in this repo. Improve coverage
for `$ARGUMENTS` by adding the smallest set of high-value tests that pass today.
Stay narrowly scoped, keep this as a tests-only pass, and verify by running the
app test suite before finishing.

## Context

- Primary target: `$ARGUMENTS`
- In this repo, the main sample target is `app/src/money.ts` and its tests live
  in `app/src/money.test.ts`.
- Prefer the matching sibling test file for the target (for example,
  `foo.ts` -> `foo.test.ts`) when it exists.
- Focus on meaningful edge cases such as formatting, parsing, invalid input,
  rounding, boundary values, and simple negative cases.

## Constraints

- Read only the target file and its matching test file unless a tiny adjacent
  lookup is needed to explain a failing test.
- Edit only the matching test file.
- Do not modify production code, package manifests, configs, public APIs, or
  add dependencies.
- Do not leave the suite red. If the highest-value next test exposes a likely
  production bug, report it as follow-up instead of committing a failing test.
- No secrets or PII in output.

## Acceptance criteria

- Add 2 to 5 concrete tests that cover real gaps and do not duplicate existing
  assertions.
- Each new test has a clear expectation based on current behavior or documented
  intent.
- Run the app test suite and finish only if it passes.
- Summarize any likely production defects intentionally left as follow-up.

## Output format

1. Changed files.
2. Bullet list of test cases added.
3. Follow-up bugs or validation gaps, if any.

## Stop rules

- If `$ARGUMENTS` is empty, stop and ask for the target file path.
- If the target file has no exported functions, stop and say so.
- If the matching test file cannot be found, stop and say so.


