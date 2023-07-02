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
  public constructor(appInstances: AppInstances, details: CommandDetails) {
    super(appInstances, {
      args: [
        new SlashOption(
          'chapitre',
          'Numéro du chapitre',
          ApplicationCommandOptionType.String,
          true
        ),
        new SlashOption('page', 'Numéro de la page'),
      ],
      slash: true,
      type: TypeHelp.ViewManga,
      ...details,
    });
  }

  public async run(commandInteraction: CommandInteraction<CacheType>) {
    generateMagaViewerEmbeds(
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
