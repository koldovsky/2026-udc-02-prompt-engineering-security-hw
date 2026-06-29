---
name: refactor-extract-helpers
description: Extract private helpers inside a module without changing the public API.
version: 1
---

# Refactor (extract helpers)

## Baseline (weak)

```text
відрефактори money.ts
```

## Production — markdown (GPT dialect)

```markdown
Role: Careful TS refactorer in this repo. Behavior-preserving changes only.
Goal: Reduce duplication in $ARGUMENTS by extracting small **private** helpers (module-scoped functions, not exported).
Context: Integer-cent money module; full test suite in app/src/money.test.ts must keep passing unchanged.
Constraints:
- Edit only $ARGUMENTS; no new files, no new dependencies.
- Do NOT change exported function signatures or observable behavior.
- Helpers stay unexported; names start with a clear verb (e.g. `parseFractionDigits`).
Acceptance criteria:
- cd app && npm test exits 0; cd app && npm run typecheck exits 0.
- At least one duplicated pattern extracted (e.g. fraction padding, sign handling).
- Public exports unchanged (same names, params, return types).
- Diff is ≤40 lines net (small, reviewable refactor).
Output:
- List: extracted helper → what duplication it removes.
Stop rules:
- If tests fail, revert helper extraction and stop with the failing test name.
- Do not fix unrelated bugs — refactor only.
```

## Production — XML (Claude dialect)

```xml
<instructions>
Behavior-preserving refactor of $ARGUMENTS: extract private helpers, keep exports
identical. Run npm test and typecheck in app/ before finishing.
</instructions>

<context>
money.ts — integer cents; tests must pass unchanged.
</context>

<constraints>
- Target file only; unexported helpers; no deps; ≤40 line net diff.
</constraints>

<output_format>
Helper name → duplication removed. Confirm tests + typecheck.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Codex | explicit line budget |
| XML | Claude | behavior-preserving guard |

## Verified

- [x] Run against `app/src/money.ts` — extracted `padFractionDigits`; tests + typecheck green
