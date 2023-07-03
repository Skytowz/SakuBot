/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ApplicationCommandOptionType, CommandInteraction } from 'discord.js';
import AbstractCommand from './AbstractCommand.js';
import TypeHelp from '../entity/typeHelp.js';
import SlashOption from '../utils/slashOption.js';
import {
  generateMagaViewerEmbeds,
  generateMangaViewerButtonBar,
  initializeMangaViewerInterractions,
} from '../utils/mangaUtils.js';
import { AppInstances } from '../types/AppInstances.js';
import { parseUrlPath, stringToURL } from '../utils/urlUtils.js';
import EventError from '../errors/EventError.js';
import MangaService from '../services/MangaService.js';

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
      const mangaService = this.getAppInstances().serviceManager.getService(
        MangaService
      ) as MangaService;
      const chapter = await mangaService.fetchChapter({
        chapterNumber: chapterNumber,
        research: id,
        languages: languages,
      });
      embeds = await generateMagaViewerEmbeds(chapter, pageNumber);
    } catch (e) {
      this.getAppInstances().logger.debug("une erreur s'est produite");
      this.getAppInstances().logger.debug(e);
      throw new EventError('chapitre invalide');
    }

    const buttonBar = await generateMangaViewerButtonBar(embeds);

    await commandInteraction.followUp(buttonBar);

    await initializeMangaViewerInterractions(commandInteraction, embeds);
  }
}
