# AGENTS.md — app/

Context for an AI agent working in the `app/` sub-project.

## Stack

- **Language:** TypeScript 5.x (ESM, `"type": "module"`)
- **Test runner:** Vitest 2.x — `import { describe, it, expect } from "vitest"`
- **Node:** 22+
- **No framework, no bundler** — pure TS utility module

## Commands

```bash
npm test          # run all tests once (vitest run)
npm run test:watch  # watch mode
npm run typecheck   # tsc --noEmit, no emit
```

## Source layout

```
app/
  src/
    money.ts        # 4 exported functions — the target for cookbook prompts
    money.test.ts   # Vitest tests (19 tests as of WS2 homework)
  package.json
  tsconfig.json
```

## Conventions

1. **Integer cents only** — all monetary values are `number` (integer cents). Never use floats for money. `100` = 1.00 UAH.
2. **No new npm dependencies** — this module is intentionally dependency-free. Do not add imports from outside the standard library.
3. **Imports use `.js` extension** — e.g., `import { formatCents } from "./money.js"` (ESM interop requirement).

## Known issue

`splitEvenly(totalCents, n)` drops remainder cents — see bug-doc test in `money.test.ts`. Drive the fix via a prompt (`prompts/refactor-function.md`), do not hand-fix.
