import { CacheType, CommandInteraction, GuildMember } from 'discord.js';
import AbstractCommand from './AbstractCommand.js';
import TypeHelp from '../entity/typeHelp.js';
import {
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
  DiscordGatewayAdapterCreator,
  joinVoiceChannel,
  NoSubscriberBehavior,
} from '@discordjs/voice';
import { AppInstances } from '../AppInstances.js';
import EventError from '../errors/EventError.js';

export default class VocalquitCommand extends AbstractCommand {
  private enCours = false;

  public constructor(appInstances: AppInstances) {
    super(appInstances, {
      name: ['quit'],
      help: 'Quitter le vocal de manière stylé',
      type: TypeHelp.Autre,
      cmd: 'quit',
      slash: true,
    });
  }

  public async run(commandInteraction: CommandInteraction<CacheType>) {
    await commandInteraction.deferReply({
      ephemeral: true,
    });

    if (this.enCours) {
      throw new EventError('Une déco est déjà en cours');
    }

    const guildMember = ((await commandInteraction.guild?.members.fetch({
      user: commandInteraction.member?.user.id,
    })) as unknown) as GuildMember;
    if (!guildMember) {
      throw new EventError('Nous ne parvenons pas à vous trouver');
    }

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

    const player = createAudioPlayer({
      behaviors: {
        noSubscriber: NoSubscriberBehavior.Pause,
      },
    });

    const ressource = createAudioResource('./ressources/outro.mp3');

    player.play(ressource);

    connection.subscribe(player);

    player.on(AudioPlayerStatus.Idle, () => {
      connection.disconnect();
    });

    this.enCours = true;
    setTimeout(async () => {
      this.enCours = false;
      try {
        await guildMember.voice.disconnect();
      } catch (e) {
        /* empty */
      }
      await commandInteraction.editReply({
        content: 'Disconnected',
      });
    }, 15500);
  }
}
