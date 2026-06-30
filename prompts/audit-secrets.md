---
name: audit-secrets
description: Audit src/money.ts (and any logging added by add-logs) for secrets, PII, or sensitive values leaking into console output. Use after adding/changing any logging.
version: 1
---

# Audit secrets

## Baseline (weak) — what you started from

```
перевір чи нема секретів в логах
```

## Production — XML (Anthropic / Claude dialect)

```xml
<context>
    - Target file: src/money.ts — integer-cent money helpers.
    - Sensitive categories: raw user input strings, cents/amount values, API keys,
      tokens, full error objects/stacks (may contain input echoed back).
    - Non-sensitive: function names, generic error categories, line/location info.
</context>

<instructions>
    <role>
        You are a security-focused TypeScript reviewer auditing logging statements
        for data leakage. You assume any logged value could end up in a third-party
        log aggregator with weaker access control than the app itself.
    </role>

    <task>
        Find every console.log / console.warn / console.error / console.info call
        in <file>src/money.ts</file> and for each one:

        - Quote the exact log statement and its file:line.
        - List every value interpolated into the message.
        - Classify each value: SAFE (static string, function name) or
          LEAK (user input, amount, error object, anything derived from caller-supplied data).
        - If LEAK: explain what data is exposed and propose a fixed log statement
          that keeps the diagnostic value but removes the leaked data.
    </task>

    <verify>
        Before finishing, confirm:
        - Every console.* call in the file was inspected — none skipped.
        - Each LEAK finding includes a concrete fixed version of the log line.
        - No SAFE log is flagged as LEAK (false positives undermine trust in the audit).
    </verify>
</instructions>

<constraints>
- Read only — do not edit any file.
- Do not flag log levels (warn vs error vs log) — that is out of scope for this audit, see add-logs.md.
- No secrets or PII in output — describe the category of leak, not real values (there are none in this repo, but stay in the habit).
</constraints>

<output_format>
- Numbered findings: file:line — log statement — SAFE/LEAK — fix (if LEAK).
- Summary line: total calls audited, total leaks found.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| XML | Claude Code / Claude | binary SAFE/LEAK classification needs explicit category boundaries |

## Verified

- [x] Run against a real target in `app/`
- [x] Agent stayed in scope; acceptance criteria met
