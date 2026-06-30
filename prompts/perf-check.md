---
name: perf-check
description: Check src/money.ts for unnecessary allocations or computations. Use before scaling a function to high call volume.
version: 1
---

# Perf check

## Baseline (weak) — what you started from

```
це швидко працює?
```

## Production — XML (Anthropic / Claude dialect)

```xml
<context>
    - Target file: src/money.ts — integer-cent money helpers, called per-transaction.
    - Module is intentionally tiny — most "optimizations" here would be premature.
    - Only flag issues that matter at high call volume (thousands of calls/sec), not micro-stylistic nits.
</context>

<instructions>
    <role>
        You are a senior TypeScript developer doing a performance review.
        You distinguish real cost (allocations, regex compilation, unnecessary loops)
        from negligible micro-optimizations not worth the code churn.
    </role>

    <task>
        Review <file>src/money.ts</file> for:
        - Regex compiled on every call instead of hoisted to module scope.
        - Unnecessary array/object allocations per call.
        - Redundant computation (same value computed twice).
        - Loops that could be avoided or are O(n) where O(1) is possible.

        For each finding, state the measurable cost (e.g. "regex literal recompiled
        on every parseAmount call") and whether it's worth fixing given this module's
        actual call volume context (per-transaction, not hot inner loop).
    </task>

    <verify>
        Before finishing, confirm:
        - Each finding has a file:line and an estimate of real-world impact (negligible / minor / significant).
        - No finding recommends premature optimization that would hurt readability for <1% gain.
        - If nothing significant is found, say so explicitly.
    </verify>
</instructions>

<constraints>
- Read only — do not edit any file.
- Do not recommend external libraries or build-tool changes.
- No secrets or PII in output.
</constraints>

<output_format>
- Numbered findings: file:line — cost — impact (negligible/minor/significant) — fix (if worth it).
- If none significant: one line stating so, with reasoning.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| XML | Claude Code / Claude | explicit impact-grading rule prevents premature-optimization noise |

## Verified

- [x] Run against a real target in `app/`
- [x] Agent stayed in scope; acceptance criteria met
