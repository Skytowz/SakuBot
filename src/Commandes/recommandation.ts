import TypeHelp from '../entity/typeHelp.js';
import SlashOption from '../utils/slashOption.js';
import { Client, CommandInteraction } from 'discord.js';
import { CommandDeclaration, CommandRun } from './Command.js';

export const run: CommandRun = async (
  client: Client,
  interaction: CommandInteraction
) => {
  interaction.reply(
    "Cette commande n'est plus disponible pour le moment du à un changement de version de plugin"
  );
};

export const help: CommandDeclaration = {
  name: ['reco'],
  help: 'Recommande un manga/anime',
  type: TypeHelp.Utils,
  cmd: 'reco <link-nautiljon>',
  args: [
    new SlashOption()
      .setName('lien')
      .setDescription('Lien de la page nautiljon')
      .setRequired(true),
  ],
  slash: true,
};
