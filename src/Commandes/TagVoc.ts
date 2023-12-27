import { CommandInteraction } from 'discord.js';
import AbstractCommand, { COMMAND_BEAN_TYPE } from './AbstractCommand.js';
import TypeHelp from '../entity/typeHelp.js';
import {
  AudioPlayerStatus,
  DiscordGatewayAdapterCreator,
  joinVoiceChannel,
} from '@discordjs/voice';
import EventError from '../errors/EventError.js';
import CommandInteractionService from '../services/CommandInteractionService.js';
import ResourcesService from '../services/ResourcesService.js';
import injector from 'wire-dependency-injection';

export default class TagVocCommand extends AbstractCommand {
  private commandInteractionService: CommandInteractionService = injector.autoWire(
    CommandInteractionService,
    (b) => (this.commandInteractionService = b)
  );

  public constructor() {
    super({
      id: 'tagvoc',
      name: ['tagvoc'],
      description: 'Tag toutes les personnes du vocal dans lequel vous êtes',
      type: TypeHelp.Autre,
      slashInteraction: true,
    });
  }

  public async run(commandInteraction: CommandInteraction) {
    const commandInteractionService = this
      .commandInteractionService as CommandInteractionService;

    const guildMember = await commandInteractionService.checkDiscordGuildMember(
      commandInteraction
    );

    const channelId = guildMember.voice.channelId;
    if (!channelId) {
      commandInteraction.reply({
        content: `Vous n'êtes pas dans un channel vocal`,
        ephemeral: true,
      });
      return;
    }

    const members = guildMember.voice.channel?.members;
    if (!members) {
      commandInteraction.reply({
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
      commandInteraction.reply({
        content: `Vous n'avez malheureusement pas d'ami`,
        ephemeral: true,
      });
      return;
    }
    commandInteraction.reply(message);
  }
}

injector.registerBean(TagVocCommand, {
  type: COMMAND_BEAN_TYPE,
});
