import { CommandInteraction } from 'discord.js';
import { CommandDetails } from '../types/Command.js';
import { AppInstances } from '../types/AppInstances.js';

export default class AbstractCommand<
  CD extends CommandDetails = CommandDetails
> {
  private readonly appInstances: AppInstances;
  private readonly details: CD;

  public constructor(appInstances: AppInstances, details: CD) {
    this.appInstances = appInstances;
    this.details = { slashInteraction: true, ...details };
  }

  public getAppInstances() {
    return this.appInstances;
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
