import { CacheType, CommandInteraction } from 'discord.js';
import { sample } from '../../utils/arrayUtils.js';
import { CommandDetails } from '../../types/Command.js';
import AbstractCommand from '../AbstractCommand.js';
import { AppInstances } from '../../AppInstances.js';

export default class ImplementableMangaCommand extends AbstractCommand {
  public constructor(appInstances: AppInstances, details: CommandDetails) {
    super(appInstances, details);
  }

  public async run(commandInteraction: CommandInteraction<CacheType>) {
    commandInteraction.reply(sample(this.getDetails().send as Array<string>));
  }
}
