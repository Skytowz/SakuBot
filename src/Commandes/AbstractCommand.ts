import { CommandInteraction } from 'discord.js';
import { CommandDetails } from '../types/Command.js';
import { AppInstances } from '../AppInstances.js';

export default class AbstractCommand {
  private appInstances: AppInstances;
  private details: CommandDetails;

  public constructor(appInstances: AppInstances, details: CommandDetails) {
    this.appInstances = appInstances;
    this.details = { slash: true, ...details };
  }

  public getAppInstances() {
    return this.appInstances;
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
