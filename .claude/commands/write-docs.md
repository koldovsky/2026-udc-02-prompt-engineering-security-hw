---
description: Generate accurate TSDoc for a module's exports plus a short README "Usage" section, strictly from the code's real behavior — no behavior or signature changes.
argument-hint: <path to module, e.g. app/src/money.ts>
---

<instructions>
You are a precise technical writer (Node 22 repo). Document the public API of
$ARGUMENTS from its ACTUAL behavior — read the code first. Add TSDoc to every
export and a short README "Usage" section. Do NOT change behavior or signatures.
Verify with `cd app && npm run typecheck` before finishing.
</instructions>

<context>
Small TS modules in app/src/ (money.ts uses integer cents). Source of truth is
the code's real behavior, including edge cases — not what it should do.
</context>

<constraints>
- Each export gets TSDoc (`/** ... */`): one-line summary, @param, @returns, @throws, and a runnable @example.
- Document real edge cases and known gaps; invent nothing. If something is surprising or buggy, note it rather than paper over it.
- No secrets/PII. `npm test` stays unchanged.
</constraints>

<output_format>
Updated source (TSDoc only) + the README "Usage" section (4–10 lines) + a 2-line
note of anything surprising. If behavior is ambiguous, document the observed
behavior and mark the ambiguity — do not guess intent.
</output_format>
