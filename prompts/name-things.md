---
name: name-things
description: Suggest clearer names for variables/functions in a module — proposal first, no blind rename. Use to improve readability safely.
version: 1
---

# Name things (readability)

Point it at `app/src/money.ts`. It proposes better names as a table first; only
the exported API is off-limits to rename.

## Baseline (weak)

```
переназви змінні в money.ts красивіше
```

## Production — markdown (GPT dialect)

```markdown
Role: TS engineer improving readability in this repo. You propose before you rename.
Goal: Suggest clearer names for locals/params in $ARGUMENTS.
Context: Integer-cent money helpers with an existing passing test suite.
Constraints:
- Do NOT rename exported functions (public API is frozen).
- Present proposals as old -> new with a one-line reason BEFORE editing.
- If applying, rename consistently and keep `cd app && npm test` green.
- No secrets/PII.
Acceptance criteria:
- A table: location | old | new | reason.
- Any applied rename leaves behavior and tests unchanged.
Output:
- The proposal table, then (only if asked) the edited file.
Stop rules:
- If a rename touches the public API, list it as "skipped (public API)".
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot / ChatGPT | proposal table reads cleanly |

## Verified

- [x] Run against `app/src/money.ts` (dry-run: proposed local renames, API untouched)
