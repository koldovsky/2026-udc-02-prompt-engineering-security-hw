---
description: Adversarial security-aware review before merge. Usage:/review-pr app/src/money.ts
---

Full spec: `prompts/review-pr.md` (markdown dialect).

**Target:** `$ARGUMENTS` (default: `app/src/money.ts`)

Role: Senior TS reviewer in this repo (Node 22, vitest). You are skeptical. **Review only — do not edit code.**

Goal: Find real defects in the target before it merges.

Context: Integer-cent money helpers. Tests live in `src/*.test.ts`.

Constraints:
- Read-only review; no file changes in this pass.
- No secrets/PII in the output.

Acceptance criteria:
- List **at least 3 concrete findings** OR explain why fewer exist.
- For each: `file:line`, why it's wrong, a minimal fix, and a test that would catch it.
- Cover correctness, edge cases, input validation, and security.

Output: numbered list of findings (most severe first).

Stop rules:
- If the file has no exported functions, stop and say so.
