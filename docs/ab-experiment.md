# A/B промптів (Task E, bonus)

**Задача на `app/`:** додати edge-case Vitest-тести для `app/src/money.ts` без змін
прод-коду.

**Дата / інструмент:** 2026-06-29, Cursor Agent (Composer), Node 22 + vitest.

## Промпт A — базовий

```text
допоможи з тестами для app
```

(з [`materials/weak-prompt.md`](../materials/weak-prompt.md))

## Промпт B — структурований

З [`prompts/add-tests.md`](../prompts/add-tests.md) (production markdown, v2):

```markdown
Role: TypeScript engineer in this repo (Node 22, vitest, ESM, `*.js` import suffix). You add tests only.
Goal: Extend app/src/money.test.ts with edge-case Vitest coverage for all four exports in app/src/money.ts.
Context:
- Target module: app/src/money.ts (integer cents; exports: formatCents, parseAmount, splitEvenly, applyDiscount).
- Existing file app/src/money.test.ts has minimal happy-path smoke tests — keep them; add what's missing.
- Verify: cd app && npm test && npm run typecheck.
Constraints:
- Edit only app/src/money.test.ts — no changes to money.ts or package.json.
- No new dependencies; do not change the public API or production behavior.
- No secrets or PII in test data.
Acceptance criteria:
- cd app && npm test exits 0; cd app && npm run typecheck exits 0.
- At least 5 new `it()` blocks; per-function edge cases (negatives, parse errors, remainder, discount boundaries).
- splitEvenly remainder: assert sum or it.skip/todo if production wrong — do not fix money.ts.
Output: updated money.test.ts + bullet list of new cases; skip/todo table if any.
Stop rules: no production fixes; stop when AC pass.
```

**Курація контексту (разом із B):** `@app/src/money.ts`, `@app/src/money.test.ts`
(див. [`context-layer.md`](./context-layer.md)).

## Спостереження при виконанні

### Промпт A (симульований прохід / Demo 1)

- Агент читає весь `app/`, інколи `package.json`, README, сусідні каталоги.
- Немає чіткого «done» — може зупинитись після 1–2 smoke-тестів або навпаки
  змінити `money.ts`, щоб «полегшити» тести.
- Не згадує skip/todo для planted bug у `splitEvenly`.
- Немає заборони PII/секретів у тестових даних.
- Потрібні додаткові репліки: «тільки тести», «не чіпай money.ts», «npm test».

### Промпт B (фактичний прохід у цій робочій сесії)

- Зміни **лише** в `money.test.ts` (потім окремі промпти для fix — за дизайном homework).
- Додано ≥5 `it()`: negatives, zero, parse trim/garbage, discount boundaries, remainder.
- Remainder спочатку `it.skip` (не ламав suite, не фіксував prod без промпта).
- `cd app && npm test` + `typecheck` — зелені після кожного проходу.
- Meta-prompting (v2 AC) додав zero cents + negative parseAmount без роздування scope.

## Порівняння

| Критерій | Промпт A (базовий) | Промпт B (структурований) |
|----------|--------------------|---------------------------|
| **Ітерацій до прийняття** | 3+ (уточнення scope, «тільки тести») | **1–2** (+ опц. meta-prompt для v2 AC) |
| **Контекст (repomix, токени)** | ~26 330 (41 файл, увесь репо) | ~2 263 (3 цільові файли) |
| **Output токени (≈)** | ~1 500–2 500 (зайві пояснення, огляд репо) | ~400–800 (фокус на тестах + bullet list) |
| **Файли змінено** | Непередбачувано (`money.ts`?, `package.json`?) | **Лише** `money.test.ts` |
| **Покриття edge cases** | Випадкове / мінімальне | Список AC по кожній функції |
| **Planted bug (remainder)** | Ігнор або prod-fix | `it.skip` + причина → далі `/debug-failing-test` |
| **Правки безпеки** | Не в промпті — треба нагадувати | **В Constraints:** no PII/secrets; tests only |
| **Верифікація** | Агент сам вирішує | `npm test` + `typecheck` у AC |
| **Якість результату** | Нестабільна | Стабільна, перевірена на `app/` |

## Висновок

Інвестиція в структуру (Role / Context / Constraints / AC / Stop) **окупилась**:
менше ітерацій, ~**10× менший** релевантний контекст (разом із `@file`), передбачуваний
diff і вбудовані security constraints (no prod edits, no PII). Найбільша різниця —
**scope і «definition of done»**: A розповзається по репо, B завершується зеленим
`npm test` і чеклістом кейсів. Для команди: тримати слабий промпт у `materials/` як
нагадування, production — у `prompts/` + `/add-tests`.

## Артефакти

- Структурований промпт: [`prompts/add-tests.md`](../prompts/add-tests.md)
- Результат B: [`app/src/money.test.ts`](../app/src/money.test.ts) (13 tests, green)
- Контекст/токени: [`docs/context-layer.md`](./context-layer.md)
