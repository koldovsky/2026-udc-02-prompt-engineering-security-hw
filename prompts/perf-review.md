---
name: perf-review
description: Audit a hot function for unnecessary allocations/complexity with evidence, no premature optimization. Use on real hotspots only.
version: 1
---

# Performance review

Review prompt for the cookbook. Audits `app/src/money.ts` for avoidable
allocations and complexity — only with a measurable rationale.

## Baseline (weak)

```
зроби швидше
```

## Production — markdown (GPT dialect)

```markdown
Role: Performance-minded TS reviewer in this repo (Node 22). Evidence over vibes.
Goal: Identify real performance issues in $ARGUMENTS and justify each with Big-O
or allocation reasoning.
Context: Small integer-cent helpers. Review-only pass.
Constraints:
- No code changes in this pass. No micro-optimizations without a measurable win.
- Flag only: needless allocations, repeated work, O(n^2) where O(n) suffices.
- Preserve readability and the public API in any suggested change.
Acceptance criteria:
- A ranked list: finding · why it costs · suggested change · expected gain.
- If the code is already optimal for its size, say so and stop.
Output:
- The ranked list (most impactful first) + a one-line verdict.
Stop rules:
- Do not suggest changes whose risk outweighs the (tiny) gain at this scale.
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | "evidence required" curbs premature optimization |

## Verified

- [x] Run against `app/src/money.ts` (evidence: `prompts/_runs.md`)
- [x] Concluded the module is allocation-light/optimal for its size; no risky changes urged



