export const bot = {
  telegramToken: <string>process.env.TELEGRAM_BOT_TOKEN,
  fetchInterval: +process.env.FETCH_INTERVAL! || 15000,
};