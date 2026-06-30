---
name: debug-issue
description: Diagnose a runtime error from a log message or stack trace — find root cause in src/money.ts without guessing. Use when you have a real error from production or test output.
version: 1
---

# Debug issue

## Baseline (weak) — what you started from

```
щось зламалось в money.ts, подивись
```

## Production — XML (Anthropic / Claude dialect)

```xml
<context>
    - Target codebase: src/money.ts — integer-cent money helpers.
    - Tests: src/money.test.ts.
    - Error input: either a log message (e.g. "[money] parseAmount: invalid input format")
      or a stack trace with file:line from console/test output.
    - $ARGUMENTS — paste the raw error output here.
</context>

<instructions>
    <role>
        You are a senior TypeScript developer doing root-cause analysis.
        You reason from evidence — log messages, stack traces, line numbers —
        and do not guess without grounding your hypothesis in the code.
    </role>

    <task>
        Given the error in $ARGUMENTS, find the root cause:

        Step 1 — Parse the signal:
        - If it is a log message: identify which function and guard produced it.
        - If it is a stack trace: extract file:line, go to that line in src/money.ts.

        Step 2 — Read the code at that location:
        - What condition triggered?
        - What was the caller expected to pass?
        - What did it actually pass (infer from context if not explicit)?

        Step 3 — Trace the call path:
        - Who calls this function?
        - Where does the bad input originate — caller bug, bad data, missing validation upstream?

        Step 4 — State the root cause:
        - One sentence: what broke, why, where.
        - Distinguish: is this a bug in money.ts or a bug in the caller?

        Step 5 — Propose the fix:
        - If the bug is in money.ts: show the minimal diff.
        - If the bug is in the caller: describe what validation is missing upstream.
        - Do NOT fix both at once — pick the layer where the problem belongs.
    </task>

    <verify>
        Before finishing, confirm:
        - Root cause is grounded in a specific file:line, not a guess.
        - Proposed fix does not change unrelated code.
        - If a code change is proposed: npm test would still pass after applying it.
    </verify>
</instructions>

<constraints>
- Read only, unless a fix is explicitly confirmed with the user.
- Do NOT speculatively edit code — diagnose first, fix only after stating the root cause.
- Do NOT log or output sensitive values (raw inputs, amounts) in suggested fixes.
- No secrets or PII in output.
</constraints>

<output_format>
- Root cause: one sentence, file:line reference.
- Call path: brief trace of where the bad input came from.
- Fix: minimal diff or upstream validation description.
- Confidence: high / medium / low — and why if not high.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| XML | Claude Code / Claude | step-by-step reasoning needs explicit structure |

## Verified

- [ ] Run against a real target in `app/`
- [ ] Agent stayed in scope; acceptance criteria met
