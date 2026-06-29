# Context Layer (Task D)

## Improved Layer

- [x] Added `app/AGENTS.md` with the app stack, verification commands, local
      conventions, and a focused file list for money-helper tasks.
- [x] Kept the existing `.cursorignore` protections for `node_modules`, build
      output, lockfiles, logs, `.env`, and OS/editor junk.

I chose `app/AGENTS.md` because the homework app is the target for the prompt
cookbook. Local instructions reduce repeated explanation and make the expected
scope clear before an agent reads unrelated repository files.

## Curation Action

- Task: review or test `app/src/money.ts`.
- Before: broad `app/` context with README, package files, lockfile, tsconfig,
  source, and tests.
- After: narrow file set: `app/AGENTS.md`, `app/src/money.ts`,
  `app/src/money.test.ts`, `app/package.json`, and `app/README.md`.

## Measurement

| Metric | Before | After |
|---|---:|---:|
| Context size, estimated tokens | 14,797 | 1,455 |
| Context size, characters | 50,362 | 4,876 |
| Output tokens for this curation task | ~700 | ~450 |
| Iterations to result | 1 | 1 |

How measured: local deterministic token estimate using this regex over the exact
file bundles: `[A-Za-z0-9_]+|[^\sA-Za-z0-9_]`. This is not a model billing
tokenizer, but it is reproducible and good enough to compare before/after
context size without sending files to an external service.

Before bundle:

- `app/README.md`
- `app/package.json`
- `app/package-lock.json`
- `app/tsconfig.json`
- `app/src/money.ts`
- `app/src/money.test.ts`

After bundle:

- `app/AGENTS.md`
- `app/README.md`
- `app/package.json`
- `app/src/money.ts`
- `app/src/money.test.ts`

## Conclusion

The curated context is about 90% smaller by the local estimate
(`14,797 -> 1,455` tokens). The main win is removing the lockfile and making the
agent start from the files that actually matter for money-helper work. The same
curation also supports security by keeping `.env`, logs, generated files, and
secret-like files out of context.
