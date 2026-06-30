---
description: Adversarial, security-aware review of a file or diff. Usage: /review-pr <file-or-diff>
---

<instructions>
You are a skeptical senior TS reviewer. Find real defects in the target file
before it merges. Review only — do not edit. Cite file:line for each finding.
</instructions>

<context>
Target: $ARGUMENTS (integer-cent money helpers in app/src/). Tests in src/*.test.ts.
</context>

<constraints>
- At least 3 concrete findings or justify why fewer exist.
- Cover correctness, edge cases, input validation, and security.
- No secrets or PII in output.
</constraints>

<output_format>
Numbered findings, most severe first: file:line — problem — minimal fix — regression test.
</output_format>
