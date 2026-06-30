---
+name: add-test
+description: this prompt should be used for adding missing unit tests to money.ts
version: 1
---

# <Task name>

## Baseline (weak) — what you started from

```
cover
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: <who acts, in what repo/stack — 1–2 sentences>
Goal: <the user-visible outcome>
Context: <only the relevant files/facts; keep it tight>
Constraints:
- <scope — which files may change>
- <what NOT to touch / no new deps / keep public API>
- <safety — no secrets/PII in output>
Acceptance criteria:
- <verifiable: a command, a test, a visible state>
Output:
- <what to return: changed files, a short summary>
Stop rules:
- <when to stop / ask / abstain>
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
<who acts> <what to do> <how to verify before finishing>
</instructions>

<context>
<relevant files / facts only>
</context>

<constraints>
- <scope, what not to touch, no secrets/PII>
</constraints>

<output_format>
<changed files + short summary>
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex / ChatGPT | outcome-first, shorter |
| XML | Claude Code / Claude | structure + multishot |

## Verified

- [ ] Run against a real target in `app/`
- [ ] Agent stayed in scope; acceptance criteria met
