/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ApplicationCommandOptionType, CommandInteraction } from 'discord.js';
import AbstractCommand, { COMMAND_BEAN_TYPE } from './AbstractCommand.js';
import TypeHelp from '../entity/typeHelp.js';
import SlashOption from '../utils/slashOption.js';
import EventError from '../errors/EventError.js';
import MangaService from '../services/MangaService.js';
import injector from 'wire-dependency-injection';
import {
  generateMagaViewerEmbeds,
  generateMangaViewerButtonBar,
  initializeMangaViewerInterractions,
} from '../utils/mangaUtils.js';

const MANGAS = [
  {
    name: 'Frieren',
    value: 'Sousou-no-Frieren',
  },
  {
    name: 'HDWR',
    value: 'How-Do-We-Relationship',
  },
  {
    name: 'Kaoru Hana',
    value: 'Kaoru-Hana-wa-Rin-to-Saku',
  },
  {
    name: 'Mayonaka Heart Tunes',
    value: 'Tune-In-to-the-Midnight-Heart',
  },
];

export default class MangaseeCommand extends AbstractCommand {
  static {
    injector.instance(this.name, this, {
      category: COMMAND_BEAN_TYPE,
      wiring: [MangaService.name],
    });
  }

  public constructor(private mangaService: MangaService) {
    super({
      id: 'mangasee',
      name: ['mangasee'],
      description:
        "Affiche un des mangas de mangasee (@skytowz pour en demander d'autre)",
      type: TypeHelp.ViewManga,
      args: [
        new SlashOption(
          'manga',
          'Nom du manga',
          ApplicationCommandOptionType.String,
          true,
          MANGAS
        ),
        new SlashOption(
          'chapitre',
          'Numéro du chapitre',
          ApplicationCommandOptionType.Number
        ),
        new SlashOption(
          'page',
          'Numéro de la page',
          ApplicationCommandOptionType.Integer
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

    const manga = commandInteraction.options.getString('manga') as string;

    const chapterNumber = commandInteraction.options.getNumber('chapitre') ?? 1;
    const pageNumber = commandInteraction.options.getInteger('page') ?? 1;

    let embeds;
    try {
      const chapter = await this.mangaService.fetchChapter({
        research: manga,
        chapterNumber: chapterNumber,
        mangasee: true,
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
