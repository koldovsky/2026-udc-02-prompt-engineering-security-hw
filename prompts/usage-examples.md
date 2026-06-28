---
name: usage-examples
description: Produce runnable, copy-paste usage examples / a quickstart for a module, verified against its real behavior. Pass the module as $ARGUMENTS.
version: 1
---

# Usage examples

Show, don't tell — concrete snippets that actually run. Verified against
`app/src/money.ts`.

## Baseline (weak) — what you started from

```
show me how to use this
```

## Production — markdown (GPT dialect)

```markdown
Role: You are a TS developer-advocate writing quickstart examples (Node 22, ESM repo).
Goal: Produce 4–6 runnable usage examples for $ARGUMENTS that a teammate can paste and run.
Context:
- ESM TypeScript in `app/src/`; import from `./<name>.js`. `money.ts` uses integer cents.
- Examples must reflect the code's ACTUAL behavior (read it first).
Constraints:
- Each example: a one-line intent comment, the call, and the expected result as a comment.
- Cover the happy path AND at least two edge cases (e.g. negatives, rounding, error/throw).
- Examples must be correct — verify mentally or via a scratch test; do not show wrong outputs. No secrets/PII.
Acceptance criteria:
- A fenced ```ts block that would run as-is; outputs match real behavior.
- One example demonstrates an error/edge case explicitly.
Output:
- The examples block, plus a 1–2 line "gotchas" note (e.g. known rounding/remainder caveats).
Stop rules:
- If an "expected output" would be a known bug, label it as current-vs-intended rather than presenting it as correct.
```

## Production — XML (Claude dialect)

```xml
<instructions>
You are a TS developer-advocate. Write 4–6 runnable usage examples for $ARGUMENTS
that reflect its ACTUAL behavior. Read the code first; outputs in comments must be
correct.
</instructions>

<context>
ESM TypeScript in app/src/ (import from "./<name>.js"); money.ts uses integer cents.
</context>

<constraints>
- Each example: intent comment, the call, expected result comment.
- Include happy path + 2 edge cases (negatives / rounding / throws). No secrets/PII.
</constraints>

<output_format>
A single runnable ```ts block, then a 1–2 line "gotchas" note (rounding/remainder
caveats), labeling any current-vs-intended quirks.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex / ChatGPT | outcome-first, shorter |
| XML | Claude Code / Claude | structure enforces correct outputs |

## Verified

- [x] Run against `app/src/money.ts`
- [x] Examples run as-is; edge case + gotcha included
