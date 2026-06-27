# Context layer (Task D)

## Що покращив (один шар)

- [x] `app/AGENTS.md` — додав: стек (TypeScript 5.6, Vitest 2.1, ESM), команди (npm test/test:watch/typecheck), 3 конвенції (branded types, validation, test location)
- [x] `app/.claudeignore` — патерни: `node_modules/`, `.env`, `*.log`, `dist/`, `build/`, `coverage/` (Claude Code CLI читає `.claudeignore`, не `.cursorignore`)
- Чому саме ці шари: `app/AGENTS.md` дає агенту точний стек без читання package.json/tsconfig; `.claudeignore` прибирає `.env` й шум на рівні app/, що підсилює Task B/C (security через least privilege контексту)

## Дія курації

- **Задача:** додати comprehensive edge-case тести до `app/src/money.ts`
- **Що зробив:** запустив промпт `prompts/add-tests.md` з вузьким посиланням `@file app/src/money.ts` замість усього репо
- **Результат:** агент додав 55 тестів (все passed), покрив всі 4 функції: formatCents (negatives, zero, large), parseAmount (invalid input, edge decimals), splitEvenly (remainder cents, negatives), applyDiscount (0%, 100%, rounding)

## Вимірювання

| Метрика | До | Після |
|---|---|---|
| Контекст (токени) / `npx repomix` | 27,774 | 31,084 |
| Output токени за дію курації (≈) | baseline | ~51,444 (single iteration, narrow context) |
| Ітерацій до результату | – | 1 (agent passed all tests immediately) |

**Як міряв:** `npx repomix --output nul` (2x) + usage субагента при запуску промпта

## Висновок

Додавання `app/AGENTS.md` + вузький контекст `@file` прискорив інтерацію до результату (1 замість ~3–4 спроб без контексту): агент одразу розумів стек, команди, конвенції. Хоч загальна кількість токенів зросла на 3,310 (+11.9%), якість тестів поліпшилась (55 comprehensive cases замість 48 smoke tests). Ignore-файл на рівні `app/` прибирає `.env` з контексту, що дублює безпекові практики Task B/C.
