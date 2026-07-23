# JIRA-4821 — Bug: невірний розрахунок комісії для premium-рахунків

**Priority:** High · **Component:** payments-core · **Reporter:** [EMPLOYEE_1]

## Опис

Клієнт поскаржився, що комісія за переказ нараховується двічі. Відтворюється на
конкретному рахунку. Нижче — синтетичні дані для відтворення.

## Дані клієнта (sanitized)

- ПІБ: **[CUSTOMER_1]**
- email: **[CUSTOMER_1_EMAIL]**
- телефон: **[CUSTOMER_1_PHONE]**
- дата народження: **[REDACTED]**
- картка: **\*\*\*\*-1234** (Visa)
- IBAN: **<IBAN>**
- баланс: **[REDACTED]**
- паспорт: **[REDACTED]**, РНОКПП (ІПН): **[REDACTED]**

## Кроки відтворення (синтетичний лог)

```
2026-05-30 14:02:11 INFO  txn=TX-XXXXX account=<IBAN> amount=1000.00 fee=2.50
2026-05-30 14:02:11 INFO  txn=TX-XXXXX fee applied twice -> total fee 5.00
2026-05-30 14:02:12 DEBUG  db=<SECRET_OUT_OF_BAND>
2026-05-30 14:02:12 DEBUG  calling fee-service with X-API-Key: <SECRET_OUT_OF_BAND>
```

## Внутрішня логіка

Подвоєння у методі розрахунку комісії — комісія додається і на етапі
pre-authorization, і на етапі settlement.

## Acceptance criteria

- Комісія нараховується **рівно один раз** на переказ.
- Регресійний тест на сценарій pre-auth → settle.
- Без зміни публічного API калькулятора комісій.
