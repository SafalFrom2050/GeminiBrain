# GeminiBrain ? Agentic Workspace

GeminiBrain is an agentic personal workspace designed to run with the Gemini CLI. It acts like a small autonomous assistant with short-term and persistent memory, tools, and lightweight integrations.

**Core idea:** run the repository with `gemini` and let the agent follow instructions in `SOUL.md`, consult its memory, and act using local utilities.

**Key features**
- Agentic workflow: uses interactive Gemini sessions to run tasks and follow high-level instructions.
- Memory: the workspace stores notes and state (e.g., `MEMORY.md`, `EXAMPLE.MEMORY.md`) that the agent can consult and update.
- Utilities: small scripts (RSS fetcher, launchers) and integrations to extend the agent's capabilities.

## Quick Start (Gemini CLI)

1. Install and configure the Gemini CLI for your platform.
2. From the project root run the included `start.bat` on Windows or invoke `gemini` directly:

```bat
gemini -i "Read the `SOUL.md` file and follow instructions"
```

`start.bat` is a convenience launcher that invokes `gemini` in interactive mode and points it at the repository instructions.

## How the agent uses memory

- Persistent notes: store long-term facts or goals in `MEMORY.md` and `EXAMPLE.MEMORY.md`.
- Short-term: the agent may write temporary notes or state while executing a session.
- Design: keep entries concise and timestamped when useful; the agent will prefer structured, short facts.

## Files of interest
- `SOUL.md` ? the agent's top-level mission and behavior hints.
- `MEMORY.md` / `EXAMPLE.MEMORY.md` ? persistent memory store.
- `start.bat` / `run_bot.bat` ? simple launchers for the workspace and integrations.

Note about EXAMPLE files

- Files prefixed with `EXAMPLE.` (for example `EXAMPLE.SOUL.md` or `EXAMPLE.MEMORY.md`) are templates included in the repo so the real filenames can be listed in `.gitignore`. To activate a file locally, rename it to remove the `EXAMPLE.` prefix (for example, rename `EXAMPLE.SOUL.md` to `SOUL.md`). This keeps sensitive or environment-specific files ignored in git while allowing you to enable them locally.

## WhatsApp integration (optional)

A minimal WhatsApp bot is included under `whatsapp-bot/` (optional). It uses Baileys and stores session files in `whatsapp-bot/auth_info_baileys/`. Keep those files private.

To run the bot (optional):

```bash
cd whatsapp-bot
npm install
node index.js
```

---

If you'd like, I can also add a focused `whatsapp-bot/README.md`, example `npm` scripts, or make the `start.bat` more configurable.
