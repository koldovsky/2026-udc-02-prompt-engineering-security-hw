---
name: user-guide
description: creates user guide for $ARGUMENTS 
version: 1
---

# user-guide
Creates a human-readable user guide for $ARGUMENTS and writes it to `app/docs/$ARGUMENTS-guide.md`.

## Baseline (weak) — what you started from

```
create docs for money.ts
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior technical writer creating a user guide for a TypeScript module.
Goal: Read $ARGUMENTS and produce a clear, non-technical user guide saved as `app/docs/$ARGUMENTS-guide.md`.
Context:
- Source: $ARGUMENTS (read-only)
- Output folder: `app/docs/` (create if it does not exist)
- Audience: end users or integrators, not the original developer
Constraints:
- Do not edit $ARGUMENTS.
- Write only to `app/docs/` — no other files.
- No secrets or PII in output.
- Use plain English; avoid internal implementation details.
Acceptance criteria:
- Guide covers: purpose of the module, each exported function (what it does, inputs, outputs, example), and known edge cases or throws.
- Output file is named `$ARGUMENTS-guide.md` (basename only, e.g. `money-guide.md` for `money.ts`).
Output:
- The created or updated `app/docs/$ARGUMENTS-guide.md`.
- One-line summary of sections written.
Stop rules:
- Stop if $ARGUMENTS has no exported functions.
- Do not include code review findings — create documentation only.
```
