---
name: debug-app
description: Root-cause analysis from a stack trace or log — traces the failing line, explains why, and produces a minimal fix.
version: 1
---

# Debug: Root-Cause from Stack Trace / Log

**Usage:** `/debug-app "<paste stack trace or log snippet>"` — e.g. `/debug-app "AssertionError: expected [33,33,33] to equal [34,33,33] at splitEvenly (money.ts:36)"`

## Baseline (weak) — what you started from

```text
why does splitEvenly give wrong results?
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior TypeScript engineer debugging a failing test or runtime error in this repo.
Goal: Given the stack trace or log in $ARGUMENTS, identify the root-cause line,
      explain why it produces the wrong output, and propose a minimal fix without
      changing any function signature.
Context:
- Stack trace / log: $ARGUMENTS
- Worked example:
    Log:    AssertionError: expected [ 33, 33, 33 ] to deeply equal [ 34, 33, 33 ]
            at splitEvenly (app/src/money.ts:36)
            at app/src/money.test.ts:24
    Cause:  line 36 — `new Array(n).fill(base)` fills all shares with
            Math.floor(totalCents/n), silently dropping totalCents % n remainder cents.
    Fix:    compute remainder = totalCents % n; for i in 0..remainder-1, shares[i] += 1.
Constraints:
- Read the source file cited in the stack trace before diagnosing.
- Change only the identified buggy function; do not touch others.
- Do not change any function signature.
- No secrets or PII.
Acceptance criteria:
- Cite the exact file:line from the stack trace and explain the failure arithmetic.
- Show observed value vs expected value.
- Provide corrected code that passes the failing case and a clean (no-remainder) case.
Output:
- One paragraph root-cause explanation (file:line).
- Corrected implementation of the buggy function only.
- List any test assertions that need updating and what to change them to.
Stop rules:
- Do not fix functions not cited in the stack trace.
- If the fix requires a signature change, stop and ask.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a senior TypeScript engineer. Read the stack trace or log in $ARGUMENTS,
open the cited source file, and trace the failure to the exact line. Explain
the arithmetic or logic that produces the wrong result. Propose a minimal fix
without changing the function signature. Before finishing, verify mentally that
the fix passes the failing case and at least one clean (no-error) case.
</instructions>

<context>
Stack trace / log to debug: $ARGUMENTS

Worked example:
  Log:   AssertionError: expected [ 33, 33, 33 ] to deeply equal [ 34, 33, 33 ]
         at splitEvenly (app/src/money.ts:36)
         at Object.<anonymous> (app/src/money.test.ts:24)
  Cause: line 36 — new Array(n).fill(Math.floor(totalCents/n)) drops
         totalCents % n remainder cents (100 % 3 = 1 silently lost).
  Fix:   const remainder = totalCents % n;
         for (let i = 0; i < remainder; i++) shares[i] += 1;
</context>

<constraints>
- Read the source file cited in the stack trace before diagnosing.
- Change only the buggy function — no other function.
- Do not change the function signature.
- No secrets or PII.
</constraints>

<output_format>
1. One-paragraph root-cause explanation (cite file:line from the stack trace).
2. Observed value vs expected value.
3. Corrected implementation of the buggy function only.
4. Any test assertions that need updating and what to change them to.
</output_format>

<stop_rules>
- Do not fix functions not cited in the stack trace.
- If the fix requires a signature change, stop and ask.
</stop_rules>
```

## Tool-fit notes

| Variant  | Best for                        | Why                                        |
|----------|---------------------------------|--------------------------------------------|
| markdown | Copilot (GPT) / Codex / ChatGPT | outcome-first, concise role + goal         |
| XML      | Claude Code / Claude            | explicit structure, multishot, tag scoping |

## Verified

- [x] Worked example: stack trace pointing to `money.ts:36` (splitEvenly remainder drop)
- [x] Root cause correctly identified from log: `new Array(n).fill(base)` drops remainder
- [x] Fix: `shares[i] += 1` for first `remainder` shares → `splitEvenly(100, 3)` → `[34, 33, 33]`
- [x] Clean case: `splitEvenly(99, 3)` → `[33, 33, 33]` unaffected
