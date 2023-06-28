import { CommandInteraction, CacheType, Client } from 'discord.js';
import { sample } from '../../utils/arrayUtils.js';
import { CommandDeclaration } from '../../types/Command.js';
import AbstractCommand from '../AbstractCommand.js';
import { CommandManager } from '../../CommandManager.js';
import pino from 'pino';

export default class ImplementableMangaCommand extends AbstractCommand {
  public constructor(
    logger: pino.Logger,
    client: Client,
    commandManager: CommandManager,
    details: CommandDeclaration
  ) {
    super(logger, client, commandManager, details);
  }

  public async run(commandInteraction: CommandInteraction<CacheType>) {
    commandInteraction.reply(sample(this.getDetails().send as Array<string>));
  }
}
