---
description: Add throw-on-invalid guards to exported functions in a TypeScript module, then verify with the test suite.
---

<instructions>
You are hardening a TypeScript module with input validation guards.
For each exported function in $ARGUMENTS: identify parameters that have no range or type check and could silently produce wrong results (division by zero, negative where positive required, out-of-range percent, etc.).
Add a guard at the top of each affected function body.
Also update the corresponding test file with it() blocks covering each new throw path.
Run the test suite after changes to confirm all tests pass.
</instructions>

<context>
Target: $ARGUMENTS
Guard pattern to apply:
  if (<bad condition>) throw new Error("<param> must be <constraint>, got ${<param>}");
Place guards at the very start of the function body, before any computation.
</context>

<constraints>
- Edit ONLY the affected function bodies and their test file.
- Throw native Error with a message that names the bad parameter and its value.
- Do not run npm install or any git commands.
- Do not add guards for conditions that are already checked.
- All tests (existing + new) must pass after the change.
</constraints>

<output_format>
1. Updated guard sections (function bodies only, not full file).
2. New it() blocks for the test file.
3. Test runner output confirming all pass.
</output_format>
