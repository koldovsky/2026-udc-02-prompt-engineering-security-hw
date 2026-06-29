# Context layer (Task D)

## Що покращив (один шар)

- [x] **`app/AGENTS.md`** — стек (TS 5 strict, ESM, Vitest, integer cents), команди
      (`npm test`, `typecheck`), 3 конвенції (`.js` imports, scope, fixes via prompts),
      layout таблиця, security pointer на root `AGENTS.md`.
- [x] **`.cursorignore`** — патерни: `node_modules/`, `app/node_modules/`, `.env` /
      `app/.env*`, `dist/`, `app/coverage/`, lockfiles, `*.log`.
- **Чому обидва:** `app/AGENTS.md` дає агенту **сигнал** без читання всього репо;
      `.cursorignore` прибирає **шум і секрети** з індексу (синергія Task B/C).

## Дія курації

- **Задача:** додати edge-case тести для money helpers (cookbook `/add-tests`).
- **До:** слабкий промпт «допоможи з тестами для `app`» — агент тягне весь `app/`,
  README, інколи сусідні `prompts/` і `materials/`.
- **Після:** вузький контекст — `@app/src/money.ts` + `@app/src/money.test.ts` +
      промпт `prompts/add-tests.md`; між Task A і Task B — `/clear` (нова сесія без
      історії слабкого промпта).
- **Результат:** зміни лише в `money.test.ts`, `npm test` зелений, без scope creep.

## Вимірювання

**Як міряв:** `npx repomix` (encoding `o200k_base`, як у GPT-4o), 2026-06-29.

| Метрика | До | Після |
|---------|-----|--------|
| Контекст (токени) / `repomix` | **26 330** (41 файл, увесь репо `.`) | **2 263** (3 файли: `money.ts`, `money.test.ts`, `app/AGENTS.md`) |
| Файлів у пакеті | 41 | 3 |
| Зменшення контексту | — | **−91,4%** токенів |
| Проміжний варіант `app/` | — | 2 659 токенів (6 файлів) |
| Output токени за задачу (≈) | ~1 500–2 500 (розповзання по репо) | ~400–800 (один прохід add-tests) |
| Ітерацій до результату | 3+ (уточнення scope) | **1–2** |

Команди:

```bash
# До (весь репозиторій)
npx repomix . -o repomix-before.txt --style plain

# Після (курація @file — лише ціль задачі)
npx repomix . --include "app/src/money.ts,app/src/money.test.ts,app/AGENTS.md" \
  -o repomix-after.txt --style plain
```

Repomix також відзначив **1 suspicious file** у повному пакеті (security scan) —
після курації та `.cursorignore` пакет з 3 файлів: **✔ No suspicious files**.

## Висновок

Курація контексту дала **~10× менше вхідних токенів** (26k → 2.2k) і стабільніший
scope: агент не «блукає» по `prompts/`, `docs/`, `materials/`. `app/AGENTS.md`
замінює потребу тягнути root README для стеку/команд. `.cursorignore` прибирає
`node_modules` і **блокує `.env` з індексу** — менше шуму й менший ризик витоку
разом із правилами Task C. Для наступних задач: `@file` + короткий `AGENTS.md` +
ignore — мінімальний набір перед промптом із cookbook.
