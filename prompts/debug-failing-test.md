---
name: debug-failing-test
description: Diagnose a vitest failure from pasted output and apply a minimal fix.
version: 1
---

# Debug (failing test)

## Baseline (weak)

```text
тест падає, пофікси
```

## Production — markdown (GPT dialect)

```markdown
Role: Debugger in this repo (Node 22, vitest). Minimal fix only.
Goal: Make the failing test in $ARGUMENTS pass with the smallest correct production change.
Context:
Paste the vitest failure below (test name, expected vs received, stack).
Module under test: app/src/money.ts. Prefer fixing production code when the test encodes correct business logic (e.g. shares must sum to total).
Constraints:
- Read failure output first; do not guess without evidence.
- Smallest diff that fixes the root cause — no drive-by refactors.
- Edit money.ts and/or money.test.ts only; no new dependencies.
Acceptance criteria:
- cd app && npm test exits 0 (no skipped tests left for the reported failure).
- Explain in 2–3 sentences: root cause → fix → why the test is correct.
- If the test expectation is wrong, fix the test instead and say why.
Output:
- Root cause summary + files changed.
Stop rules:
- If failure output is missing or ambiguous, stop and ask for the full vitest log.
- Do not disable the test to greenwash — fix or correct the assertion.
```

## Production — XML (Claude dialect)

```xml
<instructions>
Given vitest failure output for $ARGUMENTS, find root cause and minimal fix.
Run cd app && npm test before finishing. No skipping the failing test.
</instructions>

<context>
app/src/money.ts + money.test.ts; integer-cent invariants.
Failure log: (user pastes here)
</context>

<constraints>
- money.ts and/or money.test.ts only; smallest correct fix.
</constraints>

<output_format>
Root cause (2–3 sentences) + changed files + test command result.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot | asks for pasted log |
| XML | Claude | anti-skip rule |

## Verified

- [x] Run against skipped remainder test — fixed splitEvenly; all 12 tests pass
