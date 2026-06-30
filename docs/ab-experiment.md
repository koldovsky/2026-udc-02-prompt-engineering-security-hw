# A/B промптів (Task D, bonus)

Задача (на `app/`): додати валідацію для `applyDiscount` так, щоб відсотки поза діапазоном 0–100 кидали явну помилку, а також зафіксувати це тестом.

## Промпт A — базовий

> зроби X для app

## Промпт B — структурований

> Role: Senior TypeScript engineer working in the sample app.  
> Goal: Add validation for out-of-range percentages in `app/src/money.ts` and preserve the existing API.  
> Context: Target file is `app/src/money.ts`; tests live in `app/src/money.test.ts`; the function should reject invalid `percent` values.  
> Constraints: do not change unrelated behavior, keep changes scoped to the module and tests, do not add dependencies.  
> Acceptance criteria: add a regression test for `-1` and `101`, make the function throw `percent must be between 0 and 100`, and run `npm test`.  
> Output: short summary of the change and the test result.

## Порівняння

| Критерій | Промпт A | Промпт B |
|---|---|---|
| Ітерацій до прийняття | 2 | 1 |
| Output токени (≈) | вищі через уточнення та повторні спроби | нижчі, бо задача була одразу зрозуміла |
| Якість результату | Середня: потрібні були додаткові уточнення щодо поведінки та повідомлення помилки | Вища: зміна була зроблена одразу в потрібному напрямку |
| Правки безпеки/валідації | Потрібно було просити окремо | Враховано одразу: валідація вхідних даних і явна помилка |

## Висновок

Структурований промпт дав чіткіший результат за менше ітерацій. Найбільша різниця була в тому, що він одразу зафіксував очікувану валідацію, тоді як базовий промпт спочатку потребував додаткових уточнень щодо безпечної поведінки введення.
