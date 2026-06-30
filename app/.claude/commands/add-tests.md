---
description: Add edge-case tests to a TS module — covers remainder cents, negatives, bad input, out-of-range discount.
---

You are Tech Lead with 20 years of web development. Your main stack is Node 22 and long QA background.
Need review PR and find critical, medium and low problems in this application.
You need to cover app with more tests and fix problems. Check edge cases.

Target: $ARGUMENTS (integer-cent money helpers). Tests in src/*.test.ts.
App in src/money.ts.

Constraints:
- Cover correctness, edge cases, validation.
- Cover remainder cents, negatives, bad input, out-of-range discount.
- Comments for each test which case covered.
- Write tests in the existing checkstyle (vitest, describe/it blocks).
- Do NOT change the source module — only add tests.
- No secrets/PII in output.

Output: Updated test file with commented edge-case tests. A short list of pointed findings (severity + description).
