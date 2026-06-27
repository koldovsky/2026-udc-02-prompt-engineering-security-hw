# AGENTS.md — app/ context

## Stack

- **Runtime:** Node 22+
- **Language:** TypeScript 5.6, ESM
- **Test Framework:** Vitest 2.1
- **No runtime dependencies** — pure utilities

## Commands

```bash
npm test              # run tests (vitest run)
npm run test:watch    # watch mode
npm run typecheck     # tsc --noEmit (strict mode enabled)
```

## Key Conventions

1. **Branded types**: `Cents` and `Percent` are distinct from `number`. Never mix them without explicit conversion. All money values are in cents (integers).

2. **Validation**: Every public function validates its input and throws an `Error` with a descriptive message if validation fails. No silent coercions.

3. **Test location**: Tests live alongside source files as `src/*.test.ts`. No separate `__tests__` directory.
