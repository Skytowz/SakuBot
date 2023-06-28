import { Client, CommandInteraction } from 'discord.js';
import { CommandManager } from '../CommandManager.js';
import pino from 'pino';

const ERROR_MESAGE = "Une Erreur s'est produite";

export default class AbstractEvent {
  private logger: pino.Logger;
  private eventIdentifier;
  private client;
  private commandManager;

  public constructor(
    logger: pino.Logger,
    client: Client,
    commandManager: CommandManager,
    eventIdentifier: string
  ) {
    this.logger = logger;
    this.eventIdentifier = eventIdentifier;
    this.client = client;
    this.commandManager = commandManager;
  }

  public getEventIdentifier() {
    return this.eventIdentifier;
  }

  public getLogger() {
    return this.logger;
  }

  public getClient() {
    return this.client;
  }

  public getCommandManager() {
    return this.commandManager;
  }

  public async execute(commandInteraction: CommandInteraction) {
    this.onEvent(commandInteraction).catch((error) => {
      this.getLogger().error(error);
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
