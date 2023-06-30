import { CommandInteraction } from 'discord.js';
import { AppInstances } from '../AppInstances.js';

const ERROR_MESAGE = "Une Erreur s'est produite";

export default class AbstractEvent {
  private appInstances: AppInstances;
  private eventIdentifier;

  public constructor(appInstances: AppInstances, eventIdentifier: string) {
    this.appInstances = appInstances;
    this.eventIdentifier = eventIdentifier;
  }

  public getEventIdentifier() {
    return this.eventIdentifier;
  }

  public getAppInstances() {
    return this.appInstances;
  }

  public async execute(commandInteraction: CommandInteraction) {
    this.onEvent(commandInteraction).catch((error) => {
      this.getAppInstances().logger.error(error);
      if (commandInteraction.deferred) {
        commandInteraction.editReply({
          content: ERROR_MESAGE,
        });
      } else {
        if (commandInteraction.replied)
          commandInteraction.editReply({ content: ERROR_MESAGE });
        else
          commandInteraction.reply({ content: ERROR_MESAGE, ephemeral: true });
      }
    });
  }

  protected async onEvent(commandInteraction: CommandInteraction) {
    Promise.reject(commandInteraction);
  }

  public toString() {
    return this.eventIdentifier;
  }
}
