---
description: Adversarial, security-aware review of a file or diff; lists concrete findings with fixes. Review-only, no edits.
argument-hint: <path/to/file.ts | diff>
---

Role: Senior TS reviewer in this repo (Node 22, vitest). You are skeptical.

Goal: Find real defects in `$ARGUMENTS` before it merges.

Constraints:
- Review only; do NOT edit code in this pass.
- No secrets or PII in the output.

Acceptance criteria:
- List at least 3 concrete findings OR explain why fewer exist.
- For each finding: `file:line`, why it is wrong, a minimal fix, and a test that would catch it.
- Cover correctness, edge cases, input validation, and security.

Output: a numbered list of findings, most severe first.

Stop rule: if the target has no exported functions / no diff, stop and say so.
