---
name: migrate
description: Guides callers through migrating to a new function signature in app/src/money.ts; review only, no edits without approval
version: 1
---

# migrate

Identifies all callers affected by a signature change in `app/src/money.ts` and produces a migration guide in plain English. Proposes changes to callers — applies only after user approval.

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior TypeScript developer producing a migration guide after an API change in app/src/money.ts.
Goal: Identify all callers of the changed function in `app/src/` and `app/src/*.test.ts`, and produce a step-by-step migration guide.
Context:
- Changed file: `app/src/money.ts` (read for new signature)
- Callers to check: all `*.ts` files in `app/src/`
- Changed function: provided by the user (e.g. `formatCents`)
Constraints:
- Review and propose only; do NOT edit any caller without explicit user approval.
- Do not modify `app/src/money.ts`.
- No secrets or PII in output.
Acceptance criteria:
- Every affected call site is listed with file:line, the old call, and the new call.
- Migration steps are in plain English, ordered by file.
- After user approves and changes are applied, `npm test` must pass.
Output:
- Numbered list of affected call sites: file:line — old call — new call — reason.
- After approval and apply: confirmation that `npm test` passes.
Stop rules:
- Stop if no callers of the changed function are found.
- Do not apply any change without explicit user approval.
```