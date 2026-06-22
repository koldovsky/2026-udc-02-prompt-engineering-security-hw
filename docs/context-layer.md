# Context layer (Task D)

## Що покращив

- [x] `app/AGENTS.md` — стек, команди, 3 конвенції, guardrails
- [x] `.cursorignore` — уже містить `node_modules/`, `.env`, lockfiles (≥3 патерни)

Чому `app/AGENTS.md`: вузький контекст для cookbook-задач без читання всього репо.

## Дія курації

- **Задача:** додати edge-case тести для `money.ts`
- **До:** «допоможи з тестами для app» (весь `app/` + матеріали в контексті)
- **Після:** `@app/src/money.ts` + `@app/src/money.test.ts` + `app/AGENTS.md`

## Вимірювання

| Метрика | До | Після |
|---|---|---|
| Repomix `app/src/**` (токени) | 1,158 | 1,312 (+ AGENTS.md) |
| Repomix весь репо (токени) | 12,353 | 12,353 (ignore тримає шум) |
| Ітерацій до результату (≈) | 3–4 (scope creep) | 1–2 |

Як міряв: `npx repomix --include "app/src/**"` до/після `app/AGENTS.md`.

## Висновок

Вузький `@file` + `app/AGENTS.md` зменшує шум і ризик підтягнути `materials/` або `.env` у контекст. Ignore-файл уже прибирає секрети з індексації — синергія з Task B/C.
