import { Client, CommandInteraction } from 'discord.js';
import { CommandManager } from '../CommandManager.js';

const ERROR_MESAGE = "Une Erreur s'est produite";

export default class AbstractEvent {
  private eventIdentifier;
  private client;
  private commandManager;

  public constructor(
    client: Client,
    commandManager: CommandManager,
    eventIdentifier: string
  ) {
    this.eventIdentifier = eventIdentifier;
    this.client = client;
    this.commandManager = commandManager;
  }

  public getEventIdentifier() {
    return this.eventIdentifier;
  }

  public getClient() {
    return this.client;
  }

  public getCommandManager() {
    return this.commandManager;
  }

  public async execute(commandInteraction: CommandInteraction) {
    this.onEvent(commandInteraction).catch((error) => {
      console.error(error);
      if (commandInteraction.deferred) {
        if (commandInteraction.replied)
          commandInteraction.followUp({
            content: ERROR_MESAGE,
            ephemeral: true,
          });
        else commandInteraction.channel?.send({ content: ERROR_MESAGE });
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
}
