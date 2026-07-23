# A/B промптів (Task E, bonus)

Задача (на `app/`): додати функцію `addCents` для безпечного додавання двох branded `Cents` значень.

## Промпт A — базовий

> Додай функцію addCents у money.ts

## Промпт B — структурований

> **Role:** Ти — TypeScript-розробник фінтех-команди.
>
> **Context:** `app/src/money.ts` використовує branded types (`Cents`, `Percent`)
> і integer-арифметику для уникнення floating-point drift. Усі функції мають
> JSDoc, overflow-guard де потрібно, та debug-логування через внутрішній `log()`.
>
> **Task:** Додай експортовану функцію `addCents(a: Cents, b: Cents): Cents`.
>
> **Constraints:**
> - Overflow guard: кидай Error якщо сума виходить за `Number.MAX_SAFE_INTEGER`.
> - Використай існуючий `log("debug", ...)` для трейсу.
> - Branded type на вході й виході — без `as unknown`.
> - Не змінюй існуючі функції.
>
> **Acceptance criteria:**
> - `addCents(cents(100), cents(250))` → `cents(350)`
> - `addCents(cents(-50), cents(50))` → `cents(0)`
> - Overflow → `Error("addCents: overflow")`
> - `npm test` проходить.
>
> **Output:** тільки зміни у `money.ts`, без пояснень.

## Порівняння

| Критерій | Промпт A | Промпт B |
|---|---|---|
| Ітерацій до прийняття | 2 (1-ша — без overflow guard; 2-га — додав після прохання) | 1 (все враховано з першого разу) |
| Output токени (≈) | ~120 (перша) + ~80 (друга) = **~200** | **~150** (одна ітерація) |
| Якість результату | Робочий, але потребував доопрацювання | Повний з першої спроби |
| Overflow guard | Ні → додано на ітерації 2 | Так, одразу (вказано в Constraints) |
| Debug logging | Ні → додано на ітерації 2 | Так, одразу (вказано в Constraints) |
| JSDoc | Мінімальний | Повний, з @throws і @example |
| Branded type safety | `as Cents` — коректно | `as Cents` — коректно |
| Правки безпеки/валідації | Довелось просити окремо | Враховано одразу |

## Деталі виконання

### Промпт A — що отримали спочатку

```typescript
export function addCents(a: Cents, b: Cents): Cents {
  return (a + b) as Cents;
}
```

Проблеми: немає overflow guard, немає логування, мінімальний JSDoc.
Потрібна ітерація 2: «додай overflow check і logging як в інших функціях».

### Промпт B — що отримали одразу

```typescript
export function addCents(a: Cents, b: Cents): Cents {
  const sum = a + b;
  if (sum > Number.MAX_SAFE_INTEGER || sum < Number.MIN_SAFE_INTEGER) {
    throw new Error("addCents: overflow");
  }
  log("debug", "addCents", { a, b, sum });
  return sum as Cents;
}
```

Повний результат з першої спроби — все відповідає AC.

## Висновок

Структурований промпт окупився: одна ітерація замість двох, менше сумарних токенів (~150 vs ~200), і головне — **безпека/валідація враховані одразу**, без follow-up. Різниця найбільша саме у non-functional requirements (overflow, logging, docs) — базовий промпт їх ігнорує, бо модель оптимізує під «мінімальну відповідь на запит». Інвестиція в структуру (~80 токенів промпту) повертається зменшенням ітерацій і вищою якістю першого результату.
