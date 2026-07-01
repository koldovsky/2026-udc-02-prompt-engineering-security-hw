---
name: write-readme
description: Generate or update a README.md for a TS module or project. Covers purpose, installation, usage examples, API reference, and known limitations. Use when a module is undocumented or the README is stale.
version: 1
---

# Write README

Point this at a module or the project root — it will produce a developer-ready
README covering purpose, setup, usage examples, API reference, and known
limitations. Aim it at `app/` and it should document the integer-cent model,
every exported function with an example, and flag the known gaps in
`splitEvenly` and `applyDiscount`.

## Baseline (weak) — what you started from

```
write a readme for app
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior TS technical writer in this repo (Node 22). You write concise, copy-paste-ready documentation.
Goal: Write or update README.md for $ARGUMENTS so a developer can understand, install, and use the module without reading the source.
Context: `app/src/money.ts` (integer-cent money helpers), `app/src/money.test.ts` (usage examples live here too).
Constraints:
- Output the README only; do NOT modify source or test files.
- Include real, runnable code examples (TypeScript snippets, not pseudo-code).
- Document known limitations honestly — do NOT hide bugs or pretend they are features.
- No secrets/PII in output; use placeholder values in examples (e.g. `1000` for cents, not real account data).
Acceptance criteria:
- Sections present: Overview | Installation | Usage | API reference | Known limitations | Contributing.
- Every exported function appears in API reference with signature, description, and at least one example.
- A developer can run the project using only the README instructions.
Output:
- Full README.md content, ready to write to disk.
Stop rules:
- If the module has no exported functions, stop and report.
- If an example would require real secrets or PII to be meaningful, use a clearly synthetic placeholder and note it.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a senior TS technical writer (Node 22). Write a developer-ready
README.md for the target module or project. Include real, runnable TypeScript
examples. Document known limitations honestly. Use only synthetic placeholder
values in examples — no real secrets or PII.
</instructions>

<context>
Target: $ARGUMENTS
Implementation: `app/src/money.ts` (integer-cent money helpers).
Test suite: `app/src/money.test.ts` — mine for usage examples.
Known limitations: `splitEvenly` drops remainder cents; `applyDiscount` does
not validate the `percent` range.
</context>

<constraints>
- Output README content only; do not modify source or test files.
- Every exported function must appear in the API reference with signature,
  description, and at least one example.
- No real secrets or PII — use synthetic placeholders and note them.
- Stop and report if the module has no exported functions.
</constraints>

<output_format>
Full README.md with sections:
1. Overview
2. Installation
3. Usage (quick-start snippet)
4. API reference (one sub-section per export)
5. Known limitations
6. Contributing
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex / ChatGPT | outcome-first; the section list in constraints is enough structure for GPT |
| XML | Claude Code / Claude | numbered output_format guarantees all six sections appear even for small modules |

## Verified

- [ ] Run against `app/` directory
- [ ] All exported functions documented with examples; known limitations section present; output contains no real secrets or PII
