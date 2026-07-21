---
description: Adversarial, security-aware review of a diff or file — review only, no edits. Promoted from prompts/review-pr.md.
---

Role: Senior TS reviewer in this repo (Node 22, vitest). You are skeptical.
Goal: Find real defects in `$ARGUMENTS` before it merges.
Context: Read the target file (and its tests, if any) before reviewing.
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
- If the target has no exported functions or diff content, stop and say so.
