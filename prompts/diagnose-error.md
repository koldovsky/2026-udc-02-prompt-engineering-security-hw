---
name: diagnose-error
description: Given a runtime stack trace from money helpers, trace root cause, minimal reproduction, and a regression test.
version: 1
---

# Diagnose runtime error from stack trace

## Baseline (weak)

```
Error: Not a valid amount: 1.234
why is this happening
```

## Production — markdown (GPT dialect)

```markdown
Role: You are a senior engineer doing root-cause analysis on a production error.
Goal: Given the stack trace in $ARGUMENTS, identify the root cause, reproduce it with the smallest possible input, and propose a fix plus a regression test.
Context: Integer-cent money helpers (`parseAmount`, `formatCents`, `splitEvenly`, `applyDiscount`). Error surfaces in a payment flow that calls `parseAmount` on user-supplied input.
Constraints:
- Cite the exact source line that throws.
- Do not guess without evidence from the trace.
- Propose the minimal code change (one function, one line if possible).
- Write one regression test `it()` block that would have caught this.
Acceptance criteria:
- Root cause: specific file:line that causes the error.
- Reproduction case: exact input string that triggers it.
- Fix: code snippet.
- Regression test: one `it()` using vitest expect(...).toThrow() or toBe().
Output:
## Root cause
## Reproduction
## Fix
## Regression test
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are doing root-cause analysis on the production error below.
Trace to the exact source line, give the minimal reproduction input,
propose a one-function fix, and write a vitest regression test.
</instructions>

<context>
Error:
  Error: Not a valid amount: 1.234
  at parseAmount (app/src/money.ts:23:11)
  at processPayment (src/checkout.ts:87:22)

Source of input: user-entered price field — value "1.234" (three decimal places).
Module: app/src/money.ts — parseAmount regex requires 1–2 decimal digits max.
</context>

<constraints>
- Cite file:line for the throw.
- Minimal reproduction: the single string that triggers the error.
- Fix must not break existing passing tests.
- Regression test: one it() block using vitest.
- No secrets or PII in output.
</constraints>

<output_format>
## Root cause
## Reproduction
## Fix
## Regression test
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | GPT / Copilot Chat | conversational format suits chat-style debug sessions |
| XML | Claude Code | structured output sections are copy-paste ready |

## Verified

- [x] Run against the stack trace in the XML `<context>` block
- [x] Root cause: `money.ts:40` — regex `\d{1,2}` rejects 3 decimal places; reproduction `"1.234"`; fix: throw with a user-friendly message (without echoing raw input) or pre-truncate; regression test `expect(() => parseAmount("1.234")).toThrow()` already present in `money.test.ts`
