require('dotenv').config({ path: `${__dirname}/../.env` });
import { Config } from './config';
import { Bot } from './bot';
import { Fetcher } from './fetcher';
import { OfferService } from './offer.service';
import { SHA1 } from 'crypto-js';
import { delay } from './util/delay';

if (!Config.bot.telegramToken) {
  throw new Error('Bot token not configured');
}

const bot = new Bot(Config.bot.telegramToken);
const fetcher = new Fetcher();
const offerService = new OfferService();

const fetchInterval = setInterval(async () => {
  if (bot.initialized) {
    for (let attemptsLeft = Config.bot.maxFetchRetries; attemptsLeft >= 0; --attemptsLeft) {
      try {
        const offers = await fetcher.fetchObservables();
        for (const offer of offers) {
          if (!(await offerService.checkIfExists(SHA1(offer.title).toString()))) {
            await offerService.create(offer);
            await bot.sendOffer(offer);
            await delay(30000);
          } else {
            console.info('Offer already fetched. Skipping...')
          }
        }
        
        break;
      } catch (error) {
        console.error(error)
        if (attemptsLeft === 0) {
          if (Config.bot.debug) {
            bot.sendMessage('No attempts left!');
          }
          break;
        }

        if (Config.bot.debug) {
          bot.sendMessage(`Fetch failed. Retrying... Attempts left: ${attemptsLeft}`);
        }
      }
    }
  }
}, Config.bot.fetchInterval);

bot.launch();

process.once('SIGINT', () => {
  clearInterval(fetchInterval);
  offerService.closeConnection();
  bot.stop('SIGINT');
});

process.once('SIGTERM', () => {
  clearInterval(fetchInterval);
  offerService.closeConnection();
  bot.stop('SIGTERM');
});
