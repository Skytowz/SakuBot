import { Client, CommandInteraction } from 'discord.js';
import EventError from '../errors/EventError.js';
import injector from 'wire-dependency-injection';
import Logger from '../logger.js';

const ERROR_MESAGE = "Une Erreur s'est produite";

export default class AbstractEvent {
  private readonly eventIdentifier;

  protected logger?: typeof Logger = injector.autoWire(
    'logger',
    (b) => (this.logger = b)
  );
  protected client?: Client = injector.autoWire(
    'client',
    (b) => (this.client = b)
  );

  public constructor(eventIdentifier: string) {
    this.eventIdentifier = eventIdentifier;
  }

  public getEventIdentifier() {
    return this.eventIdentifier;
  }

  public async execute(commandInteraction: CommandInteraction) {
    this.onEvent(commandInteraction).catch(async (error) => {
      let errorMessage = ERROR_MESAGE;
      if (error instanceof EventError) {
        this.logger?.trace(
          'a managed error occurred while executing a command.'
        );
        this.logger?.trace(error);
        errorMessage = [errorMessage, error.message].join('\n');
      } else {
        this.logger?.error(
          'an unexpected error occurred while executing a command.'
        );
        this.logger?.error(error);
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

export const EVENT_BEAN_TYPE = 'event';
