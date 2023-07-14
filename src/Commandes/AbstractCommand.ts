import { Client, CommandInteraction } from 'discord.js';
import { CommandDetails } from '../types/Command.js';
import Logger from '../logger.js';
import injector from 'wire-dependency-injection';

export default class AbstractCommand<
  CD extends CommandDetails = CommandDetails
> {
  private readonly details: CD;

  protected logger?: typeof Logger = injector.autoWire(
    'logger',
    (b) => (this.logger = b)
  );
  protected client?: Client = injector.autoWire(
    'client',
    (b) => (this.client = b)
  );

  public constructor(details: CD) {
    this.details = { slashInteraction: true, ...details };
  }

  public getDetails() {
    return this.details;
  }

  public async run(commandInteraction: CommandInteraction): Promise<void> {
    await Promise.reject(commandInteraction);
  }

  public toString() {
    return `${this.details.name}${
      this.details.args
        ? `{${this.details.args?.map((arg) => arg.name).join(', ')}}`
        : ''
    }`;
  }
}

export const COMMAND_BEAN_TYPE = 'command';
