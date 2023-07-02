/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ApplicationCommandOptionType, CommandInteraction } from 'discord.js';
import SlashOption from '../../utils/slashOption.js';
import { generateMagaViewerEmbeds } from '../../utils/mangaUtils.js';
import { CommandDetails } from '../../types/Command.js';
import AbstractCommand from '../AbstractCommand.js';
import TypeHelp from '../../entity/typeHelp.js';
import { AppInstances } from '../../types/AppInstances.js';
import EventError from '../../errors/EventError.js';

export default class ImplementableMangaCommand extends AbstractCommand {
  public static readonly abstractId = 'abstract.manga';

  public constructor(appInstances: AppInstances, details: CommandDetails) {
    super(appInstances, {
      // @ts-ignore
      id: ImplementableMangaCommand.abstractId,
      helpDescription: "Affiche une page d'un chapitre d'un manga",
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
    if (!commandInteraction.isChatInputCommand()) {
      throw new EventError(
        "cette action ne peut être effectuée qu'avec une commande"
      );
    }
    await generateMagaViewerEmbeds(
      Number(commandInteraction.options.getString('chapitre')),
      Number(commandInteraction.options.getString('page')),
      {
        research: this.getDetails().options?.chapterId,
        options: this.getDetails().options,
      }
    );
  }
}
