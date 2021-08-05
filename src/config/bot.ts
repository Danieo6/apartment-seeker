export const bot = {
  telegramToken: <string>process.env.TELEGRAM_BOT_TOKEN,
  fetchInterval: +process.env.FETCH_INTERVAL! || 900000,
  maxFetchRetries: +process.env.MAX_FETCH_RETRIES! || 3,
  debug: process.env.DEBUG === 'true' || true,
};