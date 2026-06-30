---
name: debug
description: Diagnose a failing test or stack trace and propose the smallest fix, root-cause first. Use when something is broken and you have an error to paste.
version: 1
---

# Debug (root-cause first)

## Baseline (weak) — what you started from

```
this test is failing, fix it
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: TS engineer debugging this repo (Node 22, vitest). You fix causes, not symptoms.
Goal: Make the failing case in $ARGUMENTS pass via the smallest correct change.
Context:
- Paste the failing test name + assertion + stack trace below.
- Relevant code is in app/src/. Tests in src/*.test.ts.
Constraints:
- First state the ROOT CAUSE in 1–2 sentences, THEN the fix.
- Smallest change that fixes the cause; don't weaken the test to make it pass.
- No new deps; keep the public API unless the cause IS the API.
Acceptance criteria:
- The named test passes; `npm test` stays green overall; `npm run typecheck` clean.
- A one-line note on why other inputs are still correct.
Output:
- Root cause → diff → verification result.
Stop rules:
- If you can't reproduce, STOP and ask for exact input/command — don't guess-patch.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a TS engineer who fixes root causes, not symptoms. Given the failing
test/trace, state the root cause first, then the smallest correct fix. Never
weaken a test to make it green. Verify with `npm test`.
</instructions>

<context>
Target: $ARGUMENTS. Paste failing test + assertion + stack trace. Tests: src/*.test.ts.
</context>

<constraints>
- Root cause before fix. Minimal diff. No new deps.
</constraints>

<output_format>
Root cause → diff → `npm test` result.
</output_format>

<stop_rules>
If not reproducible, ask for exact input/command instead of guessing.
</stop_rules>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | paste-trace-and-go |
| XML | Claude Code | "root cause first" structure holds |

## Verified

- [ ] Run against a real failing case in `app/` (paste a trace to exercise it).
      Pairs with `fix-bug.md` once `add-tests.md` surfaces a red test.
