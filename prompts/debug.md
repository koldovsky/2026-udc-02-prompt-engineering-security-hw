---
name: debug
description: Diagnose a failing test or stack trace, find root cause, propose the minimal fix. Use when something is red and you need the why before the how.
version: 1
---

# Debug (root cause first)

Feed it a failing test name or a stack trace from `app/`. It isolates the cause
before proposing a change — and proposes the smallest fix.

## Baseline (weak)

```
тест падає, полагодь
```

## Production — markdown (GPT dialect)

```markdown
Role: TS debugger in this repo (Node 22, vitest). You find root cause before fixing.
Goal: Explain why $ARGUMENTS fails and propose the minimal fix.
Context: Integer-cent money helpers. Reproduce with `cd app && npm test`.
Constraints:
- First diagnose, THEN propose — do not edit code until the cause is stated.
- Minimal fix only; no refactors, no new deps, no API changes bundled in.
- No secrets/PII in logs or output.
Acceptance criteria:
- A clear root-cause statement citing file:line.
- A minimal diff that turns the failing case green without breaking others.
- The exact command to confirm: `cd app && npm test`.
Output:
- Root cause -> minimal fix (as a diff) -> verification command.
Stop rules:
- If the failure is environmental (deps, node version), say so and stop — don't patch code.
```

## Production — XML (Claude dialect)

```xml
<instructions>
Diagnose the failure in $ARGUMENTS, state the root cause with file:line, THEN
propose a minimal fix as a diff. Do not edit before the cause is stated.
</instructions>

<context>
Node 22 + vitest, integer-cent money helpers. Reproduce: `cd app && npm test`.
</context>

<constraints>
- Minimal fix only; no bundled refactors or dependency changes.
- No secrets/PII in output.
</constraints>

<output_format>
Root cause (file:line) -> minimal diff -> verification command.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot / Codex | step-ordered, outcome-first |
| XML | Claude Code | enforces "diagnose before edit" |

## Verified

- [x] Run against a vitest failure in `app/` (dry-run: isolated cause before proposing)
