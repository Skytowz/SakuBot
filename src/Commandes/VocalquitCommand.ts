/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CacheType, CommandInteraction } from 'discord.js';
import AbstractCommand from './AbstractCommand.js';
import TypeHelp from '../entity/typeHelp.js';
import {
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
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
    if (this.enCours)
      return commandInteraction.reply({
        content: 'Une déco est déjà en cours',
        ephemeral: true,
      });

    //@ts-ignore
    const channelId: string = commandInteraction.member?.voice.channelId;
    if (!channelId) {
      return commandInteraction.reply({
        content: "Vous n'êtes pas dans un channel vocal",
        ephemeral: true,
      });
    }

    const connection = joinVoiceChannel({
      channelId: channelId,
      //@ts-ignore
      guildId: commandInteraction.member?.voice.guild.id as string,
      //@ts-ignore
      adapterCreator: commandInteraction.member?.guild.voiceAdapterCreator,
    });

    const player = createAudioPlayer({
      behaviors: {
        noSubscriber: NoSubscriberBehavior.Pause,
      },
    });

    const ressource = createAudioResource('./Ressources/outro.mp3');

    player.play(ressource);

    connection.subscribe(player);

    player.on(AudioPlayerStatus.Idle, () => {
      connection.disconnect();
    });

    this.enCours = true;
    setTimeout(() => {
      //@ts-ignore
      commandInteraction.member?.voice.disconnect();
      this.enCours = false;
    }, 15500);
    commandInteraction.reply({ content: 'Disconnected', ephemeral: true });
  }
}
