# GeminiBrain

Short description

GeminiBrain is a small personal assistant/workspace containing utilities, notes, and a WhatsApp integration for automated messaging and quick interactions. The repository groups scripts and docs for running local utilities and a WhatsApp bot.

## Project Structure

- `fetch_rss.py`, `run_bot.bat`, `start.bat`, and various notes (SOUL, SKILL, MEMORY)
- `whatsapp-bot/` ? WhatsApp integration and runtime files (see below)

## WhatsApp Feature

The WhatsApp feature lives in the `whatsapp-bot` folder and provides a lightweight bot using Baileys (a WhatsApp Web API library). The directory contains `index.js`, `package.json`, and an `auth_info_baileys/` folder with saved credentials.

High-level behavior:
- Maintains session state in `whatsapp-bot/auth_info_baileys/` so re-authentication is usually not required.
- `index.js` is the bot entry point that restores credentials and listens for messages/events.

Important files:
- `whatsapp-bot/index.js` ? bot entrypoint and main logic.
- `whatsapp-bot/package.json` ? Node dependencies and scripts.
- `whatsapp-bot/auth_info_baileys/` ? session files (keep private).

## Setup

Requirements
- Node.js (LTS recommended)

Install dependencies

```bash
cd whatsapp-bot
npm install
```

Start the bot

```bash
node index.js
# or, if package.json defines a start script:
npm start
```

## Gemini CLI

This project works well with the Gemini CLI. On Windows you can use the bundled `start.bat` to run the workspace interactively with Gemini.

Example `start.bat` contents:

```bat
gemini -i "Read the `SOUL.md` file and follow instructions"
```

First-time auth
- On first run, the bot will prompt to scan a QR code in the terminal (Baileys flow). After scanning, session files will be saved under `auth_info_baileys/`.

If you already have `auth_info_baileys/` files (this repo includes example/active files), the bot will restore the session automatically.

## Configuration

- Keep the contents of `whatsapp-bot/auth_info_baileys/` confidential ? they provide access to the WhatsApp session.
- If you need to reset the session, stop the bot and remove the relevant files in `auth_info_baileys/`; the bot will produce a new QR code on next start.

## Troubleshooting

- Bot doesn't connect: ensure Node.js is installed and internet is available.
- QR not accepted: remove stale auth files and re-run to re-authenticate.
- Check `whatsapp-bot/index.js` logs for errors and missing env vars.

## Security & Privacy

- Do not commit or publish `auth_info_baileys/` files to public repos. Treat them like credentials.
- Rotate sessions by re-authenticating on a new device if you suspect compromise.

## License

This repository does not include a license file. Add one if you plan to reuse or publish the code.

---

If you want, I can also:
- Add example `npm` scripts to `whatsapp-bot/package.json`.
- Add a minimal `README` inside `whatsapp-bot/` with more details.
