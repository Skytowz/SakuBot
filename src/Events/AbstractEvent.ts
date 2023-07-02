import { CommandInteraction } from 'discord.js';
import { AppInstances } from '../types/AppInstances.js';
import EventError from '../errors/EventError.js';

const ERROR_MESAGE = "Une Erreur s'est produite";

export default class AbstractEvent {
  private readonly appInstances: AppInstances;
  private readonly eventIdentifier;

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
    this.onEvent(commandInteraction).catch(async (error) => {
      let errorMessage = ERROR_MESAGE;
      if (error instanceof EventError) {
        this.getAppInstances().logger.trace(
          'a managed error occurred while executing a command.'
        );
        this.getAppInstances().logger.trace(error);
        errorMessage = [errorMessage, error.message].join('\n');
      } else {
        this.getAppInstances().logger.error(
          'an unexpected error occurred while executing a command.'
        );
        this.getAppInstances().logger.error(error);
      }
      if (!commandInteraction.deferred) {
        await commandInteraction.deferReply({ ephemeral: true });
      } else if (!commandInteraction.ephemeral || commandInteraction.replied) {
        await commandInteraction.deleteReply();
      }
      await commandInteraction.followUp({
        content: errorMessage,
        ephemeral: true,
      });
    });
  }

  protected async onEvent(commandInteraction: CommandInteraction) {
    await Promise.reject(commandInteraction);
  }

  public toString() {
    return this.eventIdentifier;
  }
}
