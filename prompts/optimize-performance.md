---
name: optimize-performance
description: Evidence-driven performance optimization — measure, find the real bottleneck, fix, re-measure. Use when something is provably too slow.
version: 1
---

# Optimize performance (measure first)

Point this at slow code with a metric/target. It should optimize based on
measurement, not guesses, and preserve behavior — proven by tests and numbers.

## Baseline (weak) — what you started from

```
make it faster
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: You are a senior engineer working in the `repo/stack` below. You will profile, optimize, and verify a known slow path without changing intended behavior.

Goal: Improve the performance of the specified code path to meet the target performance result stated below, while preserving functional behavior and passing all existing tests.

Context:
- Repo/stack: `<repository name and tech stack>`
- Slow path / hotspot: `<file(s), function(s), endpoint(s), job(s), query(ies)>`
- Current baseline measurement: `<latency / throughput / CPU / memory / p95 / p99 / wall time>`
- Target performance result: `<explicit numeric target, e.g. reduce p95 from 420ms to <= 180ms, or cut runtime by 35%>`
- Measurement method: `<benchmark command, profiler, trace, load test, or test fixture>`
- Relevant constraints from the codebase: `<important architecture or domain facts>`

Constraints:
- Scope changes only to: `<allowed files / modules>`
- Do not change public APIs, external behavior, or data formats unless explicitly approved.
- Do not add new dependencies unless strictly necessary and justified.
- Use measurement, profiling, and benchmarks to guide every optimization decision; do not guess.
- Preserve behavior exactly; prove it with tests.
- Do not include secrets, credentials, PII, or proprietary data in outputs.

Acceptance criteria:
- The target performance result is met or exceeded according to the agreed measurement method.
- Before/after numbers are reported for the baseline and the optimized version.
- Relevant tests pass, including regression tests for the changed path.
- Any performance claim is backed by a reproducible command or benchmark output.

Output:
- A concise summary of what changed.
- The exact files modified.
- Before/after performance numbers with the measurement command used.
- Any tradeoffs, risks, or follow-up items that remain.

Stop rules:
- Stop and ask for clarification if the target performance result, benchmark command, or scope is missing.
- Stop and abstain if meeting the target would require changing public behavior, adding unacceptable dependencies, or violating the scope.
- Stop once the target is reached and verified with tests and measurements; do not keep optimizing without a measurable reason.
```

## Production — XML (Anthropic / Claude dialect)

```xml
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
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex | outcome-first, shorter |
| XML | Claude Code / Claude | "measure before/after" blocks guesswork edits |

## Verified

- [x] Run against a real hot path
- [x] Bottleneck shown with evidence; measured win; behavior/tests unchanged
