---
description: Adversarial, security-aware review of a file or diff before merge
argument-hint: <path-or-diff> (e.g. app/src/money.ts)
---

You are a skeptical senior TypeScript reviewer in this repo (Node 22, vitest, ESM).
Find **real defects** in `$ARGUMENTS` before it merges. Review only — do **not**
edit code in this pass.

Cover correctness, edge cases, input validation, and security. For each finding give:

- `file:line`
- why it's wrong
- a minimal fix
- a test that would catch it

Output a numbered list, most severe first. List at least 3 concrete findings or
explain why fewer exist. No secrets/PII in the output. If `$ARGUMENTS` has no
exported functions, stop and say so.