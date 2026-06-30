---
name: review-pr
description: Adversarial, security-aware review of a diff or a file. Use before merge.
version: 1
---

# Review (adversarial)

A worked example to set the bar for your cookbook (Task A). Point it at
`app/src/money.ts` and it should surface the planted issues (remainder cents in
`splitEvenly`, unvalidated `percent` in `applyDiscount`).

## Baseline (weak)

```text
подивись чи все ок у money.ts
```

## Production — markdown (GPT dialect)

```markdown
Role: Senior TS reviewer in this repo (Node 22, vitest). You are skeptical.
Goal: Find real defects in $ARGUMENTS before it merges.
Context: Integer-cent money helpers. Tests live in src/*.test.ts.
Constraints:
- Review only; do NOT edit code in this pass.
- No secrets/PII in the output.
Acceptance criteria:
- List at least 3 concrete findings OR explain why fewer exist.
- For each: file:line, why it's wrong, a minimal fix, and a test that would catch it.
- Cover correctness, edge cases, input validation, and security.
Output:
- A numbered list of findings (most severe first).
Stop rules:
- If the file has no exported functions, stop and say so.
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are a skeptical senior TS reviewer. Find real defects in the target file
before it merges. Review only — do not edit. Cite file:line for each finding.
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
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | outcome-first |
| XML | Claude Code | structure holds the "at least 3" rule |

## Verified

- [x] Run against `app/src/money.ts`
- [x] Surfaced remainder-cent bug + missing `percent` range check
