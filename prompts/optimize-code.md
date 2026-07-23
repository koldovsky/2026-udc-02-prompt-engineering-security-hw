---
name: optimize-code
description: "Оптимізувати hot-path функції у app/src/money.ts для batch-обробки"
---

# Goal
Оптимізувати `formatCents` та `splitEvenly` у `app/src/money.ts` для сценарію,
де вони викликаються 100 000+ разів у tight loop (batch-генерація звітів).

# Context
Файл `app/src/money.ts` містить:
- `formatCents(cents: number): string` — використовує string interpolation + padStart.
- `splitEvenly(totalCents: number, n: number): number[]` — алокує новий масив на кожен виклик.

Профілювання показало, що у batch-сценарії (100k invoices):
- `formatCents` — 40% часу йде на string allocation (`padStart`, template literal).
- `splitEvenly` — 30% часу на `new Array(n).fill()` + цикл.

# Constraints
- Зберегти сигнатури та зовнішню поведінку (тести мають проходити).
- Не додавати зовнішніх залежностей.
- Читабельність може знизитись — але додати inline-коментар якщо оптимізація неочевидна.
- Не використовувати `eval`, `Function()`, або unsafe конструкції.

# Optimization Ideas (обери найкращі)
- `formatCents`: pre-compute lookup table для frac (00–99), уникнути padStart.
- `splitEvenly`: приймати optional pre-allocated buffer замість створення нового масиву.
- Загальне: уникати closures та зайвих алокацій у hot path.

# Benchmark
Після оптимізації додай файл `app/src/money.bench.ts` з Vitest bench:
```ts
import { bench, describe } from "vitest";
// benchmark formatCents та splitEvenly з 100k ітерацій
```

# Acceptance Criteria
1. Існуючі тести (`npm test`) проходять без змін.
2. Benchmark показує покращення (будь-який вимірюваний приріст).
3. Код не містить unsafe конструкцій.

# Stop
Зупинись після зміни `money.ts` та створення `money.bench.ts`.
