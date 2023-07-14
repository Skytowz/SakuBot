import { CommandInteraction } from 'discord.js';
import AbstractCommand, { COMMAND_BEAN_TYPE } from './AbstractCommand.js';
import TypeHelp from '../entity/typeHelp.js';
import {
  AudioPlayerStatus,
  DiscordGatewayAdapterCreator,
  joinVoiceChannel,
} from '@discordjs/voice';
import { AppInstances } from '../types/AppInstances.js';
import EventError from '../errors/EventError.js';
import CommandInteractionService from '../services/CommandInteractionService.js';
import ResourcesService from '../services/ResourcesService.js';
import injector from 'wire-dependency-injection';
import SauceCommand from './SauceCommand.js';
import SaucenaoService from '../services/SaucenaoService.js';

export default class VocalquitCommand extends AbstractCommand {
  private available = true;

  private commandInteractionService?: CommandInteractionService = injector.autoWire(
    'commandInteractionService',
    (b) => (this.commandInteractionService = b)
  );
  private resourcesService?: ResourcesService = injector.autoWire(
    'resourcesService',
    (b) => (this.resourcesService = b)
  );

  public constructor() {
    super({
      id: 'quit',
      name: ['quit'],
      description: 'Quitter le vocal de manière stylé',
      type: TypeHelp.Autre,
      slashInteraction: true,
    });
  }

  public async run(commandInteraction: CommandInteraction) {
    await commandInteraction.deferReply({
      ephemeral: true,
    });

    if (!this.available) {
      throw new EventError('Une déco est déjà en cours');
    }

    const commandInteractionService = this
      .commandInteractionService as CommandInteractionService;

    const guildMember = await commandInteractionService.checkDiscordGuildMember(
      commandInteraction
    );

    const channelId = guildMember.voice.channelId;
    if (!channelId) {
      throw new EventError("Vous n'êtes pas dans un channel vocal");
    }

    const connection = joinVoiceChannel({
      channelId: channelId,
      guildId: guildMember.guild.id,
      adapterCreator: (guildMember.guild
        .voiceAdapterCreator as unknown) as DiscordGatewayAdapterCreator,
    });

    const resourcesService = this.resourcesService as ResourcesService;

    const player = resourcesService.playAudioResource(
      connection,
      './ressources/outro.mp3'
    );

    player.on(AudioPlayerStatus.Idle, () => {
      connection.disconnect();
    });

    this.available = false;
    setTimeout(async () => {
      this.available = true;
      try {
        await guildMember.voice.disconnect();
      } catch (e) {
        throw new EventError(
          "Une erreur est survenue et nous n'avons pas pu vous déconnecter"
        );
      }
      await commandInteraction.editReply({
        content: 'Disconnected',
      });
    }, 15500);
  }
}

injector.registerBean('vocalquitCommand', VocalquitCommand, COMMAND_BEAN_TYPE);
