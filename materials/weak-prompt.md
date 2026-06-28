# Weak prompt (baseline)

This is the starting point for Demo 1 and Task A. Paste it into a fresh chat and
watch the agent guess at scope, stack, and "done".

```
допоможи з тестами для app
```

(English equivalent: `)`help with tests for app

## Why it's weak

- No **scope** — which file? the agent reads everything under `app/`.
- No **goal** — what behavior matters? rounding? negatives? remainder cents?
- No **acceptance criteria** — the agent decides when it's "done".
- No **constraints** — it may edit production code, add deps, change APIs.
- No **stop rule** — it keeps going past the useful point.

## Your job (Task A)

Rewrite "help with tests for app" prompt into a structured prompt in `prompts/add-tests.md` using
`prompts/_template.md`, point it at `app/src/money.ts`



, run it, and confirm the
agent stays in scope and `cd app && npm test` is green. Then add the other
cookbook prompts (review, docs, refactor, debug).
