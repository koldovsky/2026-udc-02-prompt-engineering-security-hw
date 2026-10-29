# Функціональність модуля `money.ts`

## Overview

Модуль `app/src/money.ts` — набір утиліт для роботи з грошовими сумами. Усі суми в API представлені як **цілі центи** (`number`), щоб уникнути похибок чисел з плаваючою комою.

**Експортовані функції:** `formatCents`, `parseAmount`, `splitEvenly`, `applyDiscount`.

**Імпорт (ESM):**

```typescript
import { formatCents, parseAmount, splitEvenly, applyDiscount } from "./money.js";
```

## Module API summary

| Функція | Параметри | Повертає | Кидає помилку |
|---------|-----------|----------|---------------|
| `formatCents` | `cents: number` | `string` | Так — нецілий або нефінітний `cents` |
| `parseAmount` | `input: string` | `number` | Так — невалідний рядок |
| `splitEvenly` | `totalCents: number`, `n: number` | `number[]` | Так — нецілий або нефінітний `totalCents`/`n`; від'ємний `totalCents` або `n` |
| `applyDiscount` | `cents: number`, `percent: number` | `number` | Так — нецілий або нефінітний `cents`; `percent` поза 0–100, `NaN` або нескінченний |

---

### formatCents

**Signature**

```typescript
export function formatCents(cents: number): string
```

**Parameters**

| Параметр | Тип | Опис |
|----------|-----|------|
| `cents` | `number` | Сума в цілих центах (скінченне ціле; може бути від'ємною). |

**Returns**

| Тип | Опис |
|-----|------|
| `string` | Людиночитний рядок виду `"428.00"` (ціла частина, крапка, дві цифри дробової частини). |

**Throws**

- Якщо `cents` не є скінченним цілим (`Number.isInteger` = false, зокрема дробові, `NaN`, `Infinity`): `Error` з повідомленням `` `cents must be a finite integer, got ${cents}` ``.

**Behavior**

- Спочатку: `cents` має бути скінченним цілим.
- Для від'ємних значень на початок рядка додається `"-"`.
- Береться модуль `Math.abs(cents)`.
- Ціла частина: `Math.floor(abs / 100)`.
- Дробова частина (у центах): `abs % 100`, форматується двома цифрами (`padStart(2, "0")`).
- Результат: `` `${sign}${whole}.${frac}` ``.

**Examples**

- `42800` → `"428.00"` (з JSDoc)
- `5` → `"0.05"` (implementation detail: 5 центів)
- `-1250` → `"-12.50"` (implementation detail: від'ємний знак)

---

### parseAmount

**Signature**

```typescript
export function parseAmount(input: string): number
```

**Parameters**

| Параметр | Тип | Опис |
|----------|-----|------|
| `input` | `string` | Рядок суми, напр. `"428.00"` або `"428"`. Пробіли на початку/в кінці обрізаються (`trim`). |

**Returns**

| Тип | Опис |
|-----|------|
| `number` | Сума в цілих центах; від'ємна, якщо в рядку був знак `-`. |

**Throws**

- Якщо рядок не відповідає очікуваному формату: `Error` з повідомленням `` `Not a valid amount: ${input}` `` (оригінальний `input`, не `trimmed`).

**Behavior**

- Після `trim` застосовується regex: `/^(-?)(\d+)(?:\.(\d{1,2}))?$/`.
- Групи: опційний знак `-`, ціла частина (цифри), опційна дробова частина (1–2 цифри після крапки).
- Дробова частина доповнюється нулем справа до двох символів (`padEnd(2, "0")`) перед обчисленням.
- Центи: `Number(whole) * 100 + Number(frac)`; якщо був знак `-`, результат множиться на -1 (через умову `sign === "-" ? -cents : cents`).

**Examples**

- `"428.00"` → `42800` (з JSDoc)
- `"428"` → `42800` (implementation detail: без дробової частини, `frac = "0"`)
- `"12.5"` → `1250` (implementation detail: одна цифра після крапки → `"50"` центів)

---

### splitEvenly

**Signature**

```typescript
export function splitEvenly(totalCents: number, n: number): number[]
```

**Parameters**

| Параметр | Тип | Опис |
|----------|-----|------|
| `totalCents` | `number` | Загальна сума в центах для розподілу (невід'ємна). |
| `n` | `number` | Кількість часток (людей; невід'ємне ціле); довжина результуючого масиву. `0` → `[]`. |

**Returns**

| Тип | Опис |
|-----|------|
| `number[]` | Масив із `n` елементів — цілі центи на кожну частку. |

**Throws**

- Якщо `totalCents` не є скінченним цілим (`Number.isInteger` = false, зокрема дробові, `NaN`, `Infinity`): `Error` з повідомленням `` `totalCents must be a finite integer, got ${totalCents}` ``.
- Якщо `n` не є скінченним цілим (зокрема дробові, `NaN`, `Infinity`): `Error` з повідомленням `` `n must be a finite integer, got ${n}` ``.
- Якщо `totalCents < 0`: `Error` з повідомленням `` `totalCents must be non-negative, got ${totalCents}` ``.
- Якщо `n < 0`: `Error` з повідомленням `` `n must be non-negative, got ${n}` ``.

**Behavior**

- Спочатку: `totalCents` і `n` мають бути скінченними цілими; потім `totalCents` і `n` — невід'ємними.
- Якщо `n === 0`: повертається `[]` (гарантія «сума часток = `totalCents`» не діє).
- Якщо `n > 0`:
  - `base = Math.floor(totalCents / n)`;
  - `remainder = totalCents % n`;
  - повертається масив довжини `n`: для індексів `i < remainder` значення `base + 1`, інакше `base` — залишок розподіляється на перші `remainder` часток.

**Examples**

- `9000`, `3` → `[3000, 3000, 3000]` (implementation detail: ділиться без остачі)
- `100`, `3` → `[34, 33, 33]` (implementation detail: `remainder = 1`)
- `500`, `1` → `[500]` (implementation detail: одна частка)

---

### applyDiscount

**Signature**

```typescript
export function applyDiscount(cents: number, percent: number): number
```

**Parameters**

| Параметр | Тип | Опис |
|----------|-----|------|
| `cents` | `number` | Початкова сума в центах (скінченне ціле). |
| `percent` | `number` | Відсоток знижки; за JSDoc — діапазон **0–100** включно. |

**Returns**

| Тип | Опис |
|-----|------|
| `number` | Сума в центах після знижки, округлена до найближчого цента (`Math.round`). |

**Throws**

- Якщо `cents` не є скінченним цілим (зокрема дробові, `NaN`, `Infinity`): `Error` з повідомленням `` `cents must be a finite integer, got ${cents}` ``.
- Якщо `percent < 0` або `percent > 100`: `Error` з повідомленням `` `percent must be between 0 and 100, got ${percent}` ``.
- Якщо `percent` є `NaN` або нескінченним (`!Number.isFinite(percent)`): те саме повідомлення `` `percent must be between 0 and 100, got ${percent}` ``.

**Behavior**

- Спочатку перевірка `cents` (скінченне ціле), потім діапазону `percent` (скінченне число 0–100 включно).
- Обчислення: `Math.round(cents * (1 - percent / 100))`.
- `0%` повертає початкову суму (округлену); `100%` дає `0` для додатних `cents` (implementation detail).

**Examples**

- `10000`, `10` → `9000` (implementation detail: 10% знижка)
- `10000`, `0` → `10000` (implementation detail)
- `10000`, `100` → `0` (implementation detail)

---

## Error messages

| Повідомлення | Функція | Умова |
|--------------|---------|--------|
| `` cents must be a finite integer, got ${cents} `` | `formatCents`, `applyDiscount` | `cents` не скінченне ціле (дробове, `NaN`, `Infinity`) |
| `` Not a valid amount: ${input} `` | `parseAmount` | Рядок не збігається з `/^(-?)(\d+)(?:\.(\d{1,2}))?$/` після `trim` |
| `` totalCents must be a finite integer, got ${totalCents} `` | `splitEvenly` | `totalCents` не скінченне ціле (дробове, `NaN`, `Infinity`) |
| `` n must be a finite integer, got ${n} `` | `splitEvenly` | `n` не скінченне ціле (дробове, `NaN`, `Infinity`) |
| `` totalCents must be non-negative, got ${totalCents} `` | `splitEvenly` | `totalCents < 0` |
| `` n must be non-negative, got ${n} `` | `splitEvenly` | `n < 0` |
| `` percent must be between 0 and 100, got ${percent} `` | `applyDiscount` | `percent < 0` або `percent > 100`, або `percent` є `NaN` / нескінченним |

## Types & conventions

- **`number` як центи** — усі грошові величини в API (`formatCents`, `splitEvenly`, `applyDiscount`) та результат `parseAmount` — цілі центи.
- **Рядок суми** (`parseAmount`) — опційний `-`, цілі одиниці, опційна крапка і 1–2 десяткові цифри (долари/гривні в «людському» вигляді, не центи).
- **Рядок відображення** (`formatCents`) — `"<ціла>.<дві цифри>"`, для від'ємних — префікс `-`.
- **`splitEvenly`** — масив завжди має довжину `n`; для невід'ємного `totalCents` і `n > 0` сума елементів дорівнює `totalCents`.
- **Знижка** — `percent` у відсотках 0–100; результат округлюється до цілого цента.

## Generated

Документ згенеровано промптом `prompts/app-functionality-description.md`.

**Єдине джерело:** `app/src/money.ts` (сигнатури, JSDoc, реалізація).
