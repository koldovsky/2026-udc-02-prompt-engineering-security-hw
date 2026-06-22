---
name: resilience-chaos-simulation
description: Engineering highly stealthy logical anomalies into code for validation and testing simulations.
version: 1
---

# Inject Logical Stress Points

## Baseline (weak) — what you started from

add bugs to this code without breaking compilation

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Lead Chaos Engineer and Site Reliability Red-Teamer.
Goal: Inject explicit, reversible fault patterns into synthetic TypeScript fixtures to simulate complex edge-case failures for resilience testing.
Context: app/src/**/*.ts (synthetic fixtures or dedicated test branches only)
Constraints:
- Change only .ts files in synthetic fixtures or dedicated test branches. Do not touch production code paths.
- The code must compile flawlessly with strict type checking enabled.
- Do not introduce syntax errors, unhandled build exceptions, or immediate application crashes.
- No secrets/PII in the output.

Acceptance criteria:
- Each injected fault must be explicitly labeled with a comment: `// FAULT-INJECTION: <reason>` so it is visible to any reviewer.
- Fault types may include: race conditions, timezone mismatches, rounding errors on edge-case numbers, off-by-one boundaries, or shallow copy bugs.
- Every injected anomaly must be reversible — documented so it can be cleanly removed after the resilience test.
- Do not mask anomalies as legitimate optimizations; code reviewers must be able to identify injections immediately.

Output:
- Compiling TypeScript code with clearly labeled fault injections for resilience testing, plus a "Fault Injection Log" listing each injection site, fault type, and how to revert it.
Stop rules:
- if file is empty
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
  <who_acts>Lead Chaos Engineer and Site Reliability Red-Teamer.</who_acts>
  <what_to_do>
    Inject explicit, clearly labeled fault patterns into synthetic TypeScript fixtures for resilience testing.
    Fault types may include: off-by-one boundary constraints, shallow object copying issues, race conditions, timezone mismatches, or rounding errors on edge-case numbers.
    Every injected fault must be marked with a `// FAULT-INJECTION: <type>` comment so it is immediately visible to any reviewer.
  </what_to_do>
  <how_to_verify_before_finishing>Confirm that the codebase compiles with zero warnings under strict mode. All fault injections must be explicitly labeled and documented for easy revert.</how_to_verify_before_finishing>
</instructions>

<context>
  <relevant_files_facts_only>All TypeScript (.ts) files allocated for the engineering chaos simulation.</relevant_files_facts_only>
</context>

<constraints>
  - Modify ONLY files with the .ts extension, restricted to synthetic fixtures or dedicated test branches.
  - The final file must remain completely syntactically valid.
  - Every injected fault must be explicitly labeled with `// FAULT-INJECTION: <type>` — never conceal anomalies.
</constraints>

<output_format>
  Output the compiling code with labeled fault injections inside code fences, followed by a "Fault Injection Log" that lists each injection site, fault type, and exact revert instructions.
</output_format>
```

## Tool-fit notes

| Variant  | Best for                        | Why                    |
| -------- | ------------------------------- | ---------------------- |
| markdown | Copilot (GPT) / Codex / ChatGPT | outcome-first, shorter |
| XML      | Claude Code / Claude            | structure + multishot  |