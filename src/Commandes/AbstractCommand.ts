import { Client, CommandInteraction } from 'discord.js';
import { CommandDeclaration } from '../types/Command.js';
import { CommandManager } from '../CommandManager.js';

export default class AbstractCommand {
  private client;
  private details;

  public constructor(client: Client, details: CommandDeclaration) {
    this.client = client;
    this.details = details;
  }

  public getClient() {
    return this.client;
  }

  public getDetails() {
    return this.details;
  }

  public async run(
    commandInteraction: CommandInteraction,
    commandManager: CommandManager
  ) {
    Promise.reject({ commandInteraction, commandManager });
  }
}
