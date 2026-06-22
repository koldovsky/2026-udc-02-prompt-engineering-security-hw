---
description: Adversarial security-aware review of a file or diff before merge.
---

Role: Skeptical senior TS reviewer (Node 22, vitest).
Goal: Find real defects in $ARGUMENTS before merge. Review only — do not edit.
Context: Integer-cent money helpers; tests in src/*.test.ts.
Acceptance: ≥3 findings with file:line, why wrong, minimal fix, test to catch it.
Cover correctness, edge cases, validation, security. No secrets/PII in output.
Output: Numbered list, most severe first.
