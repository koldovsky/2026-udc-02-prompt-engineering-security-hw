---
name: debug-type-error
description: Fix TypeScript compile errors from tsc output with minimal changes.
version: 1
---

# Debug (type error)

## Baseline (weak)

```text
typecheck падає
```

## Production — markdown (GPT dialect)

```markdown
Role: TS debugger fixing compile errors only.
Goal: Make `cd app && npm run typecheck` pass given the tsc error output below.
Context:
Paste the full `tsc --noEmit` error (file, line, TS code, message).
Project: app/ — strict TS, ESM, vitest tests.
Constraints:
- Minimal fix for the reported error(s); no unrelated refactors.
- Prefer correct types over `any` or `@ts-ignore`.
- Do not weaken tsconfig unless explicitly asked.
Acceptance criteria:
- cd app && npm run typecheck exits 0.
- cd app && npm test still passes.
- Each fixed error explained in one line (TS code → what changed).
Output:
- Error → fix mapping + files touched.
Stop rules:
- If tsc output is missing, run typecheck once and paste errors, or stop and ask.
- If error needs a design decision, stop with options — do not guess.
```

## Production — XML (Claude dialect)

```xml
<instructions>
Fix tsc errors from pasted output in app/. Minimal type fixes only.
Run typecheck and npm test before finishing.
</instructions>

<context>
Strict TS, ESM .js imports in tests.
tsc output: (user pastes)
</context>

<constraints>
- No any/ts-ignore unless unavoidable; tests must stay green.
</constraints>

<output_format>
TS error code → fix → files changed.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | CI failures | asks for pasted tsc log |
| XML | Claude | anti-ts-ignore |

## Verified

- [x] Run against `app/` — typecheck already green; prompt validated on clean baseline
