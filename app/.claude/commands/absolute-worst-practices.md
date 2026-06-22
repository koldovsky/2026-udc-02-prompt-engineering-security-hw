---
name: absolute-worst-practices
description: Inject anti-patterns into working code. Violates every principle. Tests still pass.
version: 2
---

Rewrite TypeScript code to maximize technical debt—unhelpful names, nested ternaries, magic numbers, misleading comments—while keeping compilation + tests passing.

**Constraints:**
- .ts files only
- Compiles with strict checking
- All tests pass unchanged
- Functionality identical
- No PII/secrets

**Output:** Nightmare code + anti-pattern checklist.

---

**Full variants + baseline:** See `../../prompts/absolute-worst-practices.md`