# A/B промптів (Task D, bonus)

> Скопіюйте у `docs/ab-experiment.md` і заповніть.

Задача (на `app/`): виправити `splitEvenly` — неправильно ділить негативні суми через знак remainder у JavaScript.

## Промпт A — базовий

> splitEvenly не ділить правильно негативні суми — почини

## Промпт B — структурований

```xml
<instructions>
You are a senior TS engineer. Fix splitEvenly(totalCents, n) in app/src/money.ts
so the returned shares always sum exactly to totalCents — including negative
totals — then add tests in app/src/money.test.ts that fail before your fix and
pass after. Do not change behaviour for inputs that are already correct.
</instructions>

<context>
Target: app/src/money.ts. splitEvenly does base = Math.floor(totalCents / n),
remainder = totalCents % n, then adds 1 to the first `remainder` entries. JS `%`
keeps the dividend's sign, so a negative total gives a negative remainder and the
loop never executes: splitEvenly(-10001, 3) returns [-3334, -3334, -3334], which
sums to -10002 instead of -10001. The docstring promises the shares sum exactly
to totalCents. Tests live in app/src/money.test.ts (vitest, Node 22).
</context>

<constraints>
- Edit only app/src/money.ts and app/src/money.test.ts; do not modify any other file.
- Preserve current output for all positive-total cases; keep the n <= 0 guard and signature.
- No new npm dependencies; no secrets or PII — synthetic test values only.
- Add new cases inside the existing splitEvenly describe block.
</constraints>

<output_format>
Return both updated files in full — first app/src/money.ts, then
app/src/money.test.ts. Complete file contents only, no prose, no diff.
</output_format>

<stop_rules>
- If splitEvenly already conserves cents for negative totals, report it and stop.
- If vitest is not present in package.json, report it and stop.
</stop_rules>
```

## Порівняння

| Критерій | Промпт A | Промпт B |
|---|---|---|
| Ітерацій до прийняття | 1 | 1 |
| Output токени (≈) | ~400 | ~350 |
| Якість результату | висока — root cause знайдено одразу (`%` зберігає знак у JS), fix однорядковий | висока — той самий root cause, пояснення точніше (Math.floor vs % невідповідність задокументована у коментарі) |
| Правки безпеки/валідації | тести додано без окремого запиту | 3 цільових тест-кейси додано відповідно до вимог `<constraints>` |
| Дотримання обмежень | частково — модель сама вирішувала що редагувати | повне — лише два дозволені файли, без нових залежностей |

## Висновок

Для такого простого однорядкового фіксу різниця між A і B мінімальна: обидва знайшли root cause за одну ітерацію. Інвестиція у структуру окупилась там, де вона найважливіша — у передбачуваності: `<constraints>` усунули будь-які сумніви щодо того, які файли чіпати, а `<stop_rules>` запобігли зайвій роботі, якби баг вже був виправлений. Різниця найбільша у масштабі: чим складніше завдання, тим більше структура скорочує кількість уточнень і непотрібних змін.
