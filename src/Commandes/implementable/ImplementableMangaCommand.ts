import { ApplicationCommandOptionType, CommandInteraction } from 'discord.js';
import SlashOption from '../../utils/slashOption.js';
import {
  generateMagaViewerEmbeds,
  generateMangaViewerButtonBar,
  initializeMangaViewerInterractions,
} from '../../utils/mangaUtils.js';
import { ImplementableMangaCommandDetails } from '../../types/Command.js';
import AbstractCommand from '../AbstractCommand.js';
import TypeHelp from '../../entity/typeHelp.js';
import EventError from '../../errors/EventError.js';
import MangaService from '../../services/MangaService.js';
import injector from 'wire-dependency-injection';

export default class ImplementableMangaCommand extends AbstractCommand<ImplementableMangaCommandDetails> {
  public static readonly abstractId = 'abstract.manga';

  private mangaService?: MangaService = injector.autoWire(
    'mangaService',
    (b) => (this.mangaService = b)
  );

  public constructor(details: ImplementableMangaCommandDetails) {
    super({
      args: [
        new SlashOption(
          'chapitre',
          'Numéro du chapitre',
          ApplicationCommandOptionType.String,
          true
        ),
        new SlashOption('page', 'Numéro de la page'),
      ],
      slashInteraction: true,
      type: TypeHelp.ViewManga,
      ...details,
    });
  }

  public async run(commandInteraction: CommandInteraction) {
    await commandInteraction.deferReply();

    if (!commandInteraction.isChatInputCommand()) {
      throw new EventError(
        "cette action ne peut être effectuée qu'avec une commande"
      );
    }

    const mangaService = this.mangaService as MangaService;

    const chapter = await mangaService.fetchChapter({
      ...this.getDetails().options,
      chapterNumber: Number(commandInteraction.options.getString('chapitre')),
    });

    const embeds = await generateMagaViewerEmbeds(
      chapter,
      Number(commandInteraction.options.getString('page'))
    );

    const buttonBar = await generateMangaViewerButtonBar(embeds);

    await commandInteraction.followUp(buttonBar);

    await initializeMangaViewerInterractions(commandInteraction, embeds);
  }
}
