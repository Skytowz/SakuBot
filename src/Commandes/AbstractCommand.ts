import { Client, CommandInteraction } from 'discord.js';
import { CommandDeclaration } from '../types/Command.js';
import { CommandManager } from '../CommandManager.js';

export default class AbstractCommand {
  private client;
  private commandManager;
  private details: CommandDeclaration;

  public constructor(
    client: Client,
    commandManager: CommandManager,
    details: CommandDeclaration
  ) {
    this.client = client;
    this.commandManager = commandManager;
    this.details = { slash: true, ...details };
  }

  public getClient() {
    return this.client;
  }

  public getCommandManager() {
    return this.commandManager;
  }

  public getDetails() {
    return this.details;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async run(commandInteraction: CommandInteraction): Promise<any> {
    Promise.reject(commandInteraction);
  }
}
