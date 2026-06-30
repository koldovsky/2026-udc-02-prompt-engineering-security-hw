# Context layer (Task D)

## Що покращив (один шар)

- [ ] `app/AGENTS.md` — додав/уточнив: <стек, команди, конвенції>
- [x] ignore-файл (`.cursorignore` / `.aiignore`) — патерни: <node_modules, dist, .env, …>
- Чому саме цей шар: <швидше заповнювати>

## Дія курації

- Задача: <Do code quality review for typescript files in /app or in another attempt focus on file money.ts>
- Що зробив: <вузький `@file` X замість усього репо / `/clear` / compact>

## Вимірювання

| Метрика | До | Після |
|---|27000 tokens|15000 tokens|
| Контекст (токени) / `repomix` | | |
| Output токени за задачу (≈) | | |
| Ітерацій до результату | | |

Як міряв: <npx repomix>

## Висновок
repomix-output.md треба виключати з контексту сканування AI для меншого використання токенів.
<1–3 речення: що дала курація — менше токенів? менше шуму? стабільніший результат?
чи прибрав ignore-файлом щось чутливе (.env)?>
