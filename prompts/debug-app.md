---
name: debug-app
description: Add structured debug logging to a TS module, writing output to a log file. Use when tracing runtime behavior.
version: 1
---

# Debug app

Point it at `app/src/money.ts` and it should instrument every exported function
with entry/exit logging that writes to a file under `app/log/`.

## Baseline (weak)

```text
add logs to money.ts
```

## Production — markdown (GPT dialect)

```markdown
Role: Senior Node.js debugger in this repo (Node 22, vitest). You write minimal, removable instrumentation.
Goal: Add structured debug logging to $ARGUMENTS so every function call can be traced at runtime via a log file.
Context: Integer-cent money helpers in app/src/. Tests in src/*.test.ts. No existing logger — use Node built-in fs.
Constraints:
- Create a thin logger utility in app/src/logger.ts that appends JSON lines to app/log/debug.log.
- Each log line: { timestamp, function, event: "enter"|"exit", args, result? }.
- Add enter/exit log calls to every exported function in the target file.
- Log file path must be configurable via LOG_DIR env var, defaulting to app/log/.
- Guard logging behind a DEBUG env var — when unset or falsy, logging is a no-op (zero overhead).
- Do NOT change function signatures, return types, or test files.
- Do NOT log secrets, PII, or full stack traces.
- Add app/log/ to .gitignore.
Acceptance criteria:
- Running `DEBUG=1 npx vitest run` produces app/log/debug.log with JSON lines.
- Running `npx vitest run` (no DEBUG) produces no log file.
- `npm test` and `npm run typecheck` still pass.
Output:
- New logger.ts file, updated target file, updated .gitignore.
- Short summary of what was instrumented.
Stop rules:
- If the target has no exported functions, stop and say so.
- Do not add logging to test files.
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are a senior Node.js debugger. Add structured debug logging to the target
module so every function call is traced to a log file. Use Node built-in fs,
no external deps. Guard behind a DEBUG env var — zero overhead when off.
Do not change function signatures, return types, or tests. Typecheck before finishing.
</instructions>

<context>
Target: $ARGUMENTS (integer-cent money helpers). Tests in src/*.test.ts.
No existing logger in the project. Runtime is Node 22.
</context>

<constraints>
- Create app/src/logger.ts: append JSON lines to app/log/debug.log (or LOG_DIR env var).
- Each line: { timestamp, function, event: "enter"|"exit", args, result? }.
- DEBUG env var gates all logging — unset = no-op, no file created.
- Do not log secrets/PII/stack traces.
- Do not modify test files.
- Add app/log/ to .gitignore.
</constraints>

<output_format>
New logger.ts, updated target file, updated .gitignore.
Short summary of instrumented functions.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | acceptance criteria enforce DEBUG gate + typecheck |
| XML | Claude Code | structure prevents scope creep into tests |

## Verified

- [ ] Run against `app/src/money.ts`
- [ ] `DEBUG=1 npx vitest run` creates app/log/debug.log with JSON lines
- [ ] `npx vitest run` (no DEBUG) creates no log file
- [ ] `npm test` and `npm run typecheck` pass
