---
name: write-docs
description: Add or improve JSDoc on exported functions. Use before publishing a module.
version: 1
---

# Write docs

## Baseline (weak)

```
задокументуй money.ts
```

## Production — markdown (GPT dialect)

```markdown
Role: Technical writer + TS engineer in this repo. You document public API only.
Goal: Improve JSDoc on every exported function in $ARGUMENTS so a new teammate understands inputs, outputs, and errors without reading the body.
Context: Integer-cent money helpers in app/src. Existing one-line comments may be incomplete — add @param, @returns, @throws, @example where useful.
Constraints:
- Edit only the target file ($ARGUMENTS); no logic changes unless a comment is objectively wrong.
- Keep examples synthetic (no real PII, cards, or account numbers).
- Match existing comment style (/** … */).
Acceptance criteria:
- Every `export function` has a JSDoc block with @param and @returns.
- Functions that throw document @throws with the error message pattern.
- At least one @example per export using small round numbers (e.g. 42800 cents).
- cd app && npm run typecheck exits 0; cd app && npm test still passes (no behavior change).
Output:
- Updated file diff summary: function → what was documented.
Stop rules:
- If the file has no exports, stop and say so.
- Do not add README or new files unless asked; JSDoc only.
```

## Production — XML (Claude dialect)

```xml
<instructions>
Document every exported function in $ARGUMENTS with JSDoc (@param, @returns,
@throws, @example). No logic changes. Run typecheck and tests in app/ before finishing.
</instructions>

<context>
Integer-cent money module. Synthetic examples only — no PII or secrets.
</context>

<constraints>
- Target file only; /** */ style; no new dependencies.
</constraints>

<output_format>
Per export: what JSDoc was added. Confirm typecheck + tests pass.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | lists @tags explicitly |
| XML | Claude Code | keeps “no logic changes” tight |

## Verified

- [x] Run against `app/src/money.ts` — @example added per export; typecheck + tests green
