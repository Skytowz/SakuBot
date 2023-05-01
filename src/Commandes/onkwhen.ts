import { Client, CommandInteraction } from 'discord.js';
import TypeHelp from '../entity/typeHelp.js';
import { getTimeLeft } from '../utils/dateUtils.js';
import { CommandDeclaration, CommandRun } from './Command.js';

export const run: CommandRun = async (
  client: Client,
  interaction: CommandInteraction
) => {
  const sortieOnk = new Date('2023-04-12T17:00:00');
  const now = new Date();

  const res = getTimeLeft(now, sortieOnk);
  await interaction.reply(
    !res
      ? "L'épisode 1 est déjà sorti !"
      : 'Il reste' + res + " avant la sortie de l'épisode!"
  );
};

export const help: CommandDeclaration = {
  name: ['onkwhen'],
  help:
    'Dis combien de temps il reste avant le début du 1er episode de Oshi no Ko',
  type: TypeHelp.Autre,
  cmd: 'onkwhen',
  slash: true,
};
