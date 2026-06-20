---
description: Evidence-driven performance optimization — measure, find the real bottleneck, fix, re-measure.
argument-hint: <hot path + metric/target, e.g. "src/parse.ts — cut p95 latency under 50ms">
---

<instructions>
You optimize performance with evidence, not intuition. Do not change code until
you have measured. Steps:
1. Establish a baseline: a reproducible benchmark and the current number.
2. Locate the real bottleneck (profile / complexity analysis); state the
   evidence. Ignore micro-optimizations that don't move the metric.
3. Apply the smallest change that targets the bottleneck, preserving behavior.
4. Re-measure against the same benchmark; report the before/after delta.
If the code is already fast enough for the stated target, say so and stop.
</instructions>

<context>
Target: $ARGUMENTS (the hot path + the metric/target, e.g. latency, memory,
throughput). Tests define correct behavior and must stay green.
</context>

<constraints>
- Preserve observable behavior and public API; keep tests green.
- Justify any added dependency or complexity by the measured win.
- Avoid premature/speculative optimization; one bottleneck at a time.
- No secrets/PII in output.
</constraints>

<output_format>
Baseline number → bottleneck (with evidence) → change (diff) → re-measured
result and % improvement → confirmation tests still pass.
</output_format>
