# app/AGENTS.md

Context for agents working **only in `app/`** — the WS2 prompt-cookbook target.

## Stack

- **TypeScript** 5.x, **ESM** (`"type": "module"` in `package.json`)
- **Vitest** for tests (`vitest run`)
- Single module: `src/money.ts` + `src/money.test.ts`

## Commands

Run from `app/`:

```bash
npm install
npm test          # vitest run — must stay green after changes
npm run typecheck # tsc --noEmit
```

On Windows PowerShell: `cd app; npm test` (not `&&`).

## Layout

| Path | Role |
|---|---|
| `src/money.ts` | Production code — `formatCents`, `parseAmount`, `splitEvenly`, `applyDiscount` |
| `src/money.test.ts` | Tests only — extend via `/add-tests` or similar prompts |

## Conventions

1. **Integer cents** — all amounts are whole cents (`number`), never floats in logic.
   Use `formatCents` / `parseAmount` for display and input conversion.
2. **One file per prompt** — e.g. tests prompt touches only `money.test.ts`; fix prompt
   only `money.ts`. Do not refactor unrelated files.
3. **Prompt-driven changes** — this repo is a homework exercise; drive fixes and
   coverage through cookbook prompts (`prompts/`, `.cursor/commands/`), not ad-hoc edits
   unless the human explicitly asks.

## Verify

After any code change: `npm test` and `npm run typecheck` must pass.
