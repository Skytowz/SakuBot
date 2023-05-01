/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Client, CommandInteraction } from 'discord.js';
import TypeHelp from '../entity/typeHelp.js';
import { config } from 'dotenv';
config();

const idMsg =
  process.env.ENV == 'DEV' ? '1019290546088460289' : '1019293176516841472';

export const run = async (client: Client, interaction: CommandInteraction) => {
  if (
    ![
      '904895756073336873',
      '273756946308530176',
      '1020030218154557611',
      '1022927961613148190',
      //FIXME
      //@ts-ignore
    ].includes(interaction.member?.id)
  )
    return interaction.reply({
      content: 'Tu ne peux pas utiliser cette commande',
      ephemeral: true,
    });
  const ayahito = await client.users.fetch('904895756073336873');
  const dm = await ayahito.createDM();
  const msg = await dm.messages.fetch(idMsg);
  const chiffre = parseInt(msg.content) + 1;
  await interaction.reply('o'.repeat(chiffre));
  msg.edit('' + chiffre);
};

export const help = {
  name: ['ayahitoo', 'aya'],
  help: 'Commande speciale pour Ayahitoo',
  type: TypeHelp.Autre,
  cmd: 'cmd',
  slash: true,
};
