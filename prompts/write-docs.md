---
name: write-docs
description: Generate accurate TSDoc for a module's exports plus a short README section, strictly from the code's real behavior. Pass the module as $ARGUMENTS.
version: 1
---

# Write docs

Document what the code actually does (including edge cases), not what it should do.
Verified against `app/src/money.ts`.

## Baseline (weak) — what you started from

```
add comments to this file
```

## Production — markdown (GPT dialect)

```markdown
Role: You are a technical writer who reads TypeScript precisely (Node 22 repo).
Goal: Document the public API of $ARGUMENTS so a new teammate can use it correctly.
Context:
- Small TS modules in `app/src/`; amounts in `money.ts` are integer cents.
- Source of truth is the code's ACTUAL behavior — read it before writing.
Constraints:
- Add TSDoc (`/** ... */`) to each exported symbol: one-line summary, `@param`, `@returns`, `@throws`, and a realistic `@example`.
- Document real edge cases and any known gaps; do NOT change runtime behavior or signatures.
- No invented behavior; if something is surprising or buggy, note it rather than papering over it. No secrets/PII.
Acceptance criteria:
- Every export has TSDoc; examples are accurate and would actually run.
- A short README-style "Usage" section (4–10 lines) summarizing the module.
- `cd app && npm run typecheck` still passes; `npm test` unchanged.
Output:
- The updated source (TSDoc only) + the README section, and a 2-line note of anything you flagged as surprising.
Stop rules:
- If behavior is ambiguous, document the observed behavior and mark the ambiguity — do not guess intent.
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are a precise technical writer. Document the public API of $ARGUMENTS from its
ACTUAL behavior. Add TSDoc to every export and a short README "Usage" section. Do
not change behavior or signatures. Verify with `cd app && npm run typecheck`.
</instructions>

<context>
Small TS modules in app/src/ (money.ts uses integer cents). Read the code first.
</context>

<constraints>
- Each export: summary, @param, @returns, @throws, runnable @example.
- Document real edge cases / known gaps; invent nothing. No secrets/PII.
</constraints>

<output_format>
Updated source (TSDoc only) + the README "Usage" section + a 2-line note of
anything surprising.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex / ChatGPT | outcome-first, shorter |
| XML | Claude Code / Claude | structure keeps @example/@throws honest |

## Verified

- [x] Run against `app/src/money.ts`
- [x] TSDoc on all exports; `npm run typecheck` green; examples accurate
