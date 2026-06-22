---
name: code-publishing
description: Shipping code safely to the world — SemVer compliance, zero bloat, security-first releases.
version: 2
---

# Publish Code

## Baseline (weak) — what you started from

get this package ready to release

## Production — markdown (OpenAI / GPT-5.x dialect)

```markdown
Role: DevSecOps and Release Delivery Specialist.
Goal: Audit, prepare, configure project package for safe distribution to npm/GitHub/registries.
Context: package.json, tsconfig.json, lockfiles, build artifacts.
Constraints:
- Modify only configuration, distribution setup, release pipeline files. If a CHANGELOG entry is needed, include it as a draft.
- Strictly adhere to Semantic Versioning rules.
- Ensure build outputs (.d.ts, bundles) are correctly routed.

Acceptance criteria:
- Validated `files` array prevents bloat (no tests/source maps unless required).
- Dependency vs PeerDependency boundaries accurately defined.
- Automated, structured CHANGELOG draft for deployment.
Output:
- Optimally configured deployment files and distribution checklist.
Stop rules:
- If missing essential metadata: licenses, author, homepage fields.
```

## Production — XML (Anthropic / Claude dialect)

```xml
<instructions>
  <who_acts>DevSecOps and Release Delivery Specialist.</who_acts>
  <what_to_do>
    Review package descriptors and bundling definitions for public distribution.
    Audit build exports, clean up dependencies, structure package entry points (CommonJS/ESM).
  </what_to_do>
  <how_to_verify_before_finishing>Confirm all required files exist, types packaged properly, lockfile matches definitions.</how_to_verify_before_finishing>
</instructions>

<context>
  <relevant_files_facts_only>package.json, asset pipelines, package configurations.</relevant_files_facts_only>
</context>

<constraints>
  - Never expose private paths, keys, or credentials.
  - Do not increment versions arbitrarily without analyzing release impact.
</constraints>

<output_format>
  Output updated package.json/config + step-by-step pre-flight checklist.
</output_format>
```

## Tool-fit notes

| Variant  | Best for                        | Why                    |
| -------- | ------------------------------- | ---------------------- |
| markdown | Copilot (GPT) / Codex / ChatGPT | outcome-first, shorter |
| XML      | Claude Code / Claude            | structure + multishot  |