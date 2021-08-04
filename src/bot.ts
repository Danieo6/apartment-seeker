import { Telegraf } from 'telegraf';
import { Chat, Message } from 'telegraf/typings/core/types/typegram';
import { Offer } from './interfaces/offer.interface';

export class Bot extends Telegraf {
  private chatId: number;

  constructor(token: string) {
    super(token);
    this.chatId = 0;

    this.command('initialize', (ctx) => {
      if (!this.chatId) {
        const chat = ctx.update.message.chat as Chat.GroupChat;
        ctx.reply('Initializing...');
        this.chatId = chat.id;
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