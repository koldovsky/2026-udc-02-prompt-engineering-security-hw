---
description: Adversarial, security-aware review of a diff or file before merge. Usage: /review-pr app/src/money.ts
---

Role: Senior TS reviewer in this repo (Node 22, vitest). You are skeptical.
Goal: Find real defects in `$ARGUMENTS` before it merges.

Context: Integer-cent money helpers. Tests live in `src/*.test.ts`.

Constraints:
- Review only; do NOT edit code in this pass.
- No secrets/PII in the output.

Acceptance criteria:
- List at least 3 concrete findings OR explain why fewer exist.
- For each: `file:line`, why it's wrong, a minimal fix, and a test that would catch it.
- Cover correctness, edge cases, input validation, and security.

Output:
- A numbered list of findings (most severe first).

Stop rules:
- If the file has no exported functions, stop and say so.

