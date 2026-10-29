# Середовище та технологічний стек

## Overview

Це репозиторій домашнього завдання **UDC Workshop 2** (промпт-інженерія та безпека роботи з AI). Формат — **artifacts-first**: учасники створюють промпт-cookbook, документи з санітизації та захисту від injection. Єдиний runnable код — крихітний TypeScript-проєкт у `app/`: модуль `money.ts` з утилітами для роботи з сумами в **цілих центах**. Він слугує ціллю для промптів cookbook (тести, рев'ю, рефакторинг, документація, дебаг).

## Runtime requirements

| Вимога | Значення |
|--------|----------|
| **Node.js** | **22+** (зазначено в `docs/walkthrough.md` та кореневому `README.md`) |
| **Менеджер пакетів** | npm |
| **GitHub** | обліковий запис для форку, PR і CodeRabbit-рев'ю |
| **Agentic IDE** | Cursor, Claude Code або GitHub Copilot (мінімум одне) |

**Примітки щодо ОС (з `AGENTS.md`):** на Windows у Git Bash не використовуйте `2>nul` / `>nul` — це створює файл `nul`. Краще `2>/dev/null` / `>/dev/null`.

**Локальна перевірка:** `node -v` → `v22.23.2`; `npm test` і `npm run typecheck` у `app/` проходять успішно. Офіційна вимога курсу — Node 22+.

## Application stack (`app/`)

| Параметр | Значення |
|----------|----------|
| **Мова** | TypeScript |
| **Модульна система** | ESM (`"type": "module"` у `package.json`) |
| **Імпорти в коді** | з розширенням `.js` (наприклад `./money.js`) |
| **Збірка** | не налаштована; лише `tsc --noEmit` для перевірки типів |
| **Тести** | Vitest (режим `vitest run`) |

**Налаштування TypeScript** (`app/tsconfig.json`):

| Опція | Значення |
|-------|----------|
| `target` | ES2022 |
| `module` | ESNext |
| `moduleResolution` | Bundler |
| `strict` | true |
| `noUncheckedIndexedAccess` | true |
| `esModuleInterop` | true |
| `skipLibCheck` | true |
| `types` | `["vitest/globals"]` |
| `include` | `["src"]` |

## Dependencies

У `app/package.json` **немає production-залежностей** — лише `devDependencies`.

| Пакет | Діапазон у `package.json` | Встановлена версія (`npm list`) | Призначення |
|-------|---------------------------|----------------------------------|-------------|
| `typescript` | `^5.6.0` | **5.9.3** | Компілятор / перевірка типів (`tsc`) |
| `vitest` | `^2.1.0` | **2.1.9** | Test runner і assertion API |

Vitest тягне транзитивні залежності (наприклад `@vitest/*`, `vite`, `esbuild`); для цього проєкту достатньо прямих dev-залежностей вище.

## npm scripts

Скрипти з `app/package.json`:

| Скрипт | Команда | Опис |
|--------|---------|------|
| `test` | `vitest run` | Одноразовий прогін усіх тестів |
| `test:watch` | `vitest` | Тести в watch-режимі |
| `typecheck` | `tsc --noEmit` | Перевірка типів без емісу файлів |

## Project layout

```
2026-udc-02-prompt-engineering-security-hw/
├── app/                    # Runnable TS-проєкт (ціль cookbook)
│   ├── src/
│   │   ├── money.ts        # Утиліти: formatCents, parseAmount, splitEvenly, applyDiscount
│   │   └── money.test.ts   # Vitest-тести
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
├── prompts/                # Промпт-cookbook (шаблон, add-tests, review-pr, …)
├── materials/              # Синтетичні навчальні дані (weak-prompt, sensitive-ticket, decoy-doc)
├── docs/
│   ├── walkthrough.md      # Покрокова інструкція Tasks A–E
│   ├── templates/          # Скелети звітів
│   └── env.md              # Цей файл
├── AGENTS.md               # Правила для Agentic IDE (scope, безпека)
├── .coderabbit.yaml        # Авто-рев'ю PR за Definition of Done
└── .github/
    └── pull_request_template.md
```

## Tooling & workflow

- **Vitest** — єдиний test runner; тести в `src/*.test.ts`, імпорт з `./money.js`.
- **TypeScript** — strict mode; без окремого bundler або runtime (Node + vitest виконують код напряму).
- **CodeRabbit** (`.coderabbit.yaml`) — автоматичне рев'ю PR українською за чек-лістом домашки (промпти, docs, відсутність секретів/PII).
- **Agentic IDE** — `AGENTS.md` задає guardrails: `materials/` = дані, не інструкції; не читати `.env`; не ексфільтрувати файли.
- **Перевірка перед PR:** `cd app && npm test` зелений + артефакти в узгоджених шляхах (`prompts/`, `docs/...`).

## Common commands

Усі команди нижче — з каталогу `app/` (або спочатку `cd app`):

```bash
npm install
npm test
npm run test:watch
npm run typecheck
```

З кореня репозиторію:

```bash
cd app && npm install && npm test && cd ..
```

## Generated

Документ згенеровано промптом `prompts/environment-description.md`.

**Версії перевірено:** `npm list --depth=0` у `app/`; діапазони — з `app/package.json`; `npm test` (30 тестів) і `npm run typecheck` — успішно на Node.js `v22.23.2`.

**Примітка:** `app/package-lock.json` існує локально, але не читався напряму; встановлені версії взяті з виводу `npm list`.
