import { DMChannel, Message } from 'discord.js';
import AbstractMessageHandler, {
  MESSAGE_HANDLER_BEAN_TYPE,
} from './AbstractMessageHandler.js';
import injector from 'wire-dependency-injection';

export default class DiscordBotSpamHandler extends AbstractMessageHandler {
  static {
    injector.instance(this.name, this, {
      category: MESSAGE_HANDLER_BEAN_TYPE,
    });
  }

  private premierAvertissement: Array<String> = [];
  private secondAvertissement: Array<String> = [];
  private static temps: number = 300000;
  private static uneMinute = 60000;
  private static uneSemaine = 7 * 24 * 60 * 60 * 1000;

  private static unAvertissement: boolean = false;
  private static deuxAvertissement: boolean = false;

  public constructor() {
    super({
      id: 'DiscordBotSpam',
      regex: /(?=.*http)(?=.*@everyone)/is,
    });
  }

  public async run(message: Message) {
    const authorId = message.author.id;
    const author = message.author;
    const member = message.member;
    const channel = message.channel;
    const guild = message.guild;
    if (message.channel instanceof DMChannel) return;
    if (!member || !member.moderatable) return;
    message.delete();

    if (this.isPremierAvertissement(authorId)) {
      this.premierAvertissement.push(authorId);
      author.send(
        `AVERTISSEMENT n'envoie plus ce genre de message sous risque de mute.`
      );
      setTimeout(
        () =>
          this.premierAvertissement.splice(
            this.premierAvertissement.indexOf(authorId),
            1
          ),
        DiscordBotSpamHandler.temps
      );
    } else if (this.isDeuxiemeAvertissement(authorId)) {
      this.secondAvertissement.push(authorId);
      author.send(`Tu as été mute une minute pour suspicion de bot/hack.`);
      member?.timeout(DiscordBotSpamHandler.uneMinute, 'Suspicion de bot/hack');
      setTimeout(
        () =>
          this.secondAvertissement.splice(
            this.secondAvertissement.indexOf(authorId),
            1
          ),
        DiscordBotSpamHandler.temps
      );
    } else {
      author.send(
        `Tu as été mute de ${guild?.name} une semaine pour suspicion de bot/hack.`
      );
      channel.send(`<@${authorId}> a été mute pour suspicion de bot.`);
      member?.timeout(
        DiscordBotSpamHandler.uneSemaine,
        'Suspicion de bot/hack'
      );
    }
  }

  private isPremierAvertissement(authorId: string): boolean {
    return (
      (DiscordBotSpamHandler.unAvertissement ||
        DiscordBotSpamHandler.deuxAvertissement) &&
      !this.premierAvertissement.includes(authorId) &&
      !this.secondAvertissement.includes(authorId)
    );
  }

  private isDeuxiemeAvertissement(authorId: string): boolean {
    return (
      DiscordBotSpamHandler.deuxAvertissement &&
      !this.secondAvertissement.includes(authorId)
    );
  }
}
