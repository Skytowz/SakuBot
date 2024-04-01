import { ApplicationCommandOptionType, CommandInteraction } from 'discord.js';
import AbstractCommand, { COMMAND_BEAN_TYPE } from './AbstractCommand.js';
import TypeHelp from '../entity/typeHelp.js';
import SlashOption from '../utils/slashOption.js';
import {
  generateMagaViewerEmbeds,
  generateMangaViewerButtonBar,
  initializeMangaViewerInterractions,
} from '../utils/mangaUtils.js';
import EventError from '../errors/EventError.js';
import MangaService from '../services/MangaService.js';
import injector from 'wire-dependency-injection';

export default class ChapterLinkCommand extends AbstractCommand {
  static {
    injector.instance(this.name, this, {
      category: COMMAND_BEAN_TYPE,
      wiring: [MangaService.name],
    });
  }

  public constructor(private mangaService: MangaService) {
    super({
      id: 'chapter',
      name: ['chapter'],
      description: "Affiche n'importe quel chapitre de mangadex",
      type: TypeHelp.ViewManga,
      args: [
        new SlashOption(
          'url',
          'Lien mangadex',
          ApplicationCommandOptionType.String,
          true
        ),
        new SlashOption('page', 'Numéro de la page'),
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

    const url = commandInteraction.options.getString('url') as string;
    const id = url.match(/chapter\/([a-zA-Z0-9-]+)(\/?.*)/i)?.at(1);
    if (!id || !url.match(/mangadex.org\/chapter/)) {
      throw new EventError('lien invalide');
    }

    let embeds;
    try {
      const chapter = await this.mangaService.fetchChapter({
        chapterNumber: 0,
        chapterId: id,
      });
      let page = Number(commandInteraction.options.getString('page'));
      if (!page) {
        page = Number(
          commandInteraction.options
            .getString('url')
            ?.match(/chapter\/[a-zA-Z0-9-]+\/(\d+)/i)
            ?.at(1)
        );
      }
      embeds = await generateMagaViewerEmbeds(chapter, page);
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
