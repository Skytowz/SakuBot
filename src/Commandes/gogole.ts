/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Client, CommandInteraction } from 'discord.js';
import TypeHelp from '../entity/typeHelp.js';
import { CommandDeclaration, CommandRun } from './Command.js';
import { sample } from '../utils/arrayUtils.js';

const quote = [
  'https://media.discordapp.net/attachments/991333308988395670/991448778395631726/IMG_20220402_184149.jpg',
  'https://media.discordapp.net/attachments/991333308988395670/991448778789888090/IMG_20220311_214535.jpg',
  'https://media.discordapp.net/attachments/991333308988395670/991449285809942628/20210629_225506.jpg',
  'https://media.discordapp.net/attachments/991333308988395670/991449449677209701/20211229_181714.jpg',
  'https://media.discordapp.net/attachments/991333308988395670/991449286212599949/20201111_211421.jpg',
  'https://media.discordapp.net/attachments/991333308988395670/991449449073217726/IMG_0398.jpg',
  'https://media.discordapp.net/attachments/991333308988395670/992525237407191102/IMG_20220421_002513.jpg',
];

export const run: CommandRun = async (
  client: Client,
  interaction: CommandInteraction
) => {
  if (
    !['713837802638278749', '273756946308530176'].includes(
      //@ts-ignore
      interaction.member?.id
    )
  )
    return interaction.reply({
      content: 'Tu ne peux pas utiliser cette commande',
      ephemeral: true,
    });
  //FIXME
  //@ts-ignore
  await interaction.reply({ files: [sample(quote)] });
};

export const help: CommandDeclaration = {
  name: ['gogole'],
  help: 'Commande gogole',
  cmd: 'gogole',
  type: TypeHelp.Autre,
  slash: true,
};
