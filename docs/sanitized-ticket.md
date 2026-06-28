<!--
============================================================================
SANITIZED version of materials/sensitive-ticket.md (WS2 — Task B).
All 🔴 secrets/PII removed or masked; 🟡 internal context generalized.
The engineering task (fee charged twice) is fully preserved so an AI can still
reason about the bug. Sanitization techniques used per field are noted inline.
============================================================================
-->

# JIRA-4821 — Bug: невірний розрахунок комісії для premium-рахунків

**Priority:** High · **Component:** payments · **Reporter:** [REPORTER_1]

## Опис

Клієнт поскаржився, що комісія за переказ нараховується **двічі**. Відтворюється
на конкретному premium-рахунку. Нижче — знеособлені дані клієнта й очищений
витяг з логів для відтворення.

## Дані клієнта (з CRM) — знеособлено

| Поле | Значення (sanitized) | Техніка |
|---|---|---|
| ПІБ | `[CUSTOMER_1]` | synthetic placeholder |
| email | `customer-1@example.test` | synthetic |
| телефон | `+380 50 *** ** 67` | masking |
| дата народження | `[REDACTED]` (не потрібна для бага) | redaction |
| картка | `****-1234` (Visa) | masking |
| CVV | `[REDACTED]` — ніколи не передається | redaction |
| IBAN | `<IBAN>` | masking |
| баланс | `~4.3e5 UAH` (порядок величини) | generalization |
| паспорт | `[REDACTED]` | redaction |
| РНОКПП (ІПН) | `[REDACTED]` | redaction |

> Жодне з цих полів не впливає на відтворення бага — баг у логіці нарахування
> комісії, а не в даних клієнта.

## Кроки відтворення (очищений лог)

```
<TS> INFO  txn=<TXN_ID> account=<ACCOUNT> amount=1000.00 fee=2.50
<TS> INFO  txn=<TXN_ID> fee applied twice -> total fee 5.00
<TS> DEBUG db=<DB_CONN_OUT_OF_BAND>
<TS> DEBUG calling fee-service with X-API-Key: <SECRET_OUT_OF_BAND>
```

- Реальний connection string і API-ключ **навмисно не включені** (out-of-band).
  Якщо вони колись «світилися» у тікеті — їх треба **ротувати**, а не маскувати.
- Збережено те, що важливо для бага: `amount=1000.00`, `fee=2.50`, і факт
  `fee applied twice -> total fee 5.00`.

## Внутрішня логіка (🟡 — узагальнено)

Подвоєння виникає тому, що комісія за переказ додається **двічі**: один раз на
етапі попередньої авторизації і вдруге на етапі фінального списання. Очікувано —
рівно один раз на переказ.

## Acceptance criteria

- Комісія нараховується **рівно один раз** на переказ.
- Регресійний тест на сценарій pre-auth → settle.
- Без зміни публічного API компонента розрахунку комісій.
