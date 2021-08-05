# Apartment Seeker

A telegram bot searching for new flat rent offerts on OLX and OtoDom.

## 💡 Features

* Searching for new offers on [OLX](https://www.olx.pl/) and [OtoDom](https://www.otodom.pl/)
* Informing about new offers on your Telegram group chat
* Faking User-Agent for masking
* Rotating proxy
* Uses Telegraf, Axios, Cheerio and SQLite

## 📖 How to use

1. Instal all dependencies with `npm install`
2. Copy the contents of .env.example to .env and set all parameters.
3. Build the project using `npm run build`
4. Run the production code `npm run start`

## ⚙️ Config

| **.env field** | Description | Default |
|----------------|-------------|---------|
| TELEGRAM_BOT_TOKEN | Your bots token to the Telegram API | None |
| FETCH_INTERVAL | Offer refresh interval | 900000 |
| MAX_FETCH_RETRIES | Max request retry count | 3 |
| DEBUG | Enable debug mode (the bot will send message when it fails to fetch offers) | true |
| PROXY_LIST | Base64 encoded list of proxies (it's used when data/proxy-list.json does not exist) | None |
| OBSERVABLES_LIST | Base64 encoded list of observable links (it's used when data/proxy-list.json does not exist) | None |

---

Copyright &copy; 2021 Daniel Budziński