# Context layer (Task D)

## Що покращив (один шар)

- [x] **`app/AGENTS.md`** — створено з нуля; містить: стек (TypeScript 5.x ESM, Vitest 2.x, Node 22+), команди (`npm test`, `npm run typecheck`), 3 конвенції (integer cents, no new deps, `.js` extensions), known issue (`splitEvenly` remainder bug).
- Чому саме цей шар: `app/` не мав жодного AGENTS.md — агент змушений був читати `package.json` + `tsconfig.json` + `README.md` щоразу для розуміння стека. Один файл замінює 3 exploratory reads.

## Дія курації

- Задача: додавання edge-case тестів до `app/src/money.ts`
- Що зробив: передав агенту вузький контекст — лише `app/src/money.ts` і `app/src/money.test.ts` (+ промпт з `prompts/add-tests.md`). Не передавав весь репо. Між задачами Task A / Task B / Task C не використовував `/clear`, але кожна задача починалась з точного @file-контексту, а не "увесь репо".

## Вимірювання

Інструмент: `npx repomix` у директорії `app/`

| Метрика | До (без `app/AGENTS.md`) | Після (з `app/AGENTS.md`) |
|---|---|---|
| Файлів у контексті | 5 | 6 |
| Загальних токенів (repomix) | 2,179 | 2,536 |
| Токенів для старту задачі (stack/commands) | ~409 (3 файли) | 342 (1 файл) |
| Exploratory tool calls на старті | 3+ читань | 1 читання |

Як міряв: `npx repomix --output /tmp/repomix-*.txt .` з виводом `Total Tokens` до і після створення `app/AGENTS.md`.

**Примітка:** загальний repomix зріс (додано файл), але ефект протилежний — на рівні задачі агент споживає менше токенів і виконує менше tool calls для орієнтації, бо `AGENTS.md` — curated summary замість сирих config-файлів.

## Висновок

Додавання `app/AGENTS.md` скорочує exploratory reads з 3+ до 1 на старті кожної задачі (~67 токенів економії + 2 зайвих tool calls менше). Крім економії, агент отримує точні команди (`npm test`, `.js` extension convention) і known issue, що запобігає помилкам у новій сесії. Синергія з безпекою: `AGENTS.md` містить нагадування не виправляти `splitEvenly` вручну — це reinforces промпт-кукбук як єдиний шлях до змін.
