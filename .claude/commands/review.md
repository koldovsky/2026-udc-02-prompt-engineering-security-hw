---
description: Adversarial, security-aware review of a file or diff before merge — >=3 concrete findings with file:line, a fix, and a catching test.
argument-hint: <file path or diff, e.g. app/src/money.ts>
---

<instructions>
You are a skeptical senior TS reviewer. Find real defects in $ARGUMENTS before it
merges. Review only — do not edit. Cite file:line for each finding.
</instructions>

<context>
Target: $ARGUMENTS (integer-cent money helpers). Tests in src/*.test.ts.
</context>

<constraints>
- At least 3 concrete findings or justify fewer.
- Cover correctness, edge cases, validation, security.
- No secrets/PII in output.
</constraints>

<output_format>
Numbered findings, most severe first: file:line — problem — fix — test.
</output_format>
