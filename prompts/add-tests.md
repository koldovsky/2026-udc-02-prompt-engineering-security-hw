---
name: add-tests
description: "Додати юніт-тести для файлу app/src/money.ts"
---
# Goal
Напиши юніт-тести для всіх експортованих функцій у файлі `app/src/money.ts`,
щоб покрити позитивні, негативні та граничні сценарії.

# Context
Файл `app/src/money.ts` експортує чотири функції:

```ts
formatCents(cents: number): string        // 42800 → "428.00"
parseAmount(input: string): number        // "428.00" → 42800, throws на невалідний вхід
splitEvenly(totalCents: number, n: number): number[]  // ділить суму на n частин
applyDiscount(cents: number, percent: number): number // знижка 0–100%
```

Відома вада: `splitEvenly` відкидає залишок (1000 / 3 → [333, 333, 333], сума = 999).
Тести повинні документувати цю поведінку як є, а не очікувати виправлення.

Проєкт — ESM (`"type": "module"`), тому імпортуй з `"./money.js"` (не `.ts`).

# Constraints
- Використовуй Vitest: `import { describe, it, expect } from "vitest"`.
- Не змінюй `app/src/money.ts`.
- Збережи тести у файл `app/src/money.test.ts` (перезапиши існуючий).
- Чистий TypeScript, без `any`.

# Acceptance Criteria
1. **formatCents**: нуль, додатні, від'ємні, одноцифровий дріб (перевірити padStart).
2. **parseAmount**: ціле, десяткове (2 знаки), один дробовий знак (`"1.5"` → 150),
   від'ємне, пробіли (trim); throws на: порожній рядок, літери, >2 дробових, символи валют.
3. **splitEvenly**: рівний поділ, нерівний (залишок втрачається), один учасник.
4. **applyDiscount**: стандартна знижка, 0%, 100%, округлення (`Math.round`), від'ємна сума.
5. Branch coverage для `money.ts` = 100%.

# Example Style
```ts
describe("formatCents", () => {
  it("formats zero as '0.00'", () => {
    expect(formatCents(0)).toBe("0.00");
  });
});
```

# Stop Condition
Зупинись після створення файлу тестів. Не запускай `vitest`.
