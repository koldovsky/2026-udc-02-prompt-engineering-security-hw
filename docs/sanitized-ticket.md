# TICKET-4821 — Bug: невірний розрахунок комісії для premium-рахунків

> Санітизована версія `materials/sensitive-ticket.md`. Усі 🔴-значення замасковані,
> синтетичні або винесені out-of-band. Задачу можна передати публічній AI-моделі.

**Priority:** High · **Component:** `<PAYMENTS_COMPONENT>` · **Reporter:** `[REPORTER_1]`

## Опис

Клієнт `[CUSTOMER_1]` поскаржився, що комісія за переказ нараховується **двічі**
на premium-рахунку. Відтворюється на конкретному рахунку клієнта. Нижче —
узагальнені (не production) дані для контексту.

## Дані клієнта (з CRM) — санітизовано

| Поле | Значення (після санітизації) | Техніка |
|------|------------------------------|---------|
| ПІБ | `[CUSTOMER_1]` | synthetic placeholder |
| email | `[CUSTOMER_1]@example.test` | synthetic |
| телефон | `+380 ** *** ** 67` | masking |
| дата народження | `[DOB_REDACTED]` | redaction |
| картка | `****-1234` (Visa, exp `**/**`, CVV `[REDACTED]`) | masking + redaction |
| IBAN | `<IBAN>` | masking |
| баланс | `[BALANCE_REDACTED]` | redaction |
| паспорт / ІПН | `[PASSPORT_REDACTED]` / `[TAX_ID_REDACTED]` | redaction |

## Кроки відтворення (узагальнений лог)

```
2026-05-30 14:02:11 INFO  txn=<TXN_ID> account=<IBAN_SUFFIX> amount=1000.00 fee=2.50
2026-05-30 14:02:11 INFO  txn=<TXN_ID> fee applied twice -> total fee 5.00
2026-05-30 14:02:12 DEBUG  db connection established [credentials: out-of-band]
2026-05-30 14:02:12 DEBUG  calling fee-service [auth: out-of-band]
```

**Секрети (DB connection string, API key):** не включені в цей документ і не в промпт.
Значення лише в secret store / env. Якщо ключ потрапив у оригінальний лог — **ротувати** негайно.

## Внутрішня логіка (🟡 — enterprise / no-train tier)

Подвоєння у `FeeCalculator.applyTransferFee()` — комісія додається і в
`preAuthorize()`, і в `settle()`. Гілка: `<FEATURE_BRANCH>`.

> Цей блок — внутрішня логіка. Для публічних моделей залишити лише узагальнення:
> «fee застосовується двічі в ланцюжку pre-auth → settle».

## Acceptance criteria

- Комісія нараховується **рівно один раз** на переказ.
- Регресійний тест на сценарій pre-auth → settle.
- Без зміни публічного API `FeeCalculator`.

## Що прибрано / замінено (для рев'ю)

| Оригінал (тип) | Санітизація |
|----------------|-------------|
| ПІБ, email, телефон, ДН, паспорт, ІПН | placeholders / redaction |
| PAN, CVV, IBAN, баланс | masking / redaction |
| `postgres://…:password@…` | повністю out-of-band (рядок логу прибрано) |
| `sk-live-…` / `X-API-Key` | out-of-band — не в документі |
| production IP, повний account | redaction / узагальнений лог |

## Рішення щодо tier для 🟡-даних (Task B, п. 4)

**🟡-фрагмент у цьому тікеті:** `<PAYMENTS_COMPONENT>`, `FeeCalculator.applyTransferFee()`,
`preAuthorize()` / `settle()`, гілка `<FEATURE_BRANCH>`.

**Обраний інструмент:** **Cursor (Privacy Mode)** + enterprise-угода команди.

| Критерій | Чому це важливо для 🟡 |
|----------|------------------------|
| **no-train** | Назви внутрішніх класів і гілок не повинні потрапляти в тренувальні корпуси моделей. |
| **enterprise** | DPA з постачальником AI; контроль хто в організації має доступ до контексту. |
| **data residency** | Обробка в регіоні ЄС (або узгоджений з compliance) — важливо для фінтех-контексту. |

**Чому не публічний tier:** безкоштовний ChatGPT / Copilot Individual не дає гарантій
no-train і retention — внутрішня логіка payments може витікти в модель.

**Практичний варіант:** якщо enterprise tier недоступний — **redact 🟡 → 🟢**
(залишити лише «комісія двічі в pre-auth → settle») і працювати в будь-якому інструменті
з уже санітизованим [`sanitized-ticket.md`](./sanitized-ticket.md).
