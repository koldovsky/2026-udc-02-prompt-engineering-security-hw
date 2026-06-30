# Context layer (Task D)

## Що покращив (один шар)

### 1. `app/AGENTS.md` — новий файл

Створено `app/AGENTS.md` (раніше не існував — тільки кореневий `AGENTS.md`).
Містить:
- **Стек**: Node 22 ESM, TypeScript 5.6 strict, Vitest 2.x, `moduleResolution: Bundler`
- **Команди**: `npm test`, `npm run typecheck`, `npm run test:watch`
- **Конвенції** (3 шт.):
  1. `Cents` branded type — ніколи не змішувати з `number`
  2. Integer-only arithmetic — без float на грошових операціях
  3. Throw on invalid input — публічні функції кидають `Error`; тести покривають happy + error path
- **Security**: `.env` — never read; `node_modules/` виключено через `.claudeignore`

### 2. `.claudeignore` — існуючий ignore-файл (з попереднього кроку)

Патерни (≥ 3):

```
node_modules/           # залежності — великий шум
app/node_modules/
package-lock.json       # lockfile — 46 kB, низький сигнал для міркування
pnpm-lock.yaml
yarn.lock
*.log                   # runtime-артефакти
.env                    # security: secrets ніколи не мають потрапляти в контекст
.env.*
.DS_Store
```

Синергія з безпекою: `.env` фізично недоступний агенту під час `Read`/`Glob` —
не через стиснення, а через виключення (principle of least privilege).

## Дія курації — вузький `@file` замість «весь репо»

**Задача**: code review + тест-аудит `money.ts`

| Режим контексту                                         | Файлів | Токени   |
|---------------------------------------------------------|--------|----------|
| Повний репозиторій (`npx repomix` без фільтрів)         | 34     | 46 660   |
| Вузький: `money.ts` + `money.test.ts` + `AGENTS.md`     | 3      | 2 894    |
| Вузький + новий `app/AGENTS.md`                         | 4      | 3 389    |

**Скорочення: 46 660 → 3 389 токенів = −92,7 %** (−43 271 токен)

Як міряв:
```bash
# Повний репо:
npx repomix --output /dev/null
# Total Tokens: 46,660 tokens / Total Files: 34 files

# Вузький контекст:
npx repomix --include "app/src/money.ts,app/src/money.test.ts,app/AGENTS.md,AGENTS.md" --output /dev/null
# Total Tokens: 3,389 tokens / Total Files: 4 files
```

Encoding: `o200k_base` (≈ Claude / GPT-4o токенізатор).

## Що змінилось після додавання `app/AGENTS.md`

| Метрика                       | До (`app/AGENTS.md` не існував) | Після   | Дельта  |
|-------------------------------|----------------------------------|---------|---------|
| Повний репо: токени           | 46 660                           | 47 149  | +489    |
| Повний репо: файлів           | 34                               | 35      | +1      |
| Вузький контекст: токени      | 2 894                            | 3 389   | +495    |
| Вузький контекст: файлів      | 3                                | 4       | +1      |

`app/AGENTS.md` додає **~490 токенів** до будь-якого контексту — ціна одного прочитання;
натомість агент отримує стек, команди та конвенції без зайвих запитань.

## Висновок

Головний результат — не 490 токенів `app/AGENTS.md`, а **−92,7 % від вузького контексту**
порівняно з повним репо. Курація `@file` (передати 3–4 файли замість 34) скорочує
вхідний контекст у ~14 разів без втрати якості відповіді для задач типу code review.

`.claudeignore` захищає від двох ризиків одночасно:
- **Security**: `.env`/`KEY`/`TOKEN` фізично не потрапляють до агента
- **Cost/quality**: lockfiles (46 kB), `node_modules/`, логи не витрачають вікно контексту

`app/AGENTS.md` скорочує час до результату: агент знає стек, команди та конвенції
з першого повідомлення, без зайвих уточнювальних запитів.
