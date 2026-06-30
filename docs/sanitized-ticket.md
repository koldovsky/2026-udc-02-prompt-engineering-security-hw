# JIRA-4821 — Bug: невірний розрахунок комісії для premium-рахунків

**Priority:** High · **Component:** payments-core · **Reporter:** [REDACTED]

## Опис

Клієнт поскаржився, що комісія за переказ нараховується двічі. Відтворюється на
конкретному premium-рахунку. Нижче — дані та витяг з логів для відтворення.

## Дані клієнта (синтетичні)

- ПІБ: [REDACTED]
- email: [REDACTED]
- телефон: [REDACTED]
- дата народження: [REDACTED]
- картка: ****-1234 (Visa, exp MM/YY)
- IBAN: <IBAN>
- баланс: [REDACTED]
- паспорт: [REDACTED]

## Кроки відтворення (структурні дані, без контексту)

```
txn=TX-****** account=<IBAN> amount=1000.00 fee=2.50
txn=TX-****** fee applied twice -> total fee 5.00
db=[CONNECTION_STRING_REDACTED]
calling fee-service with X-API-Key: [API_KEY_REDACTED]
```

## Внутрішня логіка (з репозиторію payments-core)

Подвоєння у `FeeCalculator.applyTransferFee()` — комісія додається і в
`preAuthorize()`, і в `settle()`. Гілка: `feat/PSD2-fee-refactor`.

## Acceptance criteria

- Комісія нараховується **рівно один раз** на переказ.
- Регресійний тест на сценарій pre-auth → settle.
- Без зміни публічного API `FeeCalculator`.
