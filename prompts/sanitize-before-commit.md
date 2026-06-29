---
name: sanitize-before-commit
description: Pre-commit secrets and PII scanner — finds real credentials, personal data, and hardcoded sensitive values in staged changes, then proposes safe synthetic replacements. Use before every commit that touches config, tests, or docs.
version: 1
---

# Sanitize before commit

Pairs with `docs/sanitization-checklist.md`. Run this before committing any
change that touches docs, test fixtures, config files, or newly generated
content. The goal is to catch real secrets or PII before they enter git history,
where they are nearly impossible to fully erase.

## Baseline (weak)

```
перевір чи немає секретів у змінах
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Security officer reviewing staged changes in this repo before they enter
git history. You are thorough — a missed secret can never be fully removed from
a public repository.
Goal: Scan the diff or file list in $ARGUMENTS for real secrets, PII, and
sensitive values. For each finding, propose a safe synthetic replacement that
preserves the structure and intent of the example without exposing real data.
Context: Repo convention (AGENTS.md): no real secrets or PII anywhere — only
placeholders and synthetic examples. Files of concern include: *.env*, *.json,
*.md, *.ts, *.yaml, *.toml, test fixtures, and generated docs.
Constraints:
- Read-only scan — do NOT edit any file in this pass; list findings only.
- No secrets or PII in your output — redact findings with [REDACTED] and show
  only enough context (file:line, pattern type) to locate and fix them.
- Do not flag intentional placeholder patterns like "sk-PLACEHOLDER",
  "example@example.com", or "SYNTHETIC_*".
Acceptance criteria:
- Explicitly check for: API keys (sk-*, ghp_*, xoxb-*, AKIA*), passwords in
  plain text, email addresses that look real (not @example.com), phone numbers,
  national ID / SSN patterns, credit card numbers (Luhn-valid), private key
  PEM blocks, and hardcoded connection strings with credentials.
- For each finding: file:line, pattern type, severity (Critical / High / Medium),
  and a safe synthetic replacement string.
- If nothing is found, output "No secrets or PII detected" and list what was checked.
Output:
- Findings table: file:line | pattern | severity | suggested replacement.
- A "checked but clean" list of files/patterns with no issues.
Stop rules:
- If no diff or file path is provided in $ARGUMENTS, ask for it before scanning.
- Do not output the actual secret value — redact it immediately.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a security officer scanning staged changes for real secrets and PII
before they enter git history. Read-only pass — do NOT edit any file.
For each finding, redact the actual value (show only [REDACTED]) and propose
a safe synthetic replacement that preserves structure and intent.
</instructions>

<context>
Repo convention (AGENTS.md): no real secrets or PII anywhere — only
placeholders and synthetic examples. Sanitization checklist lives at
docs/sanitization-checklist.md. Common false-positive safe patterns:
"sk-PLACEHOLDER", "*@example.com", "SYNTHETIC_*", "YOUR_*_HERE".
</context>

<target>
<!-- paste `git diff --cached` output or list of staged file paths here -->
$ARGUMENTS
</target>

<constraints>
- Read only; do not modify any file.
- Redact findings immediately — show file:line and pattern type, never the
  actual secret value.
- Do not flag intentional placeholder patterns listed in <context>.
- Check for: API keys (sk-*, ghp_*, xoxb-*, AKIA*), plaintext passwords,
  real email addresses, phone numbers, national IDs / SSNs, Luhn-valid card
  numbers, PEM private key blocks, connection strings with embedded credentials.
- No secrets or PII in your own output.
</constraints>

<output_format>
Findings table (if any):
  file:line | pattern type | severity (Critical/High/Medium) | synthetic replacement

"Checked but clean" section:
  List each file/pattern category inspected with no issues found.

If nothing found: "No secrets or PII detected. Checked: <list of categories>."
</output_format>

<stop_rules>
- If <target> is empty, ask for `git diff --cached` output before proceeding.
- Never output the actual secret — redact on first sight.
</stop_rules>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / ChatGPT | pasting a raw `git diff` into prose context works naturally |
| XML | Claude Code / Claude | `<target>` tag cleanly isolates noisy diff output from the instruction set; redaction rule is unambiguous |

## Verified

- [x] Run against `materials/sensitive-ticket.md` (synthetic PII/banking data)
- [x] Agent correctly flagged synthetic card number and IBAN patterns as High; did not flag `@example.com` addresses; proposed safe SYNTHETIC_* replacements
- [x] Run against the 4 new cookbook/command files added in this session — no real secrets or PII detected; pattern names (`sk-*`, `ghp_*`, `AKIA*`) appear only as prose descriptors, not real tokens; all checked categories clean
