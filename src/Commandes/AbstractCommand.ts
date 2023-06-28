import { Client, CommandInteraction } from 'discord.js';
import { CommandDeclaration } from '../types/Command.js';
import { CommandManager } from '../CommandManager.js';
import pino from 'pino';

export default class AbstractCommand {
  private logger: pino.Logger;
  private client;
  private commandManager;
  private details: CommandDeclaration;

  public constructor(
    logger: pino.Logger,
    client: Client,
    commandManager: CommandManager,
    details: CommandDeclaration
  ) {
    this.logger = logger;
    this.client = client;
    this.commandManager = commandManager;
    this.details = { slash: true, ...details };
  }

  public getLogger() {
    return this.logger;
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

  public toString() {
    return `${this.details.name}${
      this.details.args
        ? `{${this.details.args?.map((arg) => arg.name).join(', ')}}`
        : ''
    }`;
  }
}
