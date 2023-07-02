/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ApplicationCommandOptionType, CommandInteraction } from 'discord.js';
import AbstractCommand from './AbstractCommand.js';
import TypeHelp from '../entity/typeHelp.js';
import SlashOption from '../utils/slashOption.js';
import { send } from '../utils/mangaUtils.js';
import { AppInstances } from '../AppInstances.js';
import { parseUrlPath, stringToURL } from '../utils/urlUtils.js';

const LANGUAGES = [
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
    name: 'brésilien',
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

export default class MangaLinkCommand extends AbstractCommand {
  public constructor(appInstances: AppInstances) {
    super(appInstances, {
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
          LANGUAGES
        ),
      ],
      slash: true,
    });
  }

  public async run(commandInteraction: CommandInteraction) {
    //@ts-ignore
    const url = stringToURL(commandInteraction.options.getString('url'));
    //@ts-ignore
    const language = commandInteraction.options.getString('langue');
    const languages = language
      ? [language]
      : Object.values(LANGUAGES).map((lang) => lang.value);
    // @ts-ignore
    const chapter = commandInteraction.options.getString('chapitre') ?? 1;
    // @ts-ignore
    const page = commandInteraction.options.getString('page');

    let id;
    if (!url || url.host !== 'mangadex.org' || !(id = parseUrlPath(url)[1])) {
      await commandInteraction.reply({
        content: 'Lien invalide',
        ephemeral: true,
      });
      return;
    }

    await send(commandInteraction, chapter, page, {
      research: id,
      langue: languages,
    });
  }
}
