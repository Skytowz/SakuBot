/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  createAudioPlayer,
  NoSubscriberBehavior,
  createAudioResource,
  joinVoiceChannel,
  AudioPlayerStatus,
} from '@discordjs/voice';
import TypeHelp from '../entity/typeHelp.js';
import { Client, CommandInteraction } from 'discord.js';
import { CommandDeclaration, CommandRun } from './Command.js';

let enCours = false;

export const run: CommandRun = async (
  client: Client,
  interaction: CommandInteraction
) => {
  if (enCours)
    return interaction.reply({
      content: 'Une déco est déjà en cours',
      ephemeral: true,
    });

  //@ts-ignore
  const channelId: string = interaction.member?.voice.channelId;
  if (!channelId) {
    return interaction.reply({
      content: "Vous n'êtes pas dans un channel vocal",
      ephemeral: true,
    });
  }

  const connection = joinVoiceChannel({
    channelId: channelId,
    //@ts-ignore
    guildId: interaction.member?.voice.guild.id as string,
    //@ts-ignore
    adapterCreator: interaction.member?.guild.voiceAdapterCreator,
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

  enCours = true;
  setTimeout(() => {
    //@ts-ignore
    interaction.member?.voice.disconnect();
    enCours = false;
  }, 15500);
  interaction.reply({ content: 'Disconnected', ephemeral: true });
};

export const help: CommandDeclaration = {
  name: ['quit'],
  help: 'Quitter le vocal de manière stylé',
  type: TypeHelp.Autre,
  cmd: 'quit',
  slash: true,
};
