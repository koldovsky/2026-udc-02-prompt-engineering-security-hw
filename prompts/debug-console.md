---
name: debug-console
description: Add console.log/console.error debug tracing to a TS module, gated by DEBUG env var. Use for quick local debugging.
version: 1
---

# Debug console

Point it at `app/src/money.ts` and it should instrument every exported function
with entry/exit `console.log` tracing — no file I/O, just console output gated
by a `DEBUG` env var.

## Baseline (weak)

```text
add console logs to money.ts
```

## Production — markdown (GPT dialect)

```markdown
Role: Senior Node.js debugger in this repo (Node 22, vitest). You write minimal, removable instrumentation.
Goal: Add console-based debug tracing to $ARGUMENTS so every function call can be traced locally without a log file.
Context: Integer-cent money helpers in app/src/. Tests in src/*.test.ts. No logger utility — use console directly.
Constraints:
- Use console.log for entry/exit and console.error for thrown errors — no file I/O, no new deps.
- Guard every console call behind `if (process.env.DEBUG)` so output is silent by default.
- Log on entry: function name + arguments. Log on exit: function name + result.
- Do NOT change function signatures, return types, or test files.
- Do NOT log secrets, PII, or full stack traces.
Acceptance criteria:
- Running `DEBUG=1 npm test` prints entry/exit lines to the console.
- Running `npm test` (no DEBUG) produces no extra console output.
- `npm test` and `npm run typecheck` still pass.
Output:
- Updated target file only.
- Short summary of which functions were instrumented.
Stop rules:
- If the target has no exported functions, stop and say so.
- Do not add logging to test files.
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are a senior Node.js debugger. Add console.log/console.error debug tracing
to every exported function in the target module. Guard all output behind a
DEBUG env var check — silent by default. No file I/O, no external deps.
Do not change function signatures, return types, or tests. Typecheck before finishing.
</instructions>

<context>
Target: $ARGUMENTS (integer-cent money helpers). Tests in src/*.test.ts.
No existing logger in the project. Runtime is Node 22.
</context>

<constraints>
- console.log for entry/exit, console.error for thrown errors.
- Every call wrapped in `if (process.env.DEBUG)`.
- Log entry: function name + args. Log exit: function name + result.
- Do not log secrets/PII or stack traces.
- Do not modify test files.
</constraints>

<output_format>
Updated target file only. Short summary of instrumented functions.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | acceptance criteria enforce DEBUG gate + typecheck |
| XML | Claude Code | structure prevents scope creep into tests |

## Verified

- [ ] Run against `app/src/money.ts`
- [ ] `DEBUG=1 npm test` prints entry/exit lines; plain `npm test` is silent
- [ ] `npm test` and `npm run typecheck` pass
