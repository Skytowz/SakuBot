/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  ApplicationCommandOptionType,
  CacheType,
  CommandInteraction,
} from 'discord.js';
import SlashOption from '../../utils/slashOption.js';
import { CommandDetails } from '../../types/Command.js';
import AbstractCommand from '../AbstractCommand.js';
import { getGeneralImageByTag } from '../../services/danroobuService.js';
import { AppInstances } from '../../AppInstances.js';

export interface DanroobuCommandDeclaration extends CommandDetails {
  research: string;
}

export default class ImplementableDanroobuCommand extends AbstractCommand {
  public constructor(
    appInstances: AppInstances,
    details: DanroobuCommandDeclaration
  ) {
    super(appInstances, {
      args: [
        new SlashOption()
          .setName('mention')
          .setDescription('La personne')
          .setType(ApplicationCommandOptionType.Mentionable),
        new SlashOption()
          .setName('solo')
          .setDescription('Solo')
          .setType(ApplicationCommandOptionType.Boolean),
        new SlashOption()
          .setName('sensitive')
          .setDescription('Sensitive')
          .setType(ApplicationCommandOptionType.Boolean),
      ],
      slash: true,
      ...details,
    });
  }

  public async run(commandInteraction: CommandInteraction<CacheType>) {
    // @ts-ignore
    const solo = commandInteraction.options.getBoolean('solo');
    // @ts-ignore
    const sensitive = commandInteraction.options.getBoolean('sensitive');
    const url = await getGeneralImageByTag(
      this.getDetails().research,
      solo,
      sensitive
    );
    if (url && sensitive) {
      await commandInteraction.deferReply();
      commandInteraction.editReply({
        files: [{ attachment: url, name: 'SPOILER_image.jpg', spoiler: true }],
      });
    } else if (url) {
      commandInteraction.reply({ content: url });
    } else {
      commandInteraction.reply({
        content: 'Aucune image trouvé',
        ephemeral: true,
      });
    }
  }
}
