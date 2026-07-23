---
name: add-docs
description: "Додати JSDoc-документацію для всіх функцій у app/src/money.ts"
---

# Goal
Додати JSDoc-коментарі до кожної експортованої функції у `app/src/money.ts`.

# Context
Файл експортує чотири функції для роботи з грошима в цілих центах:
- `formatCents(cents: number): string`
- `parseAmount(input: string): number`
- `splitEvenly(totalCents: number, n: number): number[]`
- `applyDiscount(cents: number, percent: number): number`

Цільова аудиторія документації — розробники, які вперше бачать цей модуль.
Мова документації — англійська.

# Constraints
- Формат: JSDoc (`/** ... */`) безпосередньо над функцією.
- Не змінюй тіло функцій, сигнатури та назви параметрів.
- Заміни існуючі коментарі (вони неповні), а не дублюй їх.

# Required JSDoc Tags
Кожна функція має містити:
- Короткий опис (один рядок, що починається з дієслова).
- `@param` — для кожного параметра з описом типу значень та обмежень.
- `@returns` — що повертає.
- `@throws` — якщо функція може кинути помилку (для `parseAmount`).
- `@example` — один реалістичний приклад з вхідними/вихідними значеннями.

# Example Style
```ts
/**
 * Format integer cents as a human-readable currency string.
 *
 * @param cents - Amount in integer cents (negative for debits).
 * @returns Formatted string with two decimal places, e.g. "428.00".
 * @example
 * formatCents(42800); // "428.00"
 * formatCents(-5);    // "-0.05"
 */
```

# Acceptance Criteria
- Усі 4 функції мають повний JSDoc-блок із зазначеними тегами.
- Жодних змін у runtime-коді (тільки коментарі).
- `@example` для кожної функції відповідає її реальній поведінці.

# Stop
Зупинись після оновлення документації у `money.ts`.
