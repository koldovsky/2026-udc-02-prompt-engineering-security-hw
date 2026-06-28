---
name: debug-app
description: Root-cause analysis for a correctness bug — traces the failing line, explains why, and produces a minimal fix. Use with any function; the splitEvenly remainder bug is the worked example.
version: 1
---

# Debug: Root-Cause Analysis

**Usage:** `/debug-app "<function> — <observed vs expected>"` — e.g. `/debug-app "splitEvenly(100,3) returns [33,33,33] instead of [34,33,33]"`

A generalizable debugging approach. The splitEvenly remainder-cent bug is used as the worked example throughout.

## Baseline (weak) — what you started from

```text
why does splitEvenly give wrong results?
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior TypeScript engineer debugging a correctness issue in `app/src/money.ts`.
Goal: Root-cause $ARGUMENTS — trace the exact line, explain why it fails on that input, and propose a minimal fix without changing the function signature.
Context:
- File: `app/src/money.ts`. All amounts are integer cents.
- Bug to debug: $ARGUMENTS
- Worked example: `splitEvenly(100, 3)` returns `[33, 33, 33]` (sum=99), expected `[34, 33, 33]` (sum=100).
  Root cause: `Math.floor(totalCents / n)` fills all shares equally, silently dropping `totalCents % n` remainder cents.
  Fix strategy: for i in 0..remainder-1, shares[i] += 1.
Constraints:
- Scope: analyse only `app/src/money.ts`; do not modify any file outside `app/src/`.
- Change only the buggy function — do not touch others.
- Do not change the function signature.
- No secrets or PII.
Acceptance criteria:
- Identify the exact line causing the bug and explain why it produces the wrong output.
- Show the arithmetic: what value is computed vs what is expected.
- Provide corrected code that passes the failing case.
- Provide corrected code that still passes a clean (no-remainder) case.
Output:
- One paragraph root-cause explanation (cite file:line).
- Corrected implementation of the buggy function only.
- Note which existing test assertions need updating and what to change them to.
Stop rules:
- Do not fix any other function.
- If the fix requires changing the function signature, stop and ask.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a senior TypeScript engineer. Root-cause the bug described in
$ARGUMENTS in app/src/money.ts. Trace the failure to the exact line. Propose
a minimal fix without changing the function signature. Before finishing, verify
mentally that the fix passes the failing case and a clean (no-remainder) case.
</instructions>

<context>
File: app/src/money.ts.
Bug to debug: $ARGUMENTS

Worked example — splitEvenly remainder bug:
  splitEvenly(100, 3) returns [33,33,33] (sum=99), expected [34,33,33] (sum=100).
  Root cause: Math.floor(totalCents / n) fills all shares equally, silently
  dropping totalCents % n remainder cents.
  Fix strategy: for i in 0..remainder-1, shares[i] += 1.
</context>

<constraints>
- Scope: modify only app/src/money.ts; do not touch any other file.
- Change only the buggy function — no other function.
- Do not change the function signature.
- No secrets or PII.
</constraints>

<output_format>
1. One-paragraph root-cause explanation (cite line number).
2. Corrected implementation of the buggy function only.
3. Which test assertions need updating and what to change them to.
</output_format>

<stop_rules>
- Do not fix any other function.
- If the fix requires a signature change, stop and ask.
</stop_rules>
```

## Tool-fit notes

| Variant  | Best for                        | Why                                        |
|----------|---------------------------------|--------------------------------------------|
| markdown | Copilot (GPT) / Codex / ChatGPT | outcome-first, concise role + goal         |
| XML      | Claude Code / Claude            | explicit structure, multishot, tag scoping |

## Verified

- [x] Root cause correctly identified: Math.floor(100/3)=33, remainder 100%3=1 silently dropped (line 36)
- [x] Fix produces splitEvenly(100, 3) → [34, 33, 33]
- [x] splitEvenly(99, 3) still → [33, 33, 33]
- [x] Verified by applying fix-bug.md — see that prompt's Verified section
