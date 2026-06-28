# A/B experiment (Task E)

## Задача

Додати валідацію вхідних даних до `applyDiscount` у `app/src/money.ts` — функція не перевіряла параметр `discount` на належність діапазону [0, 100] на call site, навіть хоч `Percent` branded type гарантує це при побудові.

---

## Prompt A — baseline (weak)

```
add input validation to applyDiscount in app/src/money.ts
```

 Однорядковий промпт без контексту чи структури. Агент повинен був сам зрозуміти:
- які параметри валідувати
- якого типу помилки кидати
- як тестувати

---

## Prompt B — structured (full Role + Context + Constraints + AC)

```
Role: Senior TS developer with financial math and security validation expertise.

Goal: Add input validation to `applyDiscount` in `app/src/money.ts` so it 
      rejects invalid `discount` values at the call site.

Context:
- File: app/src/money.ts — function applyDiscount(amount: Cents, discount: Percent)
- `Percent` branded type validates 0–100 at construction, but applyDiscount 
  does NOT re-validate, so passing raw numbers bypasses the guard
- Tests live in app/src/money.test.ts (Vitest)

Constraints:
- Only edit app/src/money.ts and app/src/money.test.ts
- No new dependencies
- Keep existing function signature (applyDiscount still takes Cents + Percent)
- Money rules: integer cents, round to nearest cent

Acceptance criteria:
- applyDiscount throws a descriptive Error if discount is outside 0–100
- At least 2 new tests: one for boundary (0%, 100%), one for invalid (-1, 101)
- npm test passes green

Output:
- Modified applyDiscount function
- New test cases
- One-line summary of what was fixed

Stop rules:
- Do NOT refactor other functions
- If you need to change the Percent type itself, STOP and ask
```

---

## Порівняння

| Метрика | Prompt A (baseline)                      | Prompt B (structured) |
|---|------------------------------------------|---|
| **Ітерацій до результату** | 1                                        | 1 |
| **Output токени (≈)** | ~25,082                                  | ~25,753 |
| **Якість розв'язку** | Хороша — додав валідацію обох параметрів | Відмінна — систематична, з 2 явними тестами per AC |
| **Security fix (знайшов gap сам?)** | ТАК — range check на discount            | ТАК — то саме, але з явним AC критерієм |
| **Фінальні тести** | 55 passed                                | 57 passed (+2 нові за AC) |

---

## Висновок

Обидва промпти дійшли до ідентичного результату **за один запит** — valuation gap уже був легко бачимий з контексту money.ts. Однак **структурований Prompt B** виявив більш систематичний підхід: явно перерахував acceptance criteria, додав дві окремі тест-кейси (boundary + invalid) замість однієї комбінованої. Структура дала агенту карту того, що рівно перевірити, що в baseline промпті мав здогадуватись сам. Над простими задачами різниця незначна; на складних — критерії прийнятності з обов'язковими constraints спасають від off-scope змін і пропусків.
