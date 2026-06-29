# A/B промптів (Task E, bonus)

Задача (на `app/`): **додати edge-case тести до `app/src/money.ts`**

---

## Промпт A — базовий

> `допоможи з тестами для app`

(з `materials/weak-prompt.md`)

## Промпт B — структурований

XML-варіант з `prompts/add-tests.md` (v2):

```xml
<instructions>
You are a TypeScript engineer. Add edge-case tests to `app/src/money.test.ts`
for every public function in `app/src/money.ts`. Preserve all 4 existing smoke
tests. Do NOT modify `money.ts`. Before finishing, run `cd app && npm test` —
all tests must be green.
</instructions>
<context>
Gaps per function:
  formatCents: zero, negative, single-digit frac
  parseAmount: negative, single-digit frac, whitespace trim; throws on empty/abc/1.234
  splitEvenly: BUG — document with CI-green test (sum===9, comment "BUG: should be 10")
  applyDiscount: 0%, 100%, rounding (10001 at 10%→9001), percent>100 negative
</context>
<constraints>
- Edit only app/src/money.test.ts; do not delete existing tests
- Do not modify money.ts or any other file
- No new npm dependencies
</constraints>
<stop_rules>
- Ambiguous behaviour → add comment in test, do not guess
- If tests fail due to source bug → report; do not fix money.ts
</stop_rules>
```

---

## Що сталось на практиці (реальна сесія WS2)

**Промпт A:** Агент прочитав `money.ts`, `money.test.ts`, `package.json` (3 file reads), потім одразу запропонував написати тести без уточнення scope. Перша спроба edit була відхилена користувачем (відсутній template). Потім ще один тур уточнень ("I need tests for app/src/money.ts, based on _template.md"), ще одна відхилена спроба ("improve the prompt before executing"). Тільки після мета-промптингу і явного уточнення scope агент виконав задачу правильно.

**Промпт B:** Одна команда — `Виконай підказку з файлу prompts/add-tests.md`. Агент прочитав промпт, відредагував `money.test.ts` (лише цей файл), запустив `npm test` → 19/19 зелених. Жодних уточнень не потрібно.

---

## Порівняння

| Критерій | Промпт A (слабкий) | Промпт B (структурований) |
|---|---|---|
| Ітерацій до прийнятного результату | 4–5 turns + 2 відхилення | 1 turn |
| Зайвих file reads | 3 (package.json, README — не потрібні) | 1 (промпт-файл) |
| Якість результату | Scope не визначений — агент почав з коду, а не з промпту | 19 edge-case тестів, scope утримано |
| Збереження існуючих тестів | Не гарантовано (без explicit constraint) | Гарантовано (explicit constraint) |
| Документування багу | Не визначено — агент міг «виправити» bug без завдання | CI-green + BUG comment — чітко задано |
| Правки безпеки / валідації | Не згадані — агент міг змінити `money.ts` | Explicit: "do not modify money.ts" |
| Output токени (≈) | ~800 (3 спроби + пояснення) | ~400 (1 відповідь) |

---

## Висновок

Структурований промпт окупає інвестицію (~2 хв написання) заощадженням 3–4 ітерацій на виконання. Найбільша різниця — у **scope control** і **security constraints**: слабкий промпт залишає агенту свободу редагувати будь-який файл, а структурований явно обмежує до одного файлу й документує bug замість «виправлення» без завдання. Для командного cookbook це означає відтворюваний результат від будь-якого члена команди — не тільки від автора.
