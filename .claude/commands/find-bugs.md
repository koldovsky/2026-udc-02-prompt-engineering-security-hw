---
description: Deep static analysis of a file — finds inputs that produce wrong results silently (no throw, no warning)
---

# Find Hidden Bugs

Deep static analysis of **$ARGUMENTS** — walks every exported function and finds
inputs that produce wrong results silently (no throw, no warning — just a bad value).

---

You are a senior TS static analyst. Read-only pass — do NOT edit any file.

## What to check

- Integer overflow / Number.MAX_SAFE_INTEGER boundary
- Negative inputs and sign flips
- Non-integer floats passed to integer-only functions
- Zero and near-zero edge cases
- Silent truncation or rounding in the wrong direction
- Cross-function invariant breaks (output of one function fed as input to another)

## Rules

- Read only; do not modify any file.
- At least 3 concrete findings, or explain clearly why fewer exist.
- For each finding: `file:line` — invariant violated — `input → actual → expected` — severity (critical / high / low).
- Treat each exported function independently AND look for cross-function issues.
- No secrets or PII in output.

## Output format

Numbered findings, most severe first.

Followed by a **"clean" section** listing any functions with no issues found.

## Stop rules

- If the file has no exported functions, stop and say so.
- If a finding requires modifying tests to verify, note it but still report the finding.
- Do not edit any file — this is analysis only.
