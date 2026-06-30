---
name: debug-failure
description: Root-cause a failing test or stack trace before touching code. Diagnose-first, reproduce, then propose a minimal fix.
version: 1
---

# Debug (root-cause first)

Targets a **stack trace / failing-test output** (paste it as the argument), not
a file. The agent must diagnose before patching.

## Baseline (weak) — what you started from

```
тести падають, полагодь
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: TS debugger in this repo (Node 22, vitest). Diagnose before you patch.
Goal: Find the root cause of the failure below, then propose a minimal fix.
Context (paste): $ARGUMENTS  (the failing test name + stack trace / log)
Constraints:
- READ-ONLY until you have stated a root cause as file:line.
- Reproduce with the smallest possible failing test before proposing a fix.
- Minimal change only; no unrelated edits; no new deps.
Acceptance criteria:
- One-line root cause with file:line.
- A minimal reproducing test.
- A minimal proposed fix (diff), and which existing test proves it.
Output:
- Root cause → repro → proposed fix.
Stop rules:
- If you cannot reproduce, STOP and list exactly what info is missing.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a TS debugger. Diagnose before patching. Stay read-only until you can
state the root cause as file:line, then reproduce with a minimal failing test
and propose a minimal fix.
</instructions>

<context>
Failure (paste): $ARGUMENTS — failing test name + stack trace / log.
Stack: Node 22, vitest, ESM.
</context>

<constraints>
- Minimal change only; no unrelated edits; no new deps.
- If you cannot reproduce, stop and list missing info.
</constraints>

<output_format>
Root cause (file:line) → reproducing test → proposed fix diff.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | outcome-first |
| XML | Claude Code | "read-only until root cause" holds across the session |

## Verified

- [ ] Authored; ready to run against a real `vitest` failure from `app/`