---
name: explain-module
description: Onboarding summary of a module — read-only, no edits. Use when ramping up.
version: 1
---

# Explain module

## Baseline (weak)

```
поясни що тут відбувається
```

## Production — markdown (GPT dialect)

```markdown
Role: Senior engineer onboarding a teammate. Read-only — do not edit files.
Goal: Explain $ARGUMENTS in plain language so someone can use it safely in 5 minutes.
Context: Small TS module in app/src; amounts are integer cents. Tests in src/*.test.ts show expected behavior.
Constraints:
- Read-only; no file changes, no running destructive commands.
- No secrets/PII in examples — use synthetic amounts only.
Acceptance criteria:
- Sections: Purpose (1 paragraph), Public API (table: function → in → out → throws?), Invariants (integer cents, rounding rules), Known risks / edge cases (from code + tests), How to verify (`cd app && npm test`).
- Mention every exported symbol by name.
- ≤400 words unless the module is large.
Output:
- Markdown summary (not a code change).
Stop rules:
- If the path is not a TS/JS module, stop and ask for a valid target.
- Do not propose fixes — explanation only (use review/debug prompts for fixes).
```

## Production — XML (Claude dialect)

```xml
<instructions>
Read-only onboarding summary of $ARGUMENTS. Cover purpose, API table, invariants,
edge cases, and how to run tests. Do not edit files.
</instructions>

<context>
app/src money helpers; integer cents; vitest in app/.
</context>

<constraints>
- Synthetic examples only; no secrets/PII; ≤400 words.
</constraints>

<output_format>
Markdown: Purpose, Public API table, Invariants, Risks, Verify command.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | ChatGPT / Copilot | section checklist |
| XML | Claude | read-only boundary |

## Verified

- [x] Run against `app/src/money.ts` — produced API table + remainder-cent risk note
