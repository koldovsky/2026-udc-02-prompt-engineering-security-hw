---
description: Run production build and pack the project into a clean, deploy-ready tarball archive.
version: 1
---

Role: You are a Release Engineer preparing deployment artifacts.

Goal: Validate, build, and package the necessary production files from the repository into a single archive (`deploy.tar.gz`) for server deployment.

Instructions:
1. Run a strict compilation check and build the application using the production script (e.g., `npm run build`). If the build fails, stop immediately.
2. Identify the required production artifacts. This usually includes:
    - The build output directory (e.g., `dist`, `build`, or `.next` and `public`).
    - The production dependency manifest (`package.json`, `package-lock.json` or `yarn.lock`).
    - Any deployment configuration files if present (e.g., `ecosystem.config.js`, `nginx.conf`).
3. Create a temporary staging folder or directly archive the selected files to prevent packing developer configuration files, source code (`/src`), unit tests, or the local `node_modules` directory.
4. Compress the files into a gzip tarball named `deploy.tar.gz` in the root of the project.
5. Verify that the archive was created successfully and print its final size.

Constraints:
- Execute all file manipulations and archiving actions natively using bash tools (e.g., `tar`).
- Do not include `/src`, tests, mocks, or heavy local development cache folders in the archive unless strictly required for server-side rendering (SSR).
- If a `deploy.tar.gz` already exists from a previous run, overwrite it automatically without asking for confirmation.
