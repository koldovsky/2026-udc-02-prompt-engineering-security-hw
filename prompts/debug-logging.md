---
name: debug-logging
description: "Додати structured debug-логування у app/src/money.ts з умовним увімкненням"
---

# Goal
Додати debug-логування у `app/src/money.ts`, яке вмикається через env-змінну
і допомагає відстежити вхідні/вихідні значення та помилки.

# Context
Файл `app/src/money.ts` експортує функції: `cents`, `percent`, `formatCents`,
`parseAmount`, `splitEvenly`, `applyDiscount`.

Логування потрібне для debugging у development — не для production monitoring.

# Log Strategy

**Що логувати (по функціях):**
- `parseAmount`: вхідний рядок + результат (або error).
- `splitEvenly`: totalCents, n, результуючий масив.
- `applyDiscount`: вхідна сума, відсоток, результат.
- `formatCents`: НЕ логувати — викликається занадто часто (hot path).
- `cents()`, `percent()`: НЕ логувати — тривіальні constructors.

**Log levels:**
- `debug` — вхід/вихід функції (happy path).
- `warn` — підозрілі але валідні входи (наприклад percent = 0 або 100).
- `error` — перед throw (вже у коді через Error, але лог дає trace context).

# Implementation

Використай `console.debug` / `console.warn` з умовною перевіркою:
```ts
const DEBUG = typeof process !== "undefined" && process.env.DEBUG_MONEY === "1";

function log(level: "debug" | "warn", fn: string, data: Record<string, unknown>): void {
  if (!DEBUG) return;
  console[level](`[money:${fn}]`, JSON.stringify(data));
}
```

Виклик:
```ts
log("debug", "splitEvenly", { totalCents, n, shares });
```

# Constraints
- Не змінюй runtime-логіку функцій.
- Логування вимкнене за замовчуванням (`DEBUG_MONEY !== "1"` → zero overhead).
- Structured format: `[money:<function>] { key: value }`.
- **Не логуй** повні масиви якщо `n > 10` — лише `{ n, first3: shares.slice(0,3), sum }`.
- Не логуй sensitive data — суми допустимі для debug, але не PII/tokens.
- Максимум 1 log-statement на функцію (на вході або виході, не обидва).

# Acceptance Criteria
1. `DEBUG_MONEY=1` → логи видимі у console.
2. Без `DEBUG_MONEY` → жодного виводу, zero performance overhead.
3. Всі тести проходять без змін.
4. Log-helper `log()` — окрема internal функція, не інлайн у кожній функції.
5. Формат: `[money:functionName] {"key":"value"}`.

# Stop
Зупинись після додавання логування у `money.ts`. Не змінюй тести.
