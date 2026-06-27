---
name: optimize-imports
description: Review and optimize imports and dependencies; ensure minimal bundle size, reduce unused exports
version: 1
---

# Optimize imports in money.ts

## Baseline (weak)

```
переглянь імпорти
```

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: Build engineer focused on bundle size, import optimization, and dependency hygiene.

Goal: Review and optimize imports in `app/src/money.ts` and its consumers. Ensure only used exports are exported; minimize bundle footprint.

Context:
- File: `app/src/money.ts` — 4 utility functions (formatCents, parseAmount, splitEvenly, applyDiscount)
- Current state: functions are exported as named exports
- Framework: Node 22, TypeScript, Vitest
- Tests: `app/src/money.test.ts` imports all functions

Constraints:
- Review imports in both money.ts and money.test.ts
- Do NOT remove any used exports or functions
- Keep the module's contract the same (exports are still available)
- Consider: tree-shaking, ESM vs CommonJS, named vs default exports

Acceptance criteria:
- Identify any unused imports or internal dependencies
- Verify all exports are actually used (check tests and any other consumers)
- Suggest: if any function is never used, document it or consider removing
- Bundle footprint: money.ts should have zero external dependencies
- Import statements should be clean and minimal

Output:
- Analysis: for each function — is it used? by whom?
- Recommendation: keep all / remove unused (with reasoning)
- If changes suggested: modified files + explanation

Stop rules:
- Stop after analysis; ask before removing any exported function
- Do NOT break tests
- Do NOT refactor code beyond import optimization
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
You are a build engineer. Review and optimize imports in `app/src/money.ts` and its test file. Ensure only used exports are exported; minimize bundle footprint. No breaking changes.
</instructions>

<context>
File: `app/src/money.ts` — 4 utility functions.
Tests: `app/src/money.test.ts` — uses all functions.
Goal: ensure clean imports, no unused exports, minimal bundle size.
</context>

<constraints>
- Review imports in money.ts and money.test.ts
- Do NOT remove any used exports
- Keep module contract the same
- Zero external dependencies expected
</constraints>

<output_format>
Analysis: for each function — used? by whom? Recommendation: keep all / remove unused with reasoning. If changes, modified files + explanation.
</output_format>
```

## Tool-fit notes

| Variant | Best for | Why |
|---------|----------|-----|
| markdown | Copilot (GPT) | outcome-first, "bundle footprint" framing |
| XML | Claude Code | structure, "no breaking changes" discipline |

## Verified

- [ ] All imports reviewed
- [ ] Exports checked for usage
- [ ] No breaking changes to API
- [ ] Bundle footprint minimal
