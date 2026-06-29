---
name: break-down-feature
description: Break a feature description into concrete, ordered implementation tasks. Use when planning any new feature before touching code.
version: 1
---

# Break down feature

A generic prompt for decomposing a feature request into actionable implementation
tasks with clear scope, order, and done criteria. Works for any codebase —
paste the feature description as the argument.

Worked example target: adding `convertCurrency(cents, rate)` to `app/src/money.ts`.

## Baseline (weak)

```
розбий цю фічу на задачі
```

## Production — markdown (GPT dialect)

```markdown
Role: Tech lead and senior engineer. You plan implementation work — you do NOT
write code. You reason about dependencies, scope, and risk before touching files.
Goal: Break the feature described below into a numbered, ordered list of
implementation tasks that a developer can execute one at a time.
Context: Feature to break down —
  <FEATURE_DESCRIPTION>
Each task must be independently reviewable (fits in one PR or one commit). Output
only tasks that are strictly necessary — no gold-plating, no speculative extras.
Constraints:
- Do not write any implementation code.
- No secrets or PII in task descriptions — use synthetic examples only.
- If the feature is too vague to decompose, ask one clarifying question and stop.
Acceptance criteria:
- Every task has: a title, the files it touches, a one-line done criterion.
- Tasks are ordered by dependency (blockers first).
- The list covers: data model / types, core logic, tests, and any interface changes.
- A developer can start task 1 immediately without further clarification.
Output:
- Numbered task list in the format:
    N. **Title** — files: <list> — done when: <verifiable condition>
- A short dependency note if any task blocks another.
- Complexity label per task: S / M / L.
Stop rules:
- If the feature duplicates existing functionality, say so and stop.
- If the feature requires an external service not yet configured, flag it and stop.
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are a tech lead. Decompose the feature in <feature> into a numbered,
ordered list of implementation tasks. Do NOT write code. Each task must be
independently reviewable, have a clear done criterion, and name the files it
touches. Order tasks by dependency — blockers first. Label each S / M / L for
complexity. If the feature is too vague, ask one clarifying question and stop.
</instructions>

<feature>
<!-- paste feature description here -->
</feature>

<constraints>
- Output tasks only — no code, no prose explanations beyond the task list.
- Cover all layers: types/model, core logic, tests, interface/export changes.
- No gold-plating: include only what is strictly necessary for this feature.
- No secrets or PII in examples — use synthetic values only.
- Maximum 10 tasks; if more are needed, flag that the feature needs splitting.
</constraints>

<output_format>
Return a numbered list. Each item:
  N. **Title**
     Files: <file1>, <file2>
     Done when: <one verifiable condition>
     Complexity: S | M | L

End with a one-line dependency summary if any task blocks another.
</output_format>

<stop_rules>
- If the feature duplicates existing exported functionality, name the duplicate and stop.
- If the description is ambiguous beyond decomposition, ask exactly one clarifying
  question and stop — do not guess.
- If the feature requires more than 10 tasks, state that it needs decomposition
  into sub-features and stop.
</stop_rules>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / ChatGPT | freeform output reads naturally; acceptance criteria as prose suits GPT |
| XML | Claude Code / Claude | structured tags let Claude separate the feature spec from constraints cleanly |

## Verified

- [x] Run against a real feature request targeting `app/src/money.ts`
- [x] Agent produced ordered tasks; no code written; done criteria are verifiable
