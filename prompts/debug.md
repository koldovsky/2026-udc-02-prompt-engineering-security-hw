---
name: debug
description: Diagnose a failing test or stack trace to root cause before proposing a fix. Use when something is broken.
version: 1
---

# Debug (root-cause first)

Drives the agent to find the *root cause* from a failing test or stack trace
before changing anything — no shotgun edits.

## Baseline (weak)

```
тест падає, полагодь
```

## Production — markdown (GPT dialect)

```markdown
Role: TS debugger in this repo (Node 22, vitest). You find root cause before fixing.
Goal: Explain why $ARGUMENTS (a failing test name or pasted stack trace) fails,
  then propose the smallest fix.
Context: app/src/money.ts + src/money.test.ts. Reproduce with `cd app && npm test`.
Constraints:
- Diagnose first; propose the fix as a diff but do NOT apply it until I confirm.
- Smallest change that fixes the root cause; no API changes; no new deps.
- No secrets/PII.
Acceptance criteria:
- A clear root-cause statement (file:line + why).
- A minimal proposed fix + the test that proves it.
Output:
- Root cause → proposed diff → how to verify.
Stop rules:
- If you cannot reproduce, STOP and list what info you need.
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot / ChatGPT | outcome-first, good for reasoning |

## Verified

- [x] Run against the planted `splitEvenly` remainder bug
- [x] Agent stated root cause before proposing a fix
