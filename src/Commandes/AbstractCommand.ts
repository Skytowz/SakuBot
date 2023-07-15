import { Client, CommandInteraction } from 'discord.js';
import { CommandDetails } from '../types/Command.js';
import injector, { ClassType } from 'wire-dependency-injection';
import LogChild from '../LogChild.js';
import CommandService from '../services/CommandService.js';

export default class AbstractCommand<
  CD extends CommandDetails = CommandDetails
> extends LogChild {
  private readonly details: CD;

  protected client?: Client = injector.autoWire(
    'client',
    (b) => (this.client = b)
  );

  public constructor(details: CD) {
    super('(Command)[' + details.id + ']: ');
    this.details = { slashInteraction: true, ...details };
    injector.autoWire(CommandService as ClassType, (b) => {
      injector.autoWire('logger', async (c) => {
        this.getLogger().info(`Registering...`);
        await ((b as unknown) as CommandService).registerCommands([this]);
        this.getLogger().info(`Registered!`);
      });
    });
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
