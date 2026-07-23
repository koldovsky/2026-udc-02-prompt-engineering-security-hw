## Результат debug-logging промпту для `app/src/money.ts`

### Implementation

Додано internal helper:
```ts
const DEBUG = typeof process !== "undefined" && process.env.DEBUG_MONEY === "1";

function log(level: "debug" | "warn", fn: string, data: Record<string, unknown>): void {
  if (!DEBUG) return;
  console[level](`[money:${fn}]`, JSON.stringify(data));
}
```

### Логування по функціях

| Функція | Level | Що логується |
|---------|-------|-------------|
| `parseAmount` | `debug` | input, result |
| `parseAmount` | `warn` | input, error (перед throw) |
| `splitEvenly` | `debug` | totalCents, n, shares (first3+sum якщо n>10) |
| `applyDiscount` | `debug` | amount, disc, result |
| `applyDiscount` | `warn` | boundary percent (0 або 100) |
| `formatCents` | — | не логується (hot path) |
| `cents()` / `percent()` | — | не логується (тривіальні constructors) |

### Увімкнення
```bash
DEBUG_MONEY=1 npm test
```

### Формат виводу
```
[money:parseAmount] {"input":"42.00","result":4200}
[money:splitEvenly] {"totalCents":1000,"n":3,"shares":[334,333,333]}
[money:applyDiscount] {"amount":10000,"disc":10,"result":9000}
```

### Характеристики
- Вимкнене за замовчуванням — zero overhead без `DEBUG_MONEY=1`.
- Максимум 1 log-statement на функцію (на виході).
- Великі масиви (n>10) скорочуються до first3 + sum.
- Тести не змінювались — проходять без впливу.
