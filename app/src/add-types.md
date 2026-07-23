## Результат add-types промпту для `app/src/money.ts`

### Додані branded types

**`Cents`** — nominal type для сум у цілих центах:
```ts
type Cents = number & { readonly __brand: "Cents" };
```

**`Percent`** — nominal type для відсотків [0, 100]:
```ts
type Percent = number & { readonly __brand: "Percent" };
```

### Constructor-функції

- `cents(value: number): Cents` — обертає число у branded type без runtime-валідації.
- `percent(value: number): Percent` — обертає число + throws якщо не в діапазоні [0, 100].

### Оновлені сигнатури

| Функція | Було | Стало |
|---------|------|-------|
| `formatCents` | `(cents: number): string` | `(amount: Cents): string` |
| `parseAmount` | `(input: string): number` | `(input: string): Cents` |
| `splitEvenly` | `(totalCents: number, n: number): number[]` | `(totalCents: Cents, n: number): Cents[]` |
| `applyDiscount` | `(cents: number, percent: number): number` | `(amount: Cents, disc: Percent): Cents` |

### Що це дає

- `applyDiscount(42.80, 10)` — помилка компіляції (`number` ≠ `Cents`).
- `applyDiscount(cents(4280), percent(10))` — компілюється коректно.
- Валідація `percent` зосереджена в одному місці (constructor), а не дублюється у кожній функції.

### Тести

- Додано тести для `cents()` та `percent()`.
- Усі існуючі тести адаптовані під branded wrappers.
