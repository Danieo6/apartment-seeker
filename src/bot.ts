import { Telegraf } from 'telegraf';
import { Chat, Message } from 'telegraf/typings/core/types/typegram';
import { Offer } from './interfaces/offer.interface';

export class Bot extends Telegraf {
  private chatId: number;
  public initialized = false;

  constructor(token: string) {
    super(token);
    this.chatId = 0;
    console.info('Bot ready. Initialize it by writing /initialize on your chat.');

    this.command('initialize', (ctx) => {
      if (!this.chatId) {
        const chat = ctx.update.message.chat as Chat.GroupChat;
        this.chatId = chat.id;
        this.initialized = true;
        console.info('Bot initialized!');
        ctx.reply(`Initialized for chat ${chat.title}`);
      } else {
        ctx.reply('This bot is already initialized on a different chat!');
      }
    });
  }

  async sendMessage(msg: string): Promise<Message.TextMessage> {
    return this.telegram.sendMessage(this.chatId, msg);
  }

  async sendOffer(offer: Offer): Promise<Message.PhotoMessage> {
    return this.telegram.sendPhoto(this.chatId,
    offer.imageUrl,
    {
      caption: `📝 ${offer.title}\n\n🌍 ${offer.localization}\n\n🔗 ${offer.url}\n\n💰 ${offer.price}`,
    });
  }
}