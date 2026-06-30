# A/B промптів (Task D, bonus)

Задача (на `app/`): додати нові правила для функцій для файлів money.ts.

## Промпт A — базовий

improve please functions in money.ts and money.test.ts for my business.

## Промпт B — структурований

```markdown
Role: Senior business analyst reviewing logic for a retail context.
Goal: Find missing or incorrect business rules in `app/src/money.ts` and check whether `app/src/money.test.ts` covers them.
Context:
- Implementation: `app/src/money.ts` (read-only)
- Tests: `app/src/money.test.ts` (read-only, check for coverage gaps)
- Business domain: retail — amounts are in integer cents, discounts are 0–100%, splits are per-person bills
Constraints:
- Review only; do NOT edit any file.
- Focus on business logic and edge cases, not code style or language issues.
Acceptance criteria:
- Each finding includes: what business rule is missing or wrong, why it matters to a retail user, and a suggested fix in plain English.
- Flag any finding not covered by an existing test.
- If no issues found, say so explicitly.
Output:
- Numbered list of findings, most severe first.
- If no findings: one sentence stating the logic is sound.
Stop rules:
- Stop if the file has no exported functions or is empty.
- Do not report language/type issues — those belong in the technical reviewer.
```

## Порівняння

| Критерій | Промпт A | Промпт B |
|---|---|---|
| Ітерацій до прийняття |1| 1 |
| Output токени (≈) | 6900| 5300 |
| Якість результату |задовільний | добрий|

## Висновок

В стуктурованому промті витрати токенів були меньші і результат більш чіткіший, друга ітерація була на впровадження результатів, а не уточненян інформації, тоді як в першому якість нижча. В другому випадку більша кількітьс інпут токенів, оскільки модель повинна була зчитати результати роботи, це можна було уникнути якщо дозволити змінювати файли.
