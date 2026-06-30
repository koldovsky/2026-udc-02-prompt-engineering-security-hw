---
name: trace-test-failure
description: Given a failing vitest output, trace root cause in the source — without running code.
version: 1
---

# Trace failing test to root cause

Useful during TDD when a test goes red and the error message alone does not
explain why. Feed it the vitest output + the relevant source file; get back a
pinpointed root-cause analysis and a minimal fix.

## Baseline (weak)

```
why is my test failing
```

## Production — markdown (GPT dialect)

```markdown
Role: You are a senior TypeScript engineer doing TDD root-cause analysis.
Goal: Given the failing vitest output and the source in $ARGUMENTS, explain exactly why the test fails (the defect in the implementation, not the test) and propose the minimal fix.
Context: Integer-cent money helpers. The test suite is in `app/src/money.test.ts`; the implementation is in `app/src/money.ts`.
Constraints:
- Identify the defective line(s) in the implementation — not in the test.
- Do NOT say "fix the test"; the test defines the desired behaviour.
- Propose a fix that changes only the failing function.
- Do not run any commands; reason from the source text only.
Acceptance criteria:
- Root cause: file:line in the implementation that causes the wrong value.
- Step-by-step trace: show the arithmetic/logic that produces the wrong result.
- Fix: code snippet for the single function only.
- Confirm the fix makes the test green (trace through the new logic manually).
Output:
## Root cause (file:line)
## Trace (step by step)
## Fix
## Manual verification (trace through fix)
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are a TDD engineer. A vitest test is failing. Given the test output and source
below, find the defect in the IMPLEMENTATION (not the test) and propose a minimal fix.
Do not run any commands — reason from source text only.
</instructions>

<context>
Failing vitest output:

  × splitEvenly > exposes remainder-drop bug: sum of shares must equal total
  AssertionError: expected 999 to be 1001

  ❯ src/money.test.ts:62:17
      60|   const shares = splitEvenly(1001, 3);
      61|   const sum = shares.reduce((a, b) => a + b, 0);
      62|   expect(sum).toBe(1001);

Relevant implementation (app/src/money.ts):

  export function splitEvenly(totalCents: number, n: number): number[] {
    const base = Math.floor(totalCents / n);
    const shares = new Array(n).fill(base);
    return shares;
  }
</context>

<constraints>
- Root cause must be a specific line in the implementation.
- Trace the arithmetic: show what values each variable holds for input (1001, 3).
- Fix only the splitEvenly body; do not change tests or other functions.
- Manually trace the fixed function to confirm the test would pass.
</constraints>

<output_format>
## Root cause (file:line)
## Trace (step by step with actual values)
## Fix
## Manual verification
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | GPT / Copilot Chat | conversational; good for quick "why red?" questions |
| XML | Claude Code | inlined test output + source keeps context self-contained |

## Verified

- [x] Run against the vitest failure output above (captured before the `fix-remainder-bug` prompt was applied)
- [x] Correctly identified `money.ts:36` (`new Array(n).fill(base)` drops `1001 % 3 = 2` remainder cents); traced arithmetic: `floor(1001/3)=333`, `333×3=999`; fix produced (`Array.from` with remainder distribution); manual verification confirmed sum=1001
