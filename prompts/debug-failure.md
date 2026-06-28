---
name: debug-failure
description: Root-cause a failing test or stack trace, decide source-bug vs test-bug, and propose the minimal fix plus a regression test. Paste the failure as $ARGUMENTS.
version: 1
---

# Debug a failure

Diagnose before you change anything. Verified against the `app/src/money.ts`
failures (remainder cents, out-of-range percent).

## Baseline (weak) — what you started from

```
this test is failing, fix it
```

## Production — markdown (GPT dialect)

```markdown
Role: You are a senior TS engineer debugging methodically (Node 22, vitest).
Goal: Find the root cause of this failure and propose the minimal correct fix: $ARGUMENTS.
Context:
- Source in `app/src/*.ts`; tests in the sibling `*.test.ts`. Reproduce with `cd app && npm test`.
Constraints:
- Diagnose FIRST: trace the failing assertion to the exact line and explain the mechanism before proposing any change.
- Decide explicitly whether the SOURCE is wrong or the TEST is wrong — do not "fix" by weakening a correct test to match buggy output.
- Propose the smallest change that fixes the real defect; include a regression test. No new deps, no secrets/PII.
Acceptance criteria:
- A root-cause explanation (file:line + mechanism), the verdict (source-bug | test-bug), the minimal patch, and a regression test.
- After the proposed fix, `cd app && npm test` would be green for the right reason.
Output:
- Diagnosis → verdict → minimal diff → regression test, in that order.
Stop rules:
- If the root cause is unclear, list the top hypotheses and the one experiment that would distinguish them — don't guess-patch.
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are a methodical TS debugger. Root-cause this failure and propose the minimal
correct fix: $ARGUMENTS. Diagnose to file:line before changing anything, and decide
explicitly whether the source or the test is wrong. Reproduce with `cd app && npm test`.
</instructions>

<context>
Source in app/src/*.ts; tests in the sibling *.test.ts.
</context>

<constraints>
- Don't weaken a correct test to match buggy output. Smallest fix for the real defect + a regression test. No new deps, no secrets/PII.
</constraints>

<output_format>
Diagnosis (file:line + mechanism) → verdict (source-bug|test-bug) → minimal diff →
regression test.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex / ChatGPT | outcome-first, shorter |
| XML | Claude Code / Claude | structure enforces diagnose-before-fix |

## Verified

- [x] Run against a real `app` failure (e.g. `splitEvenly` remainder)
- [x] Correct verdict + minimal fix + regression test; no test weakened
