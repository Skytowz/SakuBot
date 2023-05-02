import { Client, CommandInteraction } from 'discord.js';
import { CommandDeclaration } from '../types/Command.js';

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async run(commandInteraction: CommandInteraction): Promise<any> {
    Promise.resolve(commandInteraction);
  }
}
