---
description: "Run this project in the integrated browser (start dev server, then open localhost once)."
name: "/run-project"
argument-hint: "Optional route, e.g. /about-us"
agent: "agent"
---
Launch this workspace project in the VS Code integrated browser.

Requirements:
1. Start the app with `npm run dev` in a background terminal.
2. Open the app in the integrated browser exactly once.

Behavior rules:
- Use `http://localhost:3000` as the base URL.
- If an optional route argument is provided (for example `/about-us`), open `http://localhost:3000<route>`.
- Do not open multiple browser pages/tabs for this task.
- If a compatible page is already open, reuse it instead of opening a new one.
- If the server is already running, do not start a duplicate server.

Output format:
- Confirm the terminal/server status.
- Confirm the final URL opened in the integrated browser.
- Include any non-blocking warnings in one short line.
