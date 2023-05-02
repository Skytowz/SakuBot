/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  CommandInteraction,
  CacheType,
  Client,
  ApplicationCommandOptionType,
} from 'discord.js';
import AbstractCommand from './AbstractCommand.js';
import TypeHelp from '../entity/typeHelp.js';
import SlashOption from '../utils/slashOption.js';
import { send } from '../utils/mangaUtils.js';

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

export default class MangaLinkCommand extends AbstractCommand {
  public constructor(client: Client) {
    super(client, {
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

  public async run(commandInteraction: CommandInteraction<CacheType>) {
    //@ts-ignore
    const url: string = commandInteraction.options.getString('url');
    const id = url.match(/title\/([a-zA-Z0-9-]+)(\/?.*)/i)?.at(1);
    //@ts-ignore
    const langue = commandInteraction.options.getString('langue');
    let langues;
    if (langue) {
      langues = [langue];
    } else {
      langues = LANGUAGES.map((e) => e.value);
    }

    if (id && url.match(/mangadex.org\/title/)) {
      send(
        commandInteraction,
        //@ts-ignore
        commandInteraction.options.getString('chapitre') ?? 1,
        //@ts-ignore
        commandInteraction.options.getString('page'),
        //@ts-ignore
        { research: id, langue: langues }
      );
    } else {
      return commandInteraction.reply({
        content: 'Lien invalide',
        ephemeral: true,
      });
    }
  }
}
