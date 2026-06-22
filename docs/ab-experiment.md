# A/B промптів (Task E, bonus)

Задача: додати валідацію `percent` у `applyDiscount`.

## Промпт A — базовий

```
пофікси applyDiscount
```

## Промпт B — структурований

```markdown
Role: TS developer, input validation focus.
Goal: Harden applyDiscount against invalid percent in app/src/money.ts.
Constraints: percent in [0,100] or throw RangeError; no new deps; update tests.
Acceptance: tests for -1, 101, NaN; npm test green.
Output: validation rule + test names.
```

## Порівняння

| Критерій | Промпт A | Промпт B |
|---|---|---|
| Ітерацій до прийняття | 3 | 1 |
| Output токени (≈) | ~1,200 | ~600 |
| Якість результату | фікс без тестів на NaN | повний набір edge cases |
| Правки безпеки/валідації | довелось просити окремо | в AC одразу |

## Висновок

Структурований промпт окупився: менше ітерацій, валідація й тести з першого проходу. Найбільша різниця — явні Constraints і Acceptance criteria.
