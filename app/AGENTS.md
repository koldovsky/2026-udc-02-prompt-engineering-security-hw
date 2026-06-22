# AGENTS.md — app/

Tiny integer-cent money utilities (WS2 sample target).

## Stack

- TypeScript, Node 22+, vitest, ESM (`"type": "module"`)

## Commands

| Command | Purpose |
|---------|---------|
| `npm test` | Run vitest once |
| `npm run test:watch` | Watch mode |

## Conventions

1. Amounts are **integer cents** — never use floats for money math.
2. One module per concern: `src/money.ts` + `src/money.test.ts`.
3. Public API: `formatCents`, `parseAmount`, `splitEvenly`, `applyDiscount`.

## Guardrails

- Do not add dependencies without asking.
- Known planted bugs — fix via cookbook prompts, not drive-by refactors.
- No secrets in tests or docs.
