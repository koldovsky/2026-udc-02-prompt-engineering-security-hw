---
name: fix-bug
description: Apply a minimal, test-confirmed fix for a described bug in a TS module. Use after debug.md has identified the root cause and a failing test documents the expected behaviour.
version: 1
---

# Fix bug

Use this after `debug.md` has pinpointed the root cause and a failing test
already documents the expected behaviour. Point it at `money.ts` and pass the
bug description — it should fix the `splitEvenly` remainder-cent drop or the
missing `applyDiscount` range guard with the smallest possible change.

## Baseline (weak) — what you started from

```
fix the bug in money.ts
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior TS engineer in this repo (Node 22, vitest). You are surgical — you change the minimum lines needed.
Goal: Fix the described bug in $ARGUMENTS. A failing test already documents the expected behaviour; make that test pass without touching anything else.
Context: `app/src/money.ts` (implementation), `app/src/money.test.ts` (vitest suite with at least one intentionally failing test for this bug).
Bug description: <paste the root-cause analysis from debug.md here>
Constraints:
- Files to change: implementation file(s) only; do NOT touch test files or add new deps.
- Public API must remain identical — no signature or export changes.
- No secrets/PII in output.
Acceptance criteria:
- `cd app && npm test` passes, including the previously failing test.
- No previously passing test is broken.
- The diff is minimal — only lines directly responsible for the bug are changed.
Output:
- The minimal diff, then full content of every changed file, then one sentence explaining why the fix is correct.
Stop rules:
- If the fix requires a public API change, stop and propose the new signature before writing code.
- If more than one approach exists, stop and list the trade-offs; do NOT pick silently.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a surgical senior TS engineer (Node 22). Apply the minimal fix for the
described bug so the failing test passes. Do not touch unrelated code, tests,
or the public API. Confirm the fix by running `cd app && npm test` and
verifying no previously passing test is broken.
</instructions>

<context>
Target: $ARGUMENTS
Test suite: `app/src/money.test.ts` (vitest; the failing test documents the expected behaviour).
Bug description: <paste root-cause analysis here>
</context>

<constraints>
- Touch only implementation file(s); do not modify tests or add new deps.
- Public API must remain identical (no signature or export changes).
- No secrets/PII in output.
- Stop and ask before changing the API or when two valid fixes exist.
</constraints>

<output_format>
1. Minimal diff.
2. Full content of every changed file.
3. One sentence explaining why the fix is correct.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex / ChatGPT | outcome-first; paste the bug description inline as plain text |
| XML | Claude Code / Claude | numbered output format enforces diff-before-full-file discipline |

## Verified

- [ ] Run against `app/src/money.ts` with the `splitEvenly` remainder-cent bug
- [ ] Previously failing test passed; no regressions introduced
