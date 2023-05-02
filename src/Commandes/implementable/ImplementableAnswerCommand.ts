import { CommandInteraction, CacheType, Client } from 'discord.js';
import { sample } from '../../utils/arrayUtils.js';
import { CommandDeclaration } from '../../types/Command.js';
import AbstractCommand from '../AbstractCommand.js';

export default class ImplementableMangaCommand extends AbstractCommand {
  public constructor(client: Client, details: CommandDeclaration) {
    super(client, details);
  }

  public async run(commandInteraction: CommandInteraction<CacheType>) {
    commandInteraction.reply(sample(this.getDetails().send as Array<string>));
  }
}
