# app/ — Money Utilities

## Стек

- TypeScript (ESM, `"type": "module"`)
- Vitest для тестів
- Node.js runtime
- Без фреймворків — чисті утилітарні функції

## Команди

```bash
npm test          # vitest run — всі тести одноразово
npm run test:watch # vitest у watch-режимі
npm run typecheck  # tsc --noEmit — перевірка типів без білду
```

## Конвенції

1. **Суми — у цілих центах (integer cents).** Ніколи не використовувати float для грошей. Branded types `Cents` і `Percent` запобігають змішуванню на рівні компіляції.
2. **Тести поруч із кодом:** `money.test.ts` / `money.edge.test.ts` лежать у тому ж `src/`.
3. **Без side-effects при імпорті.** Debug-логування вмикається лише через `process.env.DEBUG_MONEY=1`.

## Що не індексувати (контекст для агента)

Агент НЕ повинен читати/індексувати:
- `node_modules/`
- `dist/`, `coverage/`
- `.env`, `.env.local`
- `package-lock.json` (великий, неінформативний)
