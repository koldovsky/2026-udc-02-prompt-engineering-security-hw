---
name: review-pr
description: Adversarial, security-aware review of a diff or a file. Use before merge.
version: 1
---

# Review (adversarial)

A worked example to set the bar for your cookbook (Task A). Point it at
`app/src/money.ts` and it should surface the planted issues (remainder cents in
`splitEvenly`, unvalidated `percent` in `applyDiscount`).


## Production — markdown (GPT dialect)

```markdown
Role: Senior TS reviewer in this repo (Node 22, vitest). You are skeptical.
Goal: Find real defects in `app/src/money.ts` before it merges.
Context: Integer-cent money helpers in `app/src/money.ts`. Tests live in `app/src/money.test.ts`.
Constraints:
- Review only; do NOT edit code in this pass.
- No secrets/PII in the output.
Acceptance criteria:
- List at least 3 concrete findings OR explain why fewer exist.
- For each: file:line, why it's wrong, a minimal fix, and a test that would catch it.
- Cover correctness, edge cases, input validation, and security.
Output:
- A numbered list of findings (most severe first).
Stop rules:
- If the file has no exported functions, stop and say so.
```
