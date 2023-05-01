import { Client } from 'undici';
import TypeHelp from '../entity/typeHelp.js';
import SlashOption from '../utils/slashOption.js';
import { CommandInteraction } from 'discord.js';

export const run = async (client: Client, interaction: CommandInteraction) => {
  interaction.reply(
    "Cette commande n'est plus disponible pour le moment du à un changement de version de plugin"
  );
};

export const help = {
  name: 'reco',
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
