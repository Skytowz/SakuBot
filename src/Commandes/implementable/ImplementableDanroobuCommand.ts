/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  CommandInteraction,
  CacheType,
  Client,
  ApplicationCommandOptionType,
} from 'discord.js';
import SlashOption from '../../utils/slashOption.js';
import { send } from '../../utils/mangaUtils.js';
import { CommandDeclaration } from '../../types/Command.js';
import AbstractCommand from '../AbstractCommand.js';
import { getGeneralImageByTag } from '../../services/danroobuService.js';
import pino from 'pino';
import { CommandManager } from '../../CommandManager.js';

export interface DanroobuCommandDeclaration extends CommandDeclaration {
  research: string;
}

export default class ImplementableDanroobuCommand extends AbstractCommand {
  public constructor(
    logger: pino.Logger,
    client: Client,
    commandManager: CommandManager,
    details: DanroobuCommandDeclaration
  ) {
    super(logger, client, commandManager, {
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
