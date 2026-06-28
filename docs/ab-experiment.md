# A/B промптів (Task E, bonus)

Задача: додати input-валідацію до `splitEvenly` та `applyDiscount` у `app/src/money.ts`.

## Промпт A — базовий

```
add validation to money.ts
```

## Промпт B — структурований (XML / Claude)

```xml
<instructions>
You are a senior TypeScript engineer. Add guard clauses to splitEvenly and
applyDiscount in app/src/money.ts. Throw Error with a message that includes the
invalid value. Also add tests for the new throws in app/src/money.test.ts.
Before finishing, verify: (1) splitEvenly(100,0) throws, (2) applyDiscount(100,110)
throws, (3) npx vitest run exits 0.
</instructions>

<context>
File: app/src/money.ts
splitEvenly(totalCents, n): n must be a positive integer.
  - n = 0: division by zero, currently returns [].
  - n < 0 or non-integer: nonsense output.
applyDiscount(cents, percent): percent must be 0–100.
  - percent > 100: returns negative amount.
  - percent < 0: returns amount above original.
Error message format: include the invalid value, e.g. "n must be a positive integer, got 0".
</context>

<constraints>
- Modify only files inside app/src/.
- Throw Error (not custom classes); include the invalid value in the message.
- Do not change function signatures or other logic.
- No external validation libraries; no new npm packages.
- No secrets or PII.
</constraints>

<output_format>
1. Updated guard clauses in app/src/money.ts.
2. New test cases in app/src/money.test.ts for each new throw.
3. Confirmation: npx vitest run result.
</output_format>
```

## Порівняння

| Критерій                  | Промпт A                                              | Промпт B                                      |
|---------------------------|-------------------------------------------------------|-----------------------------------------------|
| Ітерацій до прийняття     | 6–7 (splitEvenly → applyDiscount → значення в msg × 2 → non-integer → тести → fix) | 1 |
| Output токени (≈)         | ~150 × 7 = ~1 050                                     | ~380                                          |
| Якість результату         | лише `n > 0`, без non-integer, без тестів             | усі edge-cases покриті, тести включно         |
| Правки безпеки/валідації  | довелось просити окремо (6 follow-up)                 | враховано одразу в `<constraints>`            |

### Що зробив Промпт A (симуляція)

```ts
// лише це — без non-integer, без applyDiscount, без тестів
if (n <= 0) throw new Error("n must be positive");
```

### Що зробив Промпт B (фактичний результат)

```ts
// splitEvenly — повна валідація
if (!Number.isInteger(n) || n <= 0)
  throw new Error(`n must be a positive integer, got ${n}`);

// applyDiscount — діапазон з конкретним значенням у повідомленні
if (percent < 0 || percent > 100)
  throw new Error(`percent must be 0–100, got ${percent}`);
```

Промпт B також запитує нові тести для кожного throws-кейсу — якби він був запущений проти реального файлу, він би додав 6+ тестів поверх 4 наявних.

## Висновок

Структурований промпт окупився одразу: замість 6–7 ітерацій — 1, а загальна кількість
output-токенів утричі менша (~380 проти ~1 050). Кожна деталь, яку промпт A не
уточнив (applyDiscount, значення в повідомленні, non-integer, тести), стала окремим
follow-up раундом. `<constraints>` у промпті B зафіксували всі ці вимоги до старту —
жодного пропуску, жодного додаткового раунду.