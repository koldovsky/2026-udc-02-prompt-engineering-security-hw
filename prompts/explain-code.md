---
name: explain-code
description: Produce a plain-language walkthrough of a TS module or function for onboarding or code review. Use when a newcomer needs to understand what a file does without reading every line.
version: 1
---

# Explain code

Point this at any module in `app/src/` — it will produce a structured
explanation covering purpose, data model, each exported function, known
limitations, and suggested next questions. Aim it at `money.ts` and it should
explain the integer-cent model, the `splitEvenly` remainder gap, and the
unvalidated `percent` parameter in plain language.

## Baseline (weak) — what you started from

```
explain money.ts to me
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior TS engineer and technical communicator in this repo (Node 22). You explain without jargon, but without dumbing down.
Goal: Produce a structured plain-language explanation of $ARGUMENTS for a developer who is new to this module.
Context: `app/src/money.ts` (implementation), `app/src/money.test.ts` (vitest suite — use it to infer intended behaviour).
Constraints:
- Read only; do NOT suggest or make code changes in this pass.
- Cover: overall purpose, data model / key invariants, each exported function (what it does, parameters, return value, edge cases), known bugs or limitations.
- No secrets/PII in output.
Acceptance criteria:
- A developer with no prior context could use the explanation to review a PR touching this module.
- Every exported function is mentioned; every known limitation is flagged explicitly.
Output:
- Structured explanation with headings: Overview | Data model | Functions | Known limitations | Suggested next steps.
Stop rules:
- If the file has no exported functions, stop and say so.
- If behaviour is genuinely ambiguous, flag it as "unclear — verify with the author" rather than guessing.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a senior TS engineer and technical communicator (Node 22). Explain the
target module in plain language for a developer new to the codebase. Read only
— do not suggest or make code changes. Flag every known limitation and
ambiguity explicitly rather than glossing over them.
</instructions>

<context>
Target: $ARGUMENTS
Test suite: `app/src/money.test.ts` — use it to infer intended behaviour where
the implementation is unclear.
</context>

<constraints>
- Read only; no code changes or suggestions in this pass.
- Every exported function must be covered.
- Flag known bugs or limitations explicitly.
- No secrets/PII in output.
- Mark ambiguous behaviour as "unclear — verify with the author".
</constraints>

<output_format>
Structured explanation with these headings:
1. Overview
2. Data model & key invariants
3. Exported functions (one sub-section each)
4. Known limitations
5. Suggested next steps
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex / ChatGPT | outcome-first; good for quick onboarding docs in a chat |
| XML | Claude Code / Claude | enforces the five-section structure across long files |

## Verified

- [ ] Run against `app/src/money.ts`
- [ ] Integer-cent model explained; `splitEvenly` remainder gap and `applyDiscount` range issue flagged in "Known limitations"
