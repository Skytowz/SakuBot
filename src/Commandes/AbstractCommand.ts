import { BaseInteraction, Client, CommandInteraction } from 'discord.js';
import { CommandDetails } from '../types/Command.js';
import injector from 'wire-dependency-injection';
import LogChild from '../LogChild.js';
import CommandService from '../services/CommandService.js';

export default class AbstractCommand<
  CD extends CommandDetails = CommandDetails
> extends LogChild {
  private readonly details: CD;

  protected client: Client = injector.autoWire(
    'client',
    (b) => (this.client = b)
  );

  public constructor(details: CD) {
    super('(Command)[' + details.id + ']: ');
    this.details = { slashInteraction: true, ...details };
    this.register().catch();
  }

  public async register() {
    await injector.waitForWire('logger');
    try {
      const commandService = await injector.waitForWire(CommandService);
      this.getLogger().info(`Registering...`);
      await commandService.registerCommand(this);
      this.getLogger().info(`Registered!`);
    } catch (e) {
      this.getLogger().error('Failed to register', e);
    }
  }

  public getDetails() {
    return this.details;
  }

  public async run(commandInteraction: BaseInteraction): Promise<void> {
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
