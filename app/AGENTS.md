# app/AGENTS.md — context layer for the `app/` module

> Read this before opening any file in `app/`. It gives the agent the minimal
> context needed to work here without reading the whole repository.

## Stack

| Layer       | Version / tool                  |
|-------------|---------------------------------|
| Runtime     | Node 22 (ESM, `"type":"module"`) |
| Language    | TypeScript 5.6, strict mode     |
| Test runner | Vitest 2.x (no globals — `import { describe, it, expect } from "vitest"`) |
| Bundler     | none — tsc-only, `moduleResolution: Bundler` |

## Commands

```bash
cd app
npm install          # first-time only
npm test             # vitest run — all tests, single pass
npm run test:watch   # vitest watch mode during development
npm run typecheck    # tsc --noEmit — type errors only, no emit
```

Green gate before any commit: `npm test` exits 0.

## Source layout

```
app/
  src/
    money.ts        # integer-cent helpers (formatCents, parseAmount, splitEvenly, applyDiscount)
    money.test.ts   # Vitest specs — kept alongside the module (co-location)
  package.json
  tsconfig.json
```

## Conventions

1. **Cents brand** — all monetary values use the `Cents` branded type (`number & { __brand: "Cents" }`). Never mix with plain `number`; use `toCents()` only at validated input boundaries.
2. **Integer-only arithmetic** — no floating-point math on money. All intermediate values stay in integer cents; rounding only at final display (`formatCents`).
3. **Throw on invalid input** — public functions throw `Error` for out-of-range or malformed arguments. Tests must cover both the happy path and the thrown error path.

## Security

- `app/.env` exists locally (gitignored) — **never read it, never log its contents**.
- `node_modules/` and `package-lock.json` are excluded from agent context by `.claudeignore` — do not reference them.
