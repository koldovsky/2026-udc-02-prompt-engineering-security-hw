# Context layer (Task D)

## Що покращив (один шар)

- [x] `app/AGENTS.md` — додав/уточнив: <стек, команди, конвенції>
- [x] ignore-файл (`.cursorignore` / `.aiignore`) — патерни: <node_modules, dist, .env, …>
- Чому саме цей шар: тому що `app/` містить головний код програми. Це означає, що найбільше роботи буде виконуватися саме з цим шаром. Покращувати налаштування контексту для нього є пріоритетною задачею

## Дія курації

- Задача: пофіксити баги в `app/money.ts`
- Що зробив: used `@file` X instead of all repo, started a fresh conversation

## Вимірювання

| Метрика | До | Після |
|---|---|---|
| Контекст (токени) / `repomix` | ~45.9K | ~48.1K |
| Output токени за задачу (≈) | 2,276 | 1,874 |
| Ітерацій до результату | 6 | 5 |

Як міряв: used context report from Cursor IDE, context report debug available by Cursor IDE, Cursor usage web dashboard

## Висновок

Didn't seems to reduce the number of used tokens. Maybe, it's because during the first run the agent managed to find the bug without scanning the entire repo (it showed that it explored only `money.ts` and `money.test.ts` although I didn't mention them in the prompt; maybe, determined it with `AGENTS.md`)
