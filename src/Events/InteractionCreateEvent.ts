import { Client, CommandInteraction } from 'discord.js';
import { CommandManager } from '../CommandManager.js';
import AbstractEvent from './AbstractEvent.js';

export default class InteractionCreateEvent extends AbstractEvent {
  public constructor(client: Client, commandManager: CommandManager) {
    super(client, commandManager, 'interactionCreate');
  }

  protected async onEvent(commandInteraction: CommandInteraction) {
    if (
      commandInteraction.isChatInputCommand() ||
      commandInteraction.isContextMenuCommand()
    ) {
      const commandName = commandInteraction.commandName;
      const command = this.getCommandManager().getCommandByName(commandName);
      if (!command) return;

      console.log(`Executing command [${commandName}]`);

      await command.run(commandInteraction);
    }
  }
}
