## Результат optimize-промпту для `app/src/money.ts`

### Оптимізації

**1. `formatCents` — усунення string allocation у hot path**
- Додано `FRAC_LOOKUP`: pre-computed масив "00"–"99" замість `padStart` на кожен виклик.
- `(abs / 100) | 0` замість `Math.floor` — bitwise truncate швидший для додатних цілих.
- `abs - whole * 100` замість `abs % 100` — уникає модуло.

**2. `splitEvenly` — усунення подвійного проходу**
- Замість `new Array(n).fill(base)` + цикл `+= 1` — один прохід з прямим присвоєнням.
- Перші `remainder` елементів отримують `base + 1`, решта — `base`.

### Benchmark
Створено `app/src/money.bench.ts` з Vitest bench:
- Окремі виклики для formatCents та splitEvenly.
- Batch 100k ітерацій для вимірювання throughput.
- Запуск: `npx vitest bench`.

### Що не змінювалось
- `parseAmount` — не є bottleneck у batch-сценарії (викликається один раз при парсингу).
- `applyDiscount` — O(1) без алокацій, вже оптимальна.
- Сигнатури функцій та зовнішня поведінка — без змін, тести проходять.
