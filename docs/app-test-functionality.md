# Тести модуля `money.test.ts`

## Overview

**Файл:** `app/src/money.test.ts`

**Фреймворк:** vitest (`describe`, `it`, `expect`).

**Імпорт тестованих символів:**

```typescript
import { formatCents, parseAmount, splitEvenly, applyDiscount } from "./money.js";
```

**Структура:** 4 блоки `describe`, **30** тест-кейсів `it`.

| Метрика | Значення |
|---------|----------|
| `describe` блоків | 4 |
| `it` кейсів | 30 |
| Імпортованих функцій | 4 |

## Suite summary

| `describe` блок | Функція під тестом | Кількість `it` | Тема |
|-----------------|-------------------|----------------|------|
| `formatCents` | `formatCents` | 4 | Форматування центів у рядок, валідація |
| `parseAmount` | `parseAmount` | 5 | Парсинг рядка в центи, помилки |
| `splitEvenly` | `splitEvenly` | 13 | Рівний поділ суми, остача, валідація |
| `applyDiscount` | `applyDiscount` | 8 | Знижка, округлення, валідація `cents` і `percent` |

---

### formatCents

Блок тестує `formatCents` — перетворення цілого числа центів у рядок.

#### `formats whole and fractional`

| Поле | Значення |
|------|----------|
| **Target** | `formatCents` |
| **Setup** | none |

**Assertion 1**

| Поле | Значення |
|------|----------|
| **Inputs** | `cents: number` = `42800` |
| **Assertion** | `expect(...).toBe(...)` |
| **Expected** | `string` = `"428.00"` |

**Assertion 2**

| Поле | Значення |
|------|----------|
| **Inputs** | `cents: number` = `5` |
| **Assertion** | `expect(...).toBe(...)` |
| **Expected** | `string` = `"0.05"` |

#### `formats zero`

| Поле | Значення |
|------|----------|
| **Target** | `formatCents` |
| **Setup** | none |
| **Inputs** | `cents: number` = `0` |
| **Assertion** | `expect(...).toBe(...)` |
| **Expected** | `string` = `"0.00"` |

#### `formats negative amounts`

| Поле | Значення |
|------|----------|
| **Target** | `formatCents` |
| **Setup** | none |
| **Inputs** | `cents: number` = `-42800` |
| **Assertion** | `expect(...).toBe(...)` |
| **Expected** | `string` = `"-428.00"` |

#### `rejects fractional cents`

| Поле | Значення |
|------|----------|
| **Target** | `formatCents` |
| **Setup** | none |

**Assertion 1**

| Поле | Значення |
|------|----------|
| **Inputs** | `cents: number` = `10.5` (у стрілковій функції) |
| **Assertion** | `expect(() => ...).toThrow(...)` |
| **Expected** | regex `/finite integer/i` |

**Assertion 2**

| Поле | Значення |
|------|----------|
| **Inputs** | `cents: number` = `-1.5` (у стрілковій функції) |
| **Assertion** | `expect(() => ...).toThrow(...)` |
| **Expected** | regex `/finite integer/i` |

---

### parseAmount

Блок тестує `parseAmount` — парсинг рядкової суми в цілі центи.

#### `parses a plain decimal`

| Поле | Значення |
|------|----------|
| **Target** | `parseAmount` |
| **Setup** | none |

**Assertion 1**

| Поле | Значення |
|------|----------|
| **Inputs** | `input: string` = `"428.00"` |
| **Assertion** | `expect(...).toBe(...)` |
| **Expected** | `number` = `42800` |

**Assertion 2**

| Поле | Значення |
|------|----------|
| **Inputs** | `input: string` = `"12"` |
| **Assertion** | `expect(...).toBe(...)` |
| **Expected** | `number` = `1200` |

#### `parses a single fractional digit`

| Поле | Значення |
|------|----------|
| **Target** | `parseAmount` |
| **Setup** | none |
| **Inputs** | `input: string` = `"12.5"` |
| **Assertion** | `expect(...).toBe(...)` |
| **Expected** | `number` = `1250` |

#### `parses negative amounts`

| Поле | Значення |
|------|----------|
| **Target** | `parseAmount` |
| **Setup** | none |
| **Inputs** | `input: string` = `"-12.50"` |
| **Assertion** | `expect(...).toBe(...)` |
| **Expected** | `number` = `-1250` |

#### `trims surrounding whitespace`

| Поле | Значення |
|------|----------|
| **Target** | `parseAmount` |
| **Setup** | none |
| **Inputs** | `input: string` = `"  428.00  "` |
| **Assertion** | `expect(...).toBe(...)` |
| **Expected** | `number` = `42800` |

#### `throws on invalid input`

| Поле | Значення |
|------|----------|
| **Target** | `parseAmount` |
| **Setup** | none |
| **Inputs** | `input: string` = `"abc"` (виклик у стрілковій функції) |
| **Assertion** | `expect(() => ...).toThrow(...)` |
| **Expected** | regex `/Not a valid amount/` |

---

### splitEvenly

Блок тестує `splitEvenly` — поділ загальної суми в центах на `n` часток.

#### `distributes remainder cents to the first shares`

| Поле | Значення |
|------|----------|
| **Target** | `splitEvenly` |
| **Setup** | none |
| **Inputs** | `totalCents: number` = `100`, `n: number` = `3` |
| **Assertion** | `expect(...).toEqual(...)` |
| **Expected** | `number[]` = `[34, 33, 33]` |

#### `splits evenly when there is no remainder`

| Поле | Значення |
|------|----------|
| **Target** | `splitEvenly` |
| **Setup** | none |
| **Inputs** | `totalCents: number` = `90`, `n: number` = `3` |
| **Assertion** | `expect(...).toEqual(...)` |
| **Expected** | `number[]` = `[30, 30, 30]` |

#### `returns a single share when n is 1`

| Поле | Значення |
|------|----------|
| **Target** | `splitEvenly` |
| **Setup** | none |
| **Inputs** | `totalCents: number` = `42800`, `n: number` = `1` |
| **Assertion** | `expect(...).toEqual(...)` |
| **Expected** | `number[]` = `[42800]` |

#### `returns all zeros when total is zero`

| Поле | Значення |
|------|----------|
| **Target** | `splitEvenly` |
| **Setup** | none |
| **Inputs** | `totalCents: number` = `0`, `n: number` = `4` |
| **Assertion** | `expect(...).toEqual(...)` |
| **Expected** | `number[]` = `[0, 0, 0, 0]` |

#### `gives at most one extra cent per share when cents < n`

| Поле | Значення |
|------|----------|
| **Target** | `splitEvenly` |
| **Setup** | none |
| **Inputs** | `totalCents: number` = `2`, `n: number` = `5` |
| **Assertion** | `expect(...).toEqual(...)` |
| **Expected** | `number[]` = `[1, 1, 0, 0, 0]` |

#### `puts a single cent into the first share only`

| Поле | Значення |
|------|----------|
| **Target** | `splitEvenly` |
| **Setup** | none |
| **Inputs** | `totalCents: number` = `1`, `n: number` = `3` |
| **Assertion** | `expect(...).toEqual(...)` |
| **Expected** | `number[]` = `[1, 0, 0]` |

#### `returns an empty array when n is 0`

| Поле | Значення |
|------|----------|
| **Target** | `splitEvenly` |
| **Setup** | none |
| **Inputs** | `totalCents: number` = `100`, `n: number` = `0` |
| **Assertion** | `expect(...).toEqual(...)` |
| **Expected** | `number[]` = `[]` |

#### `rejects negative totalCents`

| Поле | Значення |
|------|----------|
| **Target** | `splitEvenly` |
| **Setup** | none |
| **Inputs** | `totalCents: number` = `-100`, `n: number` = `3` (у стрілковій функції) |
| **Assertion** | `expect(() => ...).toThrow(...)` |
| **Expected** | regex `/non-negative/i` |

#### `rejects fractional totalCents`

| Поле | Значення |
|------|----------|
| **Target** | `splitEvenly` |
| **Setup** | none |
| **Inputs** | `totalCents: number` = `10.5`, `n: number` = `2` (у стрілковій функції) |
| **Assertion** | `expect(() => ...).toThrow(...)` |
| **Expected** | regex `/finite integer/i` |

#### `rejects fractional n`

| Поле | Значення |
|------|----------|
| **Target** | `splitEvenly` |
| **Setup** | none |
| **Inputs** | `totalCents: number` = `100`, `n: number` = `2.5` (у стрілковій функції) |
| **Assertion** | `expect(() => ...).toThrow(...)` |
| **Expected** | regex `/finite integer/i` |

#### `rejects negative n`

| Поле | Значення |
|------|----------|
| **Target** | `splitEvenly` |
| **Setup** | none |
| **Inputs** | `totalCents: number` = `100`, `n: number` = `-1` (у стрілковій функції) |
| **Assertion** | `expect(() => ...).toThrow(...)` |
| **Expected** | regex `/n must be non-negative/i` |

#### `rejects non-numeric inputs`

| Поле | Значення |
|------|----------|
| **Target** | `splitEvenly` |
| **Setup** | none |
| **Inputs** | 4 виклики у стрілкових функціях: `(NaN, 3)`, `(100, NaN)`, `(Infinity, 3)`, `(100, Infinity)` |
| **Assertion** | `expect(() => ...).toThrow(...)` ×4 |
| **Expected** | regex `/finite integer/i` |

#### `parts sum to the original total for positive amounts`

| Поле | Значення |
|------|----------|
| **Target** | `splitEvenly` |
| **Setup** | `const parts = splitEvenly(10007, 8)` |

**Assertion 1**

| Поле | Значення |
|------|----------|
| **Inputs** | `parts.reduce((sum, part) => sum + part, 0)` |
| **Assertion** | `expect(...).toBe(...)` |
| **Expected** | `number` = `10007` |

**Assertion 2**

| Поле | Значення |
|------|----------|
| **Inputs** | `parts` |
| **Assertion** | `expect(parts).toHaveLength(...)` |
| **Expected** | `8` |

---

### applyDiscount

Блок тестує `applyDiscount` — застосування відсоткової знижки до суми в центах.

#### `applies a simple discount`

| Поле | Значення |
|------|----------|
| **Target** | `applyDiscount` |
| **Setup** | none |
| **Inputs** | `cents: number` = `10000`, `percent: number` = `10` |
| **Assertion** | `expect(...).toBe(...)` |
| **Expected** | `number` = `9000` |

#### `applies 0% discount`

| Поле | Значення |
|------|----------|
| **Target** | `applyDiscount` |
| **Setup** | none |
| **Inputs** | `cents: number` = `10000`, `percent: number` = `0` |
| **Assertion** | `expect(...).toBe(...)` |
| **Expected** | `number` = `10000` |

#### `applies 100% discount`

| Поле | Значення |
|------|----------|
| **Target** | `applyDiscount` |
| **Setup** | none |
| **Inputs** | `cents: number` = `10000`, `percent: number` = `100` |
| **Assertion** | `expect(...).toBe(...)` |
| **Expected** | `number` = `0` |

#### `rounds to the nearest cent`

| Поле | Значення |
|------|----------|
| **Target** | `applyDiscount` |
| **Setup** | none |
| **Inputs** | `cents: number` = `95`, `percent: number` = `10` (сире значення `85.5` — відрізняє `Math.round` від `Math.floor`) |
| **Assertion** | `expect(...).toBe(...)` |
| **Expected** | `number` = `86` |

#### `rejects negative percent`

| Поле | Значення |
|------|----------|
| **Target** | `applyDiscount` |
| **Setup** | none |
| **Inputs** | `cents: number` = `10000`, `percent: number` = `-1` (у стрілковій функції) |
| **Assertion** | `expect(() => ...).toThrow(...)` |
| **Expected** | regex `/percent/i` |

#### `rejects percent above 100`

| Поле | Значення |
|------|----------|
| **Target** | `applyDiscount` |
| **Setup** | none |
| **Inputs** | `cents: number` = `10000`, `percent: number` = `101` (у стрілковій функції) |
| **Assertion** | `expect(() => ...).toThrow(...)` |
| **Expected** | regex `/percent/i` |

#### `rejects non-finite percent`

| Поле | Значення |
|------|----------|
| **Target** | `applyDiscount` |
| **Setup** | none |
| **Inputs** | `cents: number` = `10000`, `percent: number` = `NaN` (у стрілковій функції) |
| **Assertion** | `expect(() => ...).toThrow(...)` |
| **Expected** | regex `/percent/i` |

#### `rejects fractional cents`

| Поле | Значення |
|------|----------|
| **Target** | `applyDiscount` |
| **Setup** | none |

**Assertion 1**

| Поле | Значення |
|------|----------|
| **Inputs** | `cents: number` = `10.5`, `percent: number` = `10` (у стрілковій функції) |
| **Assertion** | `expect(() => ...).toThrow(...)` |
| **Expected** | regex `/finite integer/i` |

**Assertion 2**

| Поле | Значення |
|------|----------|
| **Inputs** | `cents: number` = `-1.5`, `percent: number` = `0` (у стрілковій функції) |
| **Assertion** | `expect(() => ...).toThrow(...)` |
| **Expected** | regex `/finite integer/i` |

---

## Assertion reference

Матчери vitest, що зустрічаються у `money.test.ts`:

| Матчер | Кількість викликів | Призначення у цьому файлі |
|--------|-------------------|---------------------------|
| `toBe` | 14 | Строга рівність для примітивів (`number`, `string`) |
| `toEqual` | 7 | Глибока рівність для масивів (`number[]`) |
| `toThrow` | 16 | Виклик функції кидає помилку; усі 16 з regex-матчером повідомлення |
| `toHaveLength` | 1 | Перевірка довжини масиву (`parts`) |

## Comments in source

З файлу `money.test.ts` (рядки 4–5):

> Smoke tests plus edge cases added via the cookbook "add tests" prompt:  
> remainder cents, negatives, invalid/non-integer input, out-of-range discount.

*(Примітка: коментар описує фактичне покриття — edge cases для remainder cents, negatives, invalid/non-integer input та out-of-range discount присутні в окремих `it`. Початковий коментар стартового репо «Minimal smoke tests… should ADD the edge cases» замінено, бо він більше не відповідав файлу.)*

## Generated

Документ згенеровано промптом `prompts/app-test-functionality-description.md`.

**Єдине джерело:** `app/src/money.test.ts`.
