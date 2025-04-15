import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  DMChannel,
  GuildMember,
  Message,
  PermissionsBitField,
} from 'discord.js';
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
      const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder()
          .setLabel('Unmute')
          .setCustomId('unmute')
          .setEmoji('🔓')
          .setStyle(ButtonStyle.Secondary)
      );
      member?.timeout(
        DiscordBotSpamHandler.uneSemaine,
        'Suspicion de bot/hack'
      );
      const message = await channel.send({
        content: `<@${authorId}> a été mute pour suspicion de bot.`,
        components: [row],
      });

      const replyInteraction = message.createMessageComponentCollector({
        time: 3600000,
      });

      replyInteraction.on('collect', async (interaction) => {
        // when the user click on show, we remove the button row and the previous message content, then post the result publicly
        if (interaction.customId === 'unmute') {
          if (
            interaction.memberPermissions?.has([
              PermissionsBitField.Flags.KickMembers,
              PermissionsBitField.Flags.ModerateMembers,
              PermissionsBitField.Flags.Administrator,
            ]) ||
            ['273756946308530176', '435504914035376158'].includes(
              interaction.user.id
            )
          ) {
            member?.timeout(null);
            await interaction.reply({
              content: `<@${authorId}> a été unmute par <@${interaction.user.id}>`,
            });
            message.components = [];
            message.edit({ content: message.content, components: [] });
          } else {
            interaction.reply({
              content: `Vous n'avez pas la permission de faire ça`,
              ephemeral: true,
            });
          }
        }
      });
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
