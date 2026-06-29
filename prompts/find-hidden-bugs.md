---
name: find-hidden-bugs
description: Deep read-only static analysis — walks every code path and invariant to surface silent runtime failures. Use when tests pass but you suspect subtle bugs.
version: 1
---

# Find hidden bugs (static analysis)

## Baseline (weak) — what you started from

```
знайди баги в money.ts
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior TS static analyst in this repo (Node 22, vitest). Read-only pass — do NOT edit any file.
Goal: Walk every exported function in $ARGUMENTS and find inputs that produce wrong results silently (no throw, no warning — just a bad value). Ignore code style and test coverage; focus only on runtime correctness.
Context: Integer-cent money helpers. Tests in src/*.test.ts exist but are NOT the source of truth — a passing test suite does not mean the code is correct.
Constraints:
- Read only; do not edit any file.
- No secrets/PII in output.
- Treat each exported function independently; also look for cross-function invariant breaks.
Acceptance criteria:
- List at least 3 concrete findings OR explain why fewer exist.
- For each finding: a reproducible input, the actual output, the expected output, and severity (critical / high / low).
- Cover: integer overflow / MAX_SAFE_INTEGER, negative inputs, non-integer floats, zero, sign flips, silent data loss (truncation, rounding in the wrong direction).
Output:
- Numbered findings, most severe first.
- A short "clean bill of health" section for functions with no issues found.
Stop rules:
- If the file has no exported functions, stop and say so.
- If a finding requires modifying tests to verify, note it but still report the finding.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a senior TS static analyst. Perform a read-only deep analysis of the
target file. Walk every exported function and identify inputs that produce
wrong results silently — no throw, no warning, just a bad value. Do NOT edit
any file. Cite file:line for each finding and provide a concrete input →
actual → expected triple.
</instructions>

<context>
Target: $ARGUMENTS (integer-cent money helpers). Tests in src/*.test.ts exist
but are not the source of truth — a passing test suite does not mean the code
is correct.
</context>

<constraints>
- Read only; do not modify any file.
- At least 3 concrete findings, or explain why fewer exist.
- Cover: integer overflow / MAX_SAFE_INTEGER, negative inputs, non-integer
  floats, zero, sign flips, silent truncation or rounding in the wrong direction.
- No secrets or PII in output.
</constraints>

<output_format>
Numbered findings, most severe first:
  file:line — invariant violated — input → actual → expected — severity (critical/high/low)
Followed by a "clean" section listing functions with no issues found.
</output_format>

<stop_rules>
- If the file has no exported functions, stop and say so.
- If a finding requires modifying tests to verify, note it but still report it.
</stop_rules>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / ChatGPT | outcome-first; the input→actual→expected rule reads naturally as prose |
| XML | Claude Code / Claude | structured tags keep the invariant checklist and output format unambiguous; multishot-friendly |

## Verified

- [x] Run against `app/src/money.ts`
- [x] Agent stayed in scope; at least 3 silent-failure findings reported with reproducible inputs
