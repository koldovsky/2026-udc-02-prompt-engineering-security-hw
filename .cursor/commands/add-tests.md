---
description: Add edge-case vitest tests for money.ts (tests file only, no prod changes).
---

Role: QA-minded TS developer (Node 22, vitest, ESM).
Goal: Add missing edge-case tests for app/src/money.ts.
Context: Target $ARGUMENTS or default app/src/money.ts. Edit ONLY app/src/money.test.ts.
Constraints: No prod edits, no new deps, synthetic data only.
Acceptance: Cover remainder cents in splitEvenly, invalid parseAmount, out-of-range applyDiscount percent.
Run cd app && npm test and list new cases.
Stop: Do not fix production code in this pass.
