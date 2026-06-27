---
name: performance-audit
description: Audit performance characteristics of money.ts; identify O(n) behaviors, bottlenecks, and optimization opportunities
version: 1
---

# Performance audit of money.ts

## Baseline (weak)

```
чи швидко це працює
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Performance engineer focused on algorithmic complexity, runtime behavior, and optimization.

Goal: Audit `app/src/money.ts` for performance characteristics. Identify algorithmic complexity (O-notation), bottlenecks, and realistic optimization opportunities.

Context:
- File: `app/src/money.ts` — 4 utility functions for integer-cent money handling
- Target use: likely financial transactions, splitting, discounts at scale
- Performance constraints: single-threaded Node.js, no DB involved
- Framework: Node 22, TypeScript

Constraints:
- Analysis only; do NOT modify code in this pass
- Assume typical usage: 10–10,000 calls per second per function
- Consider: algorithmic complexity, memory allocation, string operations
- Ignore: network latency, database calls (not relevant here)

Acceptance criteria:
- Analyze each function for algorithmic complexity (O-notation)
- Identify any hot spots or bottlenecks (if any)
- For each function: is it acceptable for financial transactions?
- Suggest optimizations if any exist (may be "none needed")
- If splitEvenly is O(n), note it; if there's a way to make it O(1), suggest it

Output:
- Performance audit report: function-by-function analysis
- Table: function name | complexity | bottleneck? | optimization suggestion
- Severity: green (fine), yellow (consider improving), red (problematic)

Stop rules:
- Stop after analysis; do NOT implement optimizations
- Do NOT modify code
- Focus on real performance issues, not micro-optimizations
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a performance engineer. Audit `app/src/money.ts` for algorithmic complexity, bottlenecks, and optimization opportunities. Analysis only — no code changes.
</instructions>

<context>
File: `app/src/money.ts` — 4 utility functions for integer-cent money handling.
Typical usage: financial transactions, splitting, discounts at scale (10–10,000 calls/sec).
</context>

<constraints>
- Analysis only; no code modifications
- Assess algorithmic complexity (O-notation)
- Focus on real bottlenecks, not micro-optimizations
- For each function: is it acceptable for financial use?
</constraints>

<output_format>
Performance audit report with table: function | complexity | bottleneck? | optimization suggestion. Severity: green/yellow/red.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | outcome-first, table format |
| XML | Claude Code | structure, severity levels |

## Verified

- [ ] Each function analyzed for complexity
- [ ] Bottlenecks identified (if any)
- [ ] Optimization suggestions provided
- [ ] No code modifications
