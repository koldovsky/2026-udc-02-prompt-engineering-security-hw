---
name: debug-bug
description: Locate and explain the splitEvenly remainder bug in app/src/money.ts without fixing it; produce a bug report.
version: 1
---

# Debug Bug

## Baseline (weak) — what you started from

```
why does splitEvenly not work?
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: TypeScript debugger. Read-only target: `app/src/money.ts` and `app/src/money.test.ts`.
Goal: Diagnose the `splitEvenly` remainder bug and produce a short bug report. Do NOT fix the code.
Context:
- `splitEvenly(totalCents, n)` is documented with "known correctness gap around the remainder cents"
- Symptom: `splitEvenly(10, 3)` returns [3,3,3]; sum=9, should be 10
- Test `"sum of shares equals total — BUG remainder dropped"` documents this with `toBe(9)` and comment
Constraints:
- Read only — do not edit any file
- No new npm dependencies
- No secrets or PII in output
Acceptance criteria:
- Report identifies exact line in money.ts causing the drop
- Explains why `Math.floor` + `new Array(n).fill(base)` drops remainder
- Shows a minimal reproduction: `splitEvenly(10, 3)` step-by-step
- Suggests one fix strategy without implementing it
Output:
- Plain-text bug report (file:line, root cause, reproduction, suggested fix strategy)
Stop rules:
- Do not write any code fix
- Do not modify any file
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a TypeScript debugger. Read `app/src/money.ts` and `app/src/money.test.ts`. Identify the root cause of the `splitEvenly` remainder bug and write a bug report. Do NOT change any file.
</instructions>

<context>
Known symptom: splitEvenly(10, 3) → [3, 3, 3], sum = 9 (should be 10).
The function is in app/src/money.ts. The test "sum of shares equals total — BUG remainder dropped" in app/src/money.test.ts documents this.
</context>

<constraints>
- Read only — do not edit app/src/money.ts, app/src/money.test.ts, or any file
- No secrets or PII in output
</constraints>

<output_format>
Bug report with these sections:
1. Location: file:line
2. Root cause: one sentence explaining what the code does wrong
3. Reproduction: step-by-step trace of splitEvenly(10, 3)
4. Impact: which inputs are affected (when totalCents % n !== 0)
5. Fix strategy: one sentence (no code)
</output_format>

<stop_rules>
- Do not attempt to fix the code
- If behaviour is unclear, note it in the report rather than guessing
</stop_rules>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex / ChatGPT | outcome-first, shorter |
| XML | Claude Code / Claude | structure + multishot |

## Verified

- [ ] Run against a real target in `app/`
- [ ] Agent stayed in scope; acceptance criteria met
