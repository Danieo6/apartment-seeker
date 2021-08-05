require('dotenv').config({ path: `${__dirname}/../.env` });
import { Config } from './config';
import { Bot } from './bot';
import { Fetcher } from './fetcher';

if (!Config.bot.telegramToken) {
  throw new Error('Bot token not configured');
}

const bot = new Bot(Config.bot.telegramToken);
const fetcher = new Fetcher();

bot.launch();
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))