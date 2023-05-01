/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  ApplicationCommandOptionType,
  Client,
  CommandInteraction,
} from 'discord.js';
import TypeHelp from '../entity/typeHelp.js';
import SlashOption from '../utils/slashOption.js';
import { CommandDeclaration, CommandRun } from './Command.js';

/**
 *
 * @param {*} client
 * @param {CommandInteraction} interaction
 */
export const run: CommandRun = async (
  client: Client,
  interaction: CommandInteraction
) => {
  if (
    !['452186417334976532', '273756946308530176'].includes(
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
  const nombre = interaction.options.getInteger('nombre');
  interaction.channel
    //@ts-ignore
    ?.bulkDelete(nombre)
    .then(() =>
      interaction.reply({
        content: 'Les messages ont bien été supprimé',
        ephemeral: true,
      })
    )
    .catch(() =>
      interaction.reply({ content: 'Une erreur est survenu', ephemeral: true })
    );
};

export const help: CommandDeclaration = {
  name: ['clear'],
  help: 'Clear un certain nombre de message',
  type: TypeHelp.Utils,
  cmd: 'clear <nb-msg>',
  args: [
    new SlashOption(
      'nombre',
      'Nombre de message à supprimer',
      ApplicationCommandOptionType.Integer,
      true
    ),
  ],
  slash: true,
};
