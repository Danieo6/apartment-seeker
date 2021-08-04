require('dotenv').config({ path: `${__dirname}/../.env` });
import { Bot } from './bot';

if (!process.env.TELEGRAM_BOT_TOKEN) {
  throw new Error('Bot token not configured');
}

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);

bot.launch();
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))