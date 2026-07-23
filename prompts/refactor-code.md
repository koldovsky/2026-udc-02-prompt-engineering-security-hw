---
name: refactor-code
description: "Рефакторинг коду файлу app/src/money.ts — виправити splitEvenly та додати валідацію"
---

# Goal
Рефакторити `app/src/money.ts`: виправити відому ваду та додати захисну валідацію входів.

# Context
Файл експортує чотири функції для роботи з грошима у цілих центах:
- `formatCents(cents: number): string`
- `parseAmount(input: string): number`
- `splitEvenly(totalCents: number, n: number): number[]`
- `applyDiscount(cents: number, percent: number): number`

Відома вада: `splitEvenly` відкидає залишок (1000/3 → [333,333,333], сума=999).
Відсутня валідація: `splitEvenly(x, 0)` дає Infinity, `applyDiscount(x, NaN)` дає NaN.

# What To Do (в порядку пріоритету)
1. **Fix**: `splitEvenly` — розподілити залишок по першим елементам масиву,
   щоб сума shares завжди дорівнювала totalCents.
2. **Guard**: додати throw якщо `n < 1` у `splitEvenly`.
3. **Guard**: додати throw якщо `percent` поза діапазоном [0, 100] у `applyDiscount`.
4. **Simplify**: якщо бачиш можливість спростити код без зміни поведінки — зроби.

# Constraints
- Зберегти сигнатури функцій (ім'я, параметри, тип повернення).
- Існуючі тести, що перевіряють правильну поведінку, мають проходити.
  Тести, що фіксували баг-поведінку (сума < totalCents), мають бути оновлені.
- TypeScript strict mode — без `any`, `as`, non-null assertion.

# Acceptance Criteria
1. `splitEvenly(1000, 3)` повертає масив із сумою === 1000.
2. `splitEvenly(x, 0)` кидає Error.
3. `applyDiscount(x, 150)` кидає Error.
4. Всі інші існуючі тести проходять (`npm test`).

# Stop
Зупинись після зміни `money.ts` та оновлення `money.test.ts` (якщо потрібно).
Не запускай тести.
