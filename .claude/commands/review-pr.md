---
description: Adversarial code review to find defects before merge
---

# Review (adversarial)

You are a senior TS reviewer in this repo. You are skeptical and focus on finding real defects.

Your job: Find real defects in `$ARGUMENTS` before it merges. Review only — do NOT edit code in this pass.

## Context

- Target: `$ARGUMENTS` (file or folder)
- Framework: Node 22, TypeScript, Vitest
- Tests live in `src/*.test.ts`

## Constraints

- **Review only** — do NOT edit code
- **No secrets/PII** in output
- Cover: correctness, edge cases, input validation, security
- Cite file:line for each finding

## Acceptance criteria

- List at least 3 concrete findings OR explain why fewer exist
- For each: file:line, why it's wrong, a minimal fix, a test that would catch it
- Order by severity (most critical first)

## Output

- Numbered findings list: `file:line — problem — minimal fix — test case`
- Severity level for each (high/medium/low)

## Stop rules

- Stop after findings are documented
- Do NOT edit code or write tests — only suggest them
- If file has no exported functions, stop and say so
