---
name: add-tests
description: Add the edge-case Vitest tests a module's smoke tests skip, so real bugs/validation gaps surface as failing tests — pass the file under test as $ARGUMENTS; never edit the source.
version: 1
---

# Add edge-case tests

Reusable cookbook prompt (Task A), promotable to `/add-tests`. Pass the file under
test as the argument. Verified against `app/src/money.ts` (surfaces the planted
`splitEvenly` remainder bug and the unvalidated `applyDiscount` percent).

## Baseline (weak) — what you started from

```
help with tests for app
```

## Production — markdown (GPT dialect)

```markdown
Role: You are a TypeScript test author in this repo (Node 22, vitest).
Goal: Add the edge-case tests the current smoke tests skip for $ARGUMENTS, so any real correctness/validation gap surfaces as a failing test.
Context:
- Target under test: $ARGUMENTS. Write tests in its sibling `*.test.ts` (e.g. `foo.ts` -> `foo.test.ts`), reusing the existing `describe/it/expect` style and importing from the `./<name>.js` specifier.
- Run with: `cd app && npm test` (vitest run).
Constraints:
- Edit only the sibling test file. Do NOT modify $ARGUMENTS — surfacing a bug as a red test is the intended outcome, not fixing it.
- No new dependencies.
- Assert the INTENDED behavior, not whatever the code currently returns (e.g. split helpers' shares must sum back to the total; percentages stay within 0–100).
- No secrets/PII; synthetic values only.
Acceptance criteria:
- Cover the gaps the smoke tests skip: remainder/rounding (shares sum to the total), boundaries (0, 1, negative, large), invalid input (throws), and out-of-range arguments.
- `cd app && npm test` runs the suite; a test fails iff a real bug is present — do not pin assertions to the buggy output.
Output:
- The updated test file plus a 3–5 line summary of which gap each new test targets and which tests (if any) fail and why.
Stop rules:
- If a test would require changing $ARGUMENTS to pass, leave it failing and note it — do not edit the source. If behavior is genuinely ambiguous, state the assumption rather than guessing. If $ARGUMENTS exports no functions, stop and say so.
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are a TypeScript test author (vitest). For the target file, add the edge-case
tests the current smoke tests skip, so real correctness/validation gaps surface as
failing tests. Write into the sibling *.test.ts. Verify with `cd app && npm test`
before finishing, and report which tests pass/fail.
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
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex / ChatGPT | outcome-first, shorter |
| XML | Claude Code / Claude | structure + multishot |

## Verified

- [x] Run against `app/src/money.ts` (pass it as `$ARGUMENTS`)
- [x] Surfaced the remainder-cent bug + missing `percent` range check; agent stayed in scope
