---
name: add-logs
description: Add structured debug log statements to a TypeScript file to trace inputs, outputs, and key intermediate values before a debug session.
version: 1
---

# Add Logs

**Usage:** `/add-logs <source-file>` — e.g. `/add-logs app/src/money.ts`

**Workflow:** Run `/add-logs` first to instrument the file, reproduce the failure to capture the output, then feed that output to `/debug-app` for root-cause analysis.

## Baseline (weak) — what you started from

```text
додай логи в money.ts щоб зрозуміти що відбувається
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior TypeScript engineer adding temporary diagnostic logging to a module.
Goal: Add structured console.debug log statements to every exported business-logic
      function in $ARGUMENTS so that a debug session can trace inputs, key intermediate
      values, and outputs without modifying any logic.
Context:
- Target: $ARGUMENTS. Read it first to discover exported functions and their
  key intermediate variables (e.g. computed bases, remainders, parsed values).
- Logs must be labelled: `[fnName] key=value` so they are greppable.
- Example for splitEvenly: console.debug('[splitEvenly] totalCents=%d n=%d base=%d remainder=%d shares=%o', totalCents, n, base, remainder, shares)
- Logs are temporary — wrap all of them in `if (process.env.DEBUG)` so they
  are silent in production and removable in one grep.
- Workflow: once logs are in place, reproduce the failure with DEBUG=1 to
  capture output, then pass that output to /debug-app for root-cause analysis.
Constraints:
- Modify only $ARGUMENTS; do not touch test files or other modules.
- Do not change any function signature or return value.
- Do not add log statements inside toCents() or other pure type-guards — only
  exported business-logic functions.
- No real secrets or PII in log output — only placeholders and synthetic examples.
  If the target file handles sensitive context, mask/synthesize it first
  (see docs/sanitization-checklist.md).
- Use console.debug (not console.log) so logs stay off in default Node output.
Acceptance criteria:
- Every exported business-logic function has at least one log line.
- Each log line is guarded by `if (process.env.DEBUG)`.
- Log labels are consistent: `[functionName] label=value`.
- cd <project-root> && npx vitest run exits 0 (logs are silent during tests).
Output:
- Updated contents of $ARGUMENTS with log statements inserted.
Stop rules:
- If the file has no exported functions, stop and say so.
- Do not add logs to imported helper functions from other modules.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a senior TypeScript engineer. Read $ARGUMENTS, then add one structured
console.debug statement per exported business-logic function. Each log must be
guarded by `if (process.env.DEBUG)` and labelled `[fnName] key=value` so it
is greppable and silent by default. Do not change any logic, signature, or
return value. Before finishing, verify: (1) every exported business-logic function has a log,
(2) all logs are inside `if (process.env.DEBUG)`, (3) npx vitest run exits 0.
</instructions>

<context>
Source file: $ARGUMENTS
Read it to discover: exported function names and their key intermediate variables
worth logging (inputs, computed intermediates, outputs).

Worked example for splitEvenly(totalCents, n):
  if (process.env.DEBUG) {
    console.debug('[splitEvenly] totalCents=%d n=%d base=%d remainder=%d', totalCents, n, base, remainder);
    console.debug('[splitEvenly] shares=%o', shares);
  }

Workflow: once logs are in place, reproduce the failure with DEBUG=1 to capture
output, then pass that output to /debug-app for root-cause analysis.
</context>

<constraints>
- Modify only the target file; do not touch test files or other modules.
- Do not change any function signature, logic, or return value.
- Guard every log with `if (process.env.DEBUG)`.
- Use console.debug, not console.log.
- Label format: [functionName] key=value — must be greppable.
- No real secrets or PII in log output — placeholders and synthetic examples only.
  If the target file handles sensitive context, mask/synthesize it first
  (see docs/sanitization-checklist.md).
</constraints>

<output_format>
Updated contents of the target file with log statements inserted.
</output_format>

<stop_rules>
- If the file has no exported functions, stop and say so.
- Do not add logs to imported helpers from other modules.
</stop_rules>
```

## Tool-fit notes

| Variant  | Best for                        | Why                                        |
|----------|---------------------------------|--------------------------------------------|
| markdown | Copilot (GPT) / Codex / ChatGPT | outcome-first, concise role + goal         |
| XML      | Claude Code / Claude            | explicit structure, multishot, tag scoping |

## Verified

- [x] Run against `app/src/money.ts`
- [x] Every exported business-logic function has a `if (process.env.DEBUG)` log block
- [x] `npx vitest run` exits 0 — logs silent without DEBUG env var
- [x] Labels greppable: `grep '\[splitEvenly\]'` finds all relevant lines
