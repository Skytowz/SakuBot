import { Client, CommandInteraction } from 'discord.js';
import { CommandManager } from '../CommandManager.js';
import AbstractEvent from './AbstractEvent.js';
import pino from 'pino';

export default class InteractionCreateEvent extends AbstractEvent {
  public constructor(
    logger: pino.Logger,
    client: Client,
    commandManager: CommandManager
  ) {
    super(logger, client, commandManager, 'interactionCreate');
  }

  protected async onEvent(commandInteraction: CommandInteraction) {
    if (
      commandInteraction.isChatInputCommand() ||
      commandInteraction.isContextMenuCommand()
    ) {
      const commandName = commandInteraction.commandName;
      const command = this.getCommandManager().getCommandByName(commandName);
      if (!command) return;

      this.getLogger().info(
        `Executing command [${commandName.toString()}] for user (${
          commandInteraction.member?.user?.id
        }) ${commandInteraction.member?.user?.username}#${
          commandInteraction.member?.user?.discriminator
        }`
      );
      this.getLogger().debug(commandInteraction.options);

      await command.run(commandInteraction);
    }
  }
}
