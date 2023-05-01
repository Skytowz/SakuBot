/* eslint-disable @typescript-eslint/ban-ts-comment */
import TypeHelp from '../entity/typeHelp.js';
import SlashOption from '../utils/slashOption.js';
import {
  ApplicationCommandOptionType,
  CommandInteraction,
  Client,
} from 'discord.js';
import { send } from '../utils/mangaUtils.js';
import { CommandDeclaration, CommandRun } from './Command.js';
const language = [
  {
    name: 'anglais',
    value: 'en',
  },
  {
    name: 'français',
    value: 'fr',
  },
  {
    name: 'espagnol',
    value: 'es',
  },
  {
    name: 'bresilien',
    value: 'pt-br',
  },
  {
    name: 'italien',
    value: 'it',
  },
  {
    name: 'chinois',
    value: 'cn',
  },
  {
    name: 'russe',
    value: 'ru',
  },
  {
    name: 'japonais',
    value: 'jp',
  },
];
/**
 *
 * @param {Client} client
 * @param {CommandInteraction} interaction
 */
export const run: CommandRun = async (
  client: Client,
  interaction: CommandInteraction
) => {
  //@ts-ignore
  const url: string = interaction.options.getString('url');
  const id = url.match(/title\/([a-zA-Z0-9-]+)(\/?.*)/i)?.at(1);
  //@ts-ignore
  const langue = interaction.options.getString('langue');
  let langues;
  if (langue) {
    langues = [langue];
  } else {
    langues = language.map((e) => e.value);
  }
  if (id && url.match(/mangadex.org\/title/)) {
    send(
      interaction,
      //@ts-ignore
      interaction.options.getString('chapitre') ?? 1,
      //@ts-ignore
      interaction.options.getString('page'),
      { idChap: id, langue: langues }
    );
  } else {
    return interaction.reply({ content: 'Lien invalide', ephemeral: true });
  }
};

export const help: CommandDeclaration = {
  name: ['manga'],
  help: "Affiche n'importe quel manga de mangadex",
  type: TypeHelp.ViewManga,
  cmd: 'manga',
  args: [
    new SlashOption(
      'url',
      'Lien mangadex',
      ApplicationCommandOptionType.String,
      true
    ),
    new SlashOption('chapitre', 'Numéro du chapitre'),
    new SlashOption('page', 'Numéro de la page'),
    new SlashOption(
      'langue',
      'Langue',
      ApplicationCommandOptionType.String,
      false,
      language
    ),
  ],
  slash: true,
};
