# app/ — agent context

## Stack

- **Runtime:** Node 22, ES modules (`"type": "module"`)
- **Language:** TypeScript 5.6 (strict)
- **Test runner:** Vitest 2.x — `npm test` (run once) / `npm run test:watch` (watch)
- **Type check:** `npm run typecheck` (tsc --noEmit)
- **No build step** — source files are compiled on the fly by Vitest via esbuild

## Source layout

```
src/
  money.ts        — four exported helpers (formatCents, parseAmount, splitEvenly, applyDiscount)
  money.test.ts   — unit tests; import from "./money.js" (ESM .js extension required)
```

## Conventions

1. **Integer cents everywhere.** All amounts are `number` in integer cents — never floats.
   `42800` = $428.00. Never divide by 100 inside production logic.
2. **Imports use `.js` extension.** TypeScript + ESM requires `import ... from "./money.js"`,
   not `"./money"`. Violating this breaks `npm test` at runtime.
3. **Tests only call public exports.** Do not import internal helpers; keep the test surface
   aligned with the module's public API.

## What NOT to touch without being asked

- Do not add npm dependencies — this project has none (only devDeps).
- Do not change `tsconfig.json` or `package.json` scripts.
- Do not read or commit `.env` — it is gitignored and contains only fake demo values.
