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
    if (this.enCours) {
      await commandInteraction.reply({
        content: 'Une déco est déjà en cours',
        ephemeral: true,
      });
      return;
    }

    const guildMember = ((await commandInteraction.guild?.members.fetch({
      user: commandInteraction.member?.user.id,
    })) as unknown) as GuildMember;
    if (!guildMember) {
      return;
    }

    const channelId = guildMember.voice.channelId;
    if (!channelId) {
      await commandInteraction.reply({
        content: "Vous n'êtes pas dans un channel vocal",
        ephemeral: true,
      });
      return;
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

    await commandInteraction.deferReply({
      ephemeral: true,
    });

    this.enCours = true;
    setTimeout(() => {
      this.enCours = false;
      guildMember.voice.disconnect();
      commandInteraction.editReply({
        content: 'Disconnected',
      });
    }, 15500);
  }
}
