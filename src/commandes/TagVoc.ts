import { CommandInteraction } from 'discord.js';
import AbstractCommand, { COMMAND_BEAN_TYPE } from './AbstractCommand.js';
import TypeHelp from '../entity/typeHelp.js';
import CommandInteractionService from '../services/CommandInteractionService.js';
import injector from 'wire-dependency-injection';

export default class TagVocCommand extends AbstractCommand {
  static {
    injector.instance(this.name, this, {
      category: COMMAND_BEAN_TYPE,
      wiring: [CommandInteractionService.name],
    });
  }

  public constructor(
    private commandInteractionService: CommandInteractionService
  ) {
    super({
      id: 'tagvoc',
      name: ['tagvoc'],
      description: 'Tag toutes les personnes du vocal dans lequel vous êtes',
      type: TypeHelp.Autre,
      slashInteraction: true,
    });
  }

  public async run(commandInteraction: CommandInteraction) {
    const guildMember =
      await this.commandInteractionService.checkDiscordGuildMember(
        commandInteraction
      );

    const channelId = guildMember.voice.channelId;
    if (!channelId) {
      await commandInteraction.reply({
        content: `Vous n'êtes pas dans un channel vocal`,
        ephemeral: true,
      });
      return;
    }

    const members = guildMember.voice.channel?.members;
    if (!members) {
      await commandInteraction.reply({
        content: `Il n'y a pas d'user dans le channel`,
        ephemeral: true,
      });
      return;
    }
    const message = members
      .filter((e) => e.id != commandInteraction.user.id)
      .map((e) => `<@${e.id}>`)
      .join(' ');
    if (!message) {
      await commandInteraction.reply({
        content: `Vous n'avez malheureusement pas d'ami`,
        ephemeral: true,
      });
      return;
    }
    await commandInteraction.reply(message);
  }
}
