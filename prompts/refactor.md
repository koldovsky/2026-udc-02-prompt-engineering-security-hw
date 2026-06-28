---
name: refactor
description: Behavior-preserving refactor of a module, guarded by the existing test suite. Use to improve structure without changing the API.
version: 1
---

# Refactor (behavior-preserving)

Point it at `app/src/money.ts`; it improves internals while keeping the public
API and all tests green.

## Baseline (weak)

```
зроби рефакторинг money.ts
```

## Production — markdown (GPT dialect)

```markdown
Role: TS refactorer in this repo (Node 22, vitest). You preserve behavior.
Goal: Improve the internal structure of $ARGUMENTS without changing its public API.
Context: Integer-cent money helpers with an existing passing test suite.
Constraints:
- Keep all exported names and signatures identical.
- No behavior changes, no new dependencies.
- Run tests after each change; revert anything that turns them red.
- No secrets/PII in code or comments.
Acceptance criteria:
- `cd app && npm test` is green and unchanged in count.
- Diff is structural only (naming, extraction, dedupe) — no new features, no fixes.
Output:
- The edited file + a short list of each refactor and why it's safe.
Stop rules:
- If a "cleanup" would alter behavior or output, STOP and propose it separately.
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot / Codex | tight, outcome-first |

## Verified

- [x] Run against `app/src/money.ts` (dry-run: proposed safe extractions, API unchanged)
