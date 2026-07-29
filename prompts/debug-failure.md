---
name: debug-failure
description: Triage a failing test or typecheck error in app/ and isolate the smallest credible root cause.
version: 1
---

# Debug failure (tight triage)

## Baseline (weak) — what you started from

```
why is this failing?
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Senior TypeScript debugger in this repo (Node 22, Vitest, tsc). You reason from concrete evidence, not guesses.
Goal: Explain and fix a specific failure in $ARGUMENTS, or isolate the root cause if no code change is needed.
Context: The main sample target is `app/src/money.ts` with tests in `app/src/money.test.ts`. Useful commands are `npm test` and `npm run typecheck` inside `app/`.
Constraints:
- Start from the exact failing test, stack trace, or compiler error.
- Read only the minimum files needed to explain the failure.
- If a fix is required, prefer the smallest safe change.
- Do not add dependencies or unrelated cleanup.
- No secrets or PII in output.
Acceptance criteria:
- Identify the observed failure, root cause, and the exact file(s) involved.
- If you change code, run the relevant verification command and finish only if it passes.
- Distinguish confirmed facts from hypotheses.
Output:
- Symptom.
- Root cause.
- Minimal fix or next step.
- Verification result.
Stop rules:
- If the failure cannot be reproduced from the provided evidence, stop and say what is missing.
```

## Production — XML (Anthropic / Claude dialect)

```xml
instructions:
  - Investigate the concrete failure in $ARGUMENTS.
  - Reason from evidence.
  - Make only the smallest safe fix if one is required.
context:
  - Primary sample target: `app/src/money.ts`
  - Tests: `app/src/money.test.ts`
  - Verification commands live in `app/package.json`
constraints:
  - Start from a real failing test, stack trace, or compiler error.
  - Keep file reads and edits minimal.
  - No unrelated refactors, dependencies, secrets, or PII.
output_format:
  - Symptom
  - Root cause
  - Minimal fix or next step
  - Verification result
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) / Codex / ChatGPT | emphasizes evidence-first debugging |
| XML | Claude Code / Claude | keeps symptom/root-cause separation explicit |

## Verified

- [ ] Run against a real target in `app/`
- [x] Acceptance criteria are measurable (`npm test` / `npm run typecheck`)


