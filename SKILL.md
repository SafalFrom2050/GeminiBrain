# Skills Bank

A repository of automated tasks and scripts for efficient retrieval.

---

## Skill: WhatsApp Bot (Baileys)
- **Description:** Basic WhatsApp automation using Baileys library.
- **Tools:** Node.js, @whiskeysockets/baileys, qrcode-terminal
- **Usage:** Go to `whatsapp-bot` folder and run `node index.js`. Scan QR code to connect.

## Skill: RSS News Fetcher
- **Description:** Fetches and summarizes headlines from an RSS feed.
- **Tools:** Python (requests, xml.etree.ElementTree)
- **Usage:** Run `fetch_rss.py <rss_url>` or use default BBC News feed.

## Skill: Japan News Fetcher
- **Description:** Fetches English news specifically from Japanese sources like Japan Times.
- **Tools:** Python (requests with User-Agent, xml.etree.ElementTree)
- **Usage:** Run `python fetch_rss.py https://www.japantimes.co.jp/feed`

## Skill: System Profiler
- **Description:** Gathers system information (OS, User, Timezone, etc.) without admin privileges.
- **Tools:** Python (os, socket, platform, datetime, time)
- **Usage:** Run `sys_info.py`
