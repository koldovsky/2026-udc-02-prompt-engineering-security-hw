---
name: explain-code
description: Explain what a module does and why, for onboarding — no edits. Use to ramp a new teammate on an unfamiliar file.
version: 1
---

# Explain code (onboarding)

Point it at `app/src/money.ts`; it produces a plain-language tour without
changing anything.

## Baseline (weak)

```
поясни що робить money.ts
```

## Production — markdown (GPT dialect)

```markdown
Role: Senior TS engineer onboarding a teammate to this repo.
Goal: Explain what $ARGUMENTS does, the key invariants, and the gotchas.
Context: Integer-cent money helpers. The reader knows TS but not this file.
Constraints:
- Read-only — do NOT edit code.
- Ground every claim in the actual code (cite function names).
- Call out the cents-not-floats invariant and any known rough edges, honestly.
- No secrets/PII.
Acceptance criteria:
- A one-paragraph overview + a per-function bullet (what it takes, returns, throws).
- A "watch out" list of edge cases a caller must handle.
Output:
- The explanation only — no file changes.
Stop rules:
- If behavior is unclear, say "unclear: <why>" rather than guessing.
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | ChatGPT / Copilot | prose-friendly |

## Verified

- [x] Run against `app/src/money.ts` (dry-run: accurate per-function tour, no edits)
