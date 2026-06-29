---
name: performance-optimization
description: Profile and optimize hot paths in the money utility module without changing public API. Use when a benchmark or profiler highlights a bottleneck.
version: 1
---

# Performance optimization

A worked example for squeezing unnecessary allocations or computation out of
`app/src/money.ts`. The canonical target is `splitEvenly`, which allocates an
intermediate array on every call.

## Baseline (weak)

```
зроби money.ts швидшим
```

## Production — markdown (GPT dialect)

```markdown
Role: Senior TS engineer in this repo (Node 22). You optimise for real, measured
gains — no micro-optimisation theatre, no premature abstractions.
Goal: Identify the highest-impact performance bottleneck in app/src/money.ts and
apply the minimal change that reduces unnecessary work. Public API must remain
identical.
Context: Integer-cent money helpers called in a tight loop by a billing engine
processing ~50 000 invoices/second. Hottest path is splitEvenly — called once per
invoice. Secondary concern: repeated string operations in formatCents.
Constraints:
- Edit only app/src/money.ts; do NOT touch app/src/money.test.ts or any other file.
- No new npm dependencies.
- Keep every exported function signature unchanged (name, parameter order, return type).
- No secrets or PII in code or comments.
- Do not add a caching layer that breaks thread-safety or introduces hidden state.
Acceptance criteria:
- `npx vitest run` exits 0 (all existing tests still pass).
- The optimised function(s) are annotated with a one-line comment explaining the
  change and why it is faster.
- No new O(n²) loops introduced anywhere.
Output:
- The updated app/src/money.ts only (no benchmarks, no explanatory prose).
Stop rules:
- If no measurable bottleneck exists in the file as written, explain why and stop.
- If the required optimisation would break the public API, describe the trade-off
  and stop.
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are a senior TS engineer. Find and fix the highest-impact performance
bottleneck in app/src/money.ts without changing any public API or breaking any
existing test. Annotate each changed line or block with a brief comment explaining
the speedup. Do not edit any other file.
</instructions>

<context>
Target: app/src/money.ts (integer-cent money helpers). Runtime: Node 22.
Call profile (synthetic benchmark, not real secrets):
- splitEvenly(totalCents, n): ~50 000 calls/s; n is typically 2–10.
- formatCents(cents): ~50 000 calls/s in report generation.
- parseAmount, applyDiscount, addTax: low frequency, not hot.
Known inefficiency: Array.from({ length: n }, ...) inside splitEvenly allocates
a new array object and iterates twice (once to create, once in the callback).
A pre-allocated loop with push would allocate once.
</context>

<constraints>
- Edit only app/src/money.ts; do not modify test files or any other file.
- Keep all exported function signatures identical (name, params, return type).
- No new npm dependencies.
- No secrets or PII in code or comments — use synthetic values only.
- Do not introduce mutable module-level state (no hidden caches).
</constraints>

<output_format>
Return the updated app/src/money.ts in full. No prose, no diff — complete file
content only, with inline comments on each changed block.
</output_format>

<stop_rules>
- If no actionable bottleneck exists given the call profile, explain why and stop.
- If fixing the bottleneck requires a breaking API change, describe the trade-off
  and stop.
</stop_rules>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / ChatGPT | call-profile context reads naturally as prose; acceptance criteria are easy to follow |
| XML | Claude Code / Claude | `<context>` separates the synthetic benchmark from the constraints; avoids confusion |

## Verified

- [x] Run against `app/src/money.ts`
- [x] Agent replaced `Array.from` with `new Array(n)` + for-loop in `splitEvenly`; `npx vitest run` still exits 0
