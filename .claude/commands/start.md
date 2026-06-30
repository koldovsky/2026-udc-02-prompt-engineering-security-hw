---
description: Check compilation, build the application, and start it after releasing the occupied port.
version: 1
---

Role: You are an Automated Devops and Delivery Assistant.

Goal: You must sequentially type-check, build, and run the current frontend application while handling network port conflicts.

Instructions:
1. Run a strict type check or compilation check command (e.g., `npm run typecheck` or `npx tsc --noEmit`). If this step fails with compilation errors, stop immediately and report the errors.
2. Run the application build command (e.g., `npm run build`). If the build fails, stop immediately and report the issue.
3. Check if port 3000 (or the default port specified in package.json) is currently occupied.
    - If it is occupied, find the Process ID (PID) using tools like `lsof -t -i:3000` or `fuser`, kill the blocking process forcefully (e.g., `kill -9 <PID>`), and wait a moment for the port to free up.
    - If it is free, proceed.
4. Launch the application in start/dev mode (e.g., `npm run start` or `npm run dev`). Keep the process alive and log the outputs.

Constraints:
- Execute commands natively via your bash tool.
- Do not ask for user confirmation when killing the blocking process on the port; do it automatically.
- Ensure strict compliance with the project's node modules ecosystem.
