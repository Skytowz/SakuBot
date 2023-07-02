import { CommandInteraction } from 'discord.js';
import { CommandDetails } from '../types/Command.js';
import { AppInstances } from '../AppInstances.js';

export default class AbstractCommand {
  private readonly appInstances: AppInstances;
  private readonly details: CommandDetails;

  public constructor(appInstances: AppInstances, details: CommandDetails) {
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
