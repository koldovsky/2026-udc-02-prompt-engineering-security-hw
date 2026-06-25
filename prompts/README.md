# Prompt cookbook

Reusable prompts for this repository. Each entry is scoped to a concrete task and can be reused with a real target in `app/`.

## Index

| Prompt file | Purpose | Category | Verified status |
|-------------|---------|----------|-----------------|
| `_template.md` | Template for a new cookbook prompt | template | Draft |
| `add-tests.md` | Add focused unit tests for a target file | tests | ✅ Verified |
| `review-pr.md` | Review a file or diff for defects and security issues | review | ✅ Verified |
| `debug.md` | Diagnose and fix a bug in a specific file | debug | ⏳ Pending |
| `write-docs.md` | Draft or improve documentation | docs | ⏳ Pending |
| `refactor.md` | Improve structure while preserving behavior | refactor | ⏳ Pending |
| `explain-code.md` | Explain how a file or function works | explanation | ⏳ Pending |
| `security-review.md` | Review a file for security risks | security | ⏳ Pending |
| `optimize.md` | Improve performance or simplicity | optimization | ⏳ Pending |
| `add-feature.md` | Add a focused feature to a module | feature | ⏳ Pending |
| `generate-changelog.md` | Draft a concise changelog entry | changelog | ⏳ Pending |

## Notes

- Prefer running each prompt against a real target in `app/` before marking it verified.
- Promote the most useful prompts to commands in `.claude/commands/` or `.cursor/commands/`.
