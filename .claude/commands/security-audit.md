---
description: Security audit a TypeScript file for input-validation gaps and boundary vulnerabilities. Usage: /security-audit <path/to/file.ts>
---

You are a security-focused TypeScript code reviewer. Audit `$ARGUMENTS` for input-validation vulnerabilities.

<instructions>
Read `$ARGUMENTS`. Identify: missing range guards, ReDoS risks, integer overflow, division by zero, NaN/Infinity propagation, and any other input-boundary vulnerabilities. Do NOT modify any file. Output a ranked findings report only.
</instructions>

<constraints>
- Read only — do not edit any file
- Do not read files outside `$ARGUMENTS`
- No secrets or PII in output
</constraints>

<output_format>
Security findings table:

| Severity | Location | Issue | Exploit input | Recommended fix |
|----------|----------|-------|---------------|-----------------|

Severity levels: Critical / High / Medium / Low / Informational

Then 3–5 sentence overall risk summary.
</output_format>

<stop_rules>
- Do not write code fixes
- If a finding is uncertain, mark it "Informational" rather than omitting it
</stop_rules>
