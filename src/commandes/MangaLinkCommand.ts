/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ApplicationCommandOptionType, CommandInteraction } from 'discord.js';
import AbstractCommand, { COMMAND_BEAN_TYPE } from './AbstractCommand.js';
import TypeHelp from '../entity/typeHelp.js';
import SlashOption from '../utils/slashOption.js';
import {
  generateMagaViewerEmbeds,
  generateMangaViewerButtonBar,
  initializeMangaViewerInterractions,
} from '../utils/mangaUtils.js';
import { parseUrlPath, stringToURL } from '../utils/urlUtils.js';
import EventError from '../errors/EventError.js';
import MangaService from '../services/MangaService.js';
import injector from 'wire-dependency-injection';

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
  static {
    injector.instance(this.name, this, {
      category: COMMAND_BEAN_TYPE,
      wiring: [MangaService.name],
    });
  }

  public constructor(private mangaService: MangaService) {
    super({
      id: 'mangadex',
      name: ['manga'],
      description: "Affiche n'importe quel manga de mangadex",
      type: TypeHelp.ViewManga,
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
      slashInteraction: true,
    });
  }

  public async run(commandInteraction: CommandInteraction) {
    await commandInteraction.deferReply();

    if (!commandInteraction.isChatInputCommand()) {
      throw new EventError(
        "cette action ne peut être effectuée qu'avec une commande"
      );
    }

    const url = stringToURL(
      commandInteraction.options.getString('url') as string
    );
    const language = commandInteraction.options.getString('langue');
    const languages = language
      ? [language]
      : Object.values(LANGUAGES).map((lang) => lang.value);
    const chapterNumber =
      commandInteraction.options.getInteger('chapitre') ?? 1;
    const pageNumber = commandInteraction.options.getInteger('page') ?? 1;

    let id;
    if (!url || url.host !== 'mangadex.org' || !(id = parseUrlPath(url)[1])) {
      throw new EventError('lien invalide');
    }

    let embeds;
    try {
      const chapter = await this.mangaService.fetchChapter({
        chapterNumber: chapterNumber,
        research: id,
        languages: languages,
      });
      embeds = await generateMagaViewerEmbeds(chapter, pageNumber);
    } catch (e) {
      this.getLogger().debug("une erreur s'est produite");
      this.getLogger().debug(e);
      throw new EventError('chapitre invalide');
    }

    const buttonBar = await generateMangaViewerButtonBar(embeds);

    await commandInteraction.followUp(buttonBar);

    await initializeMangaViewerInterractions(commandInteraction, embeds);
  }
}
