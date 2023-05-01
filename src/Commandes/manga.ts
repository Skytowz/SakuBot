/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  ApplicationCommandOptionType,
  Client,
  CommandInteraction,
} from 'discord.js';
import { send } from '../utils/mangaUtils.js';
import SlashOption from '../utils/slashOption.js';
import mangas from './manga.data.js';

export const run = async (client: Client, interaction: CommandInteraction) => {
  const manga = Object.values(mangas).find((manga) =>
    manga.name.includes(interaction.commandName)
  );
  send(
    interaction,
    //FIXME
    //@ts-ignore
    interaction.options.getString('chapitre'),
    //FIXME
    //@ts-ignore
    interaction.options.getString('page'),
    //FIXME
    //@ts-ignore
    manga
  );
};
export const help = {
  noHelp: true,
  args: [
    new SlashOption(
      'chapitre',
      'Numéro du chapitre',
      ApplicationCommandOptionType.String,
      true
    ),
    new SlashOption('page', 'Numéro de la page'),
  ],
  slash: true,
};
