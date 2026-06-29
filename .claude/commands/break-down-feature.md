---
description: Decompose a feature description into a numbered, ordered list of implementation tasks
---

# Break Down Feature

Decompose the following feature into a numbered, ordered list of implementation tasks.

**Feature:** $ARGUMENTS

---

You are a tech lead. Do NOT write code. For the feature above, produce a task
list that a developer can execute one task at a time. Each task must be
independently reviewable and fit in a single commit or PR.

## Rules

- Order tasks by dependency — blockers come first.
- Cover all layers: types/model, core logic, tests, interface/export changes.
- No gold-plating — only tasks strictly required for this feature.
- No secrets or PII in examples; use synthetic values only.
- Maximum 10 tasks. If more are needed, state the feature must be split first.

## Output format

For each task:

```
N. **Title**
   Files: <file1>, <file2>
   Done when: <one verifiable condition>
   Complexity: S | M | L
```

End with a one-line dependency note if any task blocks another.

## Stop rules

- If the feature already exists in the codebase, name the existing implementation and stop.
- If the description is too vague to decompose, ask exactly one clarifying question and stop.
- If the feature needs more than 10 tasks, say so and stop — do not list partial tasks.
