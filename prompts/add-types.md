---
name: add-types
description: "Додати branded types (Cents, Percent) для type-safe фінансових операцій у app/src/money.ts"
---

# Goal
Додати branded (nominal) types до `app/src/money.ts`, щоб компілятор не дозволяв
плутати центи з іншими числами та відхиляв невалідні значення на рівні типів.

# Context
Файл вже повністю типізований примітивами (`number`, `string`).
Проблема: `number` не розрізняє центи, долари, відсотки — легко передати
`dollars` замість `cents` без помилки компіляції.

Приклад бага, який не ловить поточна типізація:
```ts
const price = 42.80;          // долари, а не центи!
applyDiscount(price, 10);     // компілюється, але результат неправильний
```

# What To Do
1. Створити branded type `Cents`:
   ```ts
   type Cents = number & { readonly __brand: "Cents" };
   ```
2. Створити branded type `Percent`:
   ```ts
   type Percent = number & { readonly __brand: "Percent" };
   ```
3. Додати constructor-функції (type guards):
   ```ts
   function cents(value: number): Cents
   function percent(value: number): Percent  // throws якщо не [0, 100]
   ```
4. Оновити сигнатури функцій на branded types:
   - `formatCents(cents: Cents): string`
   - `parseAmount(input: string): Cents`
   - `splitEvenly(totalCents: Cents, n: number): Cents[]`
   - `applyDiscount(cents: Cents, percent: Percent): Cents`
5. Експортувати типи та constructor-функції.

# Constraints
- Не змінювати runtime-логіку існуючих функцій.
- Constructor-функції — єдине місце з runtime-валідацією.
- Не використовувати `as` cast у production-коді (лише у constructor-функціях).
- TypeScript strict mode (`noImplicitAny`, `strictNullChecks`).

# Acceptance Criteria
1. `tsc --noEmit` проходить без помилок.
2. Виклик `applyDiscount(42.80, 10)` дає помилку компіляції (number ≠ Cents).
3. Виклик `applyDiscount(cents(4280), percent(10))` компілюється.
4. Існуючі тести проходять після оновлення на `cents()` / `percent()` wrappers.
5. Нові типи та функції експортовані.

# Stop
Зупинись після оновлення `money.ts` та адаптації `money.test.ts`.
