/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  ApplicationCommandOptionType,
  CacheType,
  CommandInteraction,
} from 'discord.js';
import SlashOption from '../../utils/slashOption.js';
import { generateMagaViewerEmbeds } from '../../utils/mangaUtils.js';
import { CommandDetails } from '../../types/Command.js';
import AbstractCommand from '../AbstractCommand.js';
import TypeHelp from '../../entity/typeHelp.js';
import { AppInstances } from '../../AppInstances.js';

export interface MangaCommandDeclaration extends CommandDetails {
  chapterId: string;
}

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

  public async run(commandInteraction: CommandInteraction<CacheType>) {
    await generateMagaViewerEmbeds(
      commandInteraction,
      //@ts-ignore
      commandInteraction.options.getString('chapitre'),
      //@ts-ignore
      commandInteraction.options.getString('page'),
      //@ts-ignore
      { research: this.getDetails().chapterId, ...this.getDetails() }
    );
  }
}
