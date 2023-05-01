/* eslint-disable @typescript-eslint/ban-ts-comment */
import TypeHelp from '../entity/typeHelp.js';
import SlashOption from '../utils/slashOption.js';
import {
  ApplicationCommandOptionType,
  Client,
  CommandInteraction,
} from 'discord.js';
import { send } from '../utils/mangaUtils.js';

/**
 *
 * @param {Client} client
 * @param {CommandInteraction} interaction
 */
export const run = async (client: Client, interaction: CommandInteraction) => {
  //FIXME
  //@ts-ignore
  const url = interaction.options.getString('url');
  const id = url.match(/chapter\/([a-zA-Z0-9-]+)(\/?.*)/i)?.at(1);
  if (id && url.match(/mangadex.org\/chapter/)) {
    //FIXME
    //@ts-ignore
    send(interaction, null, interaction.options.getString('page'), {
      idChap: id,
    });
  } else {
    return interaction.reply({ content: 'Lien invalide', ephemeral: true });
  }
};

export const help = {
  name: ['chapter'],
  help: "Affiche n'importe quel chapitre de mangadex",
  type: TypeHelp.ViewManga,
  cmd: 'manga',
  args: [
    new SlashOption(
      'url',
      'Lien mangadex',
      ApplicationCommandOptionType.String,
      true
    ),
    new SlashOption('page', 'Numéro de la page'),
  ],
  slash: true,
};
