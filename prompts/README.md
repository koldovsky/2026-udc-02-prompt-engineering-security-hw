## 🗂 Repo structure

### 🛠 Basic prompts
1. `prompts/1.add-tests.md` — Write focused unit tests for money.ts functions; expose the remainder bug in splitEvenly
2. `prompts/2.review.md` — Perform a rigorous, multi-layered code review of /app/src files to catch memory leaks, fix rendering bottlenecks, evaluate clean-code standards, and generate actionable "Before/After" code diff tables.
3. `prompts/3.documentation.md` — Generate comprehensive JSDoc comments, component prop tables, and clear README files for code inside the /app/src folder
4. `prompts/4.refactoring.md` — Optimize, modularize, and clean up frontend source code inside the /app/src folder without changing runtime behavior
5. `prompts/5.debug.md` — Systematically isolate, diagnose, and resolve frontend application bugs and runtime exceptions inside the /app/src folder
6. `prompts/6.code-optimization.md` — Systematically audit, tune, and optimize frontend runtime performance and Core Web Vitals inside the /app/src folder
7. `prompts/7.security-vulnerabilities.md` — Systematically audit, detect, and remediate security vulnerabilities and injection risks inside the /app/src folder
8. `prompts/8.lint-formatting.md` — Systematically audit, fix, and enforce strict code formatting, linting rules, and style guides inside the /app/src folder

### 📐 Custom commands
9. `.claude/commands/start.md` — Run production build and pack the project into a clean, deploy-ready tarball archive.
10. `.claude/commands/pack.md` — Check compilation, build the application, and start it after releasing the occupied port.