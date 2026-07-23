---
name: test-edge-cases
description: "Написати тести граничних випадків для app/src/money.ts (окремий файл)"
---

# Goal
Написати окремий тест-файл, який покриває виключно граничні (edge case) сценарії
для функцій у `app/src/money.ts` — ті, що не покриті основними тестами у `money.test.ts`.

# Context
Файл `app/src/money.ts` експортує:
```ts
type Cents = number & { readonly __brand: "Cents" };
type Percent = number & { readonly __brand: "Percent" };

cents(value: number): Cents
percent(value: number): Percent          // throws якщо не [0, 100]
formatCents(amount: Cents): string
parseAmount(input: string): Cents        // throws на невалідний вхід
splitEvenly(totalCents: Cents, n: number): Cents[]  // throws якщо n < 1
applyDiscount(amount: Cents, disc: Percent): Cents
```

Основні тести (`money.test.ts`) вже покривають happy path, базові негативні
та прості boundary (0, від'ємні, throws). Цей файл фокусується на **незвичайних крайніх значеннях**.

# Edge Cases To Cover

**formatCents:**
- `Number.MAX_SAFE_INTEGER` — чи коректно форматує великі суми.
- `cents(-0)` — поведінка з negative zero.

**parseAmount:**
- `"0.00"`, `"00.00"`, `"000"` — ведучі нулі.
- `" "` (лише пробіли) — має кинути.
- Рядок з Unicode цифрами (наприклад `"١٢"`) — має кинути.
- Дуже довгий рядок (1000 символів) — має кинути без hang.

**splitEvenly:**
- `cents(0)` розділити на 5 — має повернути `[0, 0, 0, 0, 0]`.
- `cents(1)` розділити на 3 — один отримує 1, решта 0.
- `cents(Number.MAX_SAFE_INTEGER)` розділити на 2 — перевірити precision.
- Дуже великий `n` (наприклад 10000) — чи не падає.

**applyDiscount:**
- `cents(0)` з будь-яким percent — завжди 0.
- `percent(0.1)` — дробовий відсоток, перевірити округлення.
- `cents(1)` з `percent(99)` — мінімальна сума, майже повна знижка.

**percent():**
- `percent(0.001)` — дуже малий валідний відсоток.
- `percent(100)` — верхня межа (має працювати).
- `percent(100.0001)` — трохи більше за 100 (має кинути).

# Constraints
- Використовуй Vitest (`import { describe, it, expect } from "vitest"`).
- Імпортуй з `"./money.js"` (ESM).
- Не змінюй `money.ts` або `money.test.ts`.
- Збережи у **окремий файл**: `app/src/money.edge.test.ts`.
- Назви тестів мають пояснювати яку саме межу перевіряють.

# Example Style
```ts
describe("formatCents — edge cases", () => {
  it("handles MAX_SAFE_INTEGER without precision loss", () => {
    const result = formatCents(cents(Number.MAX_SAFE_INTEGER));
    expect(result).toMatch(/^\d+\.\d{2}$/);
  });
});
```

# Acceptance Criteria
1. Кожен edge case з переліку вище має відповідний тест.
2. Тести проходять (`npm test`).
3. Жодних змін у production-коді.
4. Тести у окремому файлі, не змішані з основними.

# Stop
Зупинись після створення `app/src/money.edge.test.ts`.
