import { CommandInteraction } from 'discord.js';
import AbstractEvent from './AbstractEvent.js';
import { AppInstances } from '../AppInstances.js';

export default class InteractionCreateEvent extends AbstractEvent {
  public constructor(appInstances: AppInstances) {
    super(appInstances, 'interactionCreate');
  }

  protected async onEvent(commandInteraction: CommandInteraction) {
    if (
      commandInteraction.isChatInputCommand() ||
      commandInteraction.isContextMenuCommand()
    ) {
      const commandName = commandInteraction.commandName;
      const command = this.getAppInstances().commandManager.getCommandByName(
        commandName
      );
      if (!command) return;

      this.getAppInstances().logger.info(
        `Executing command [${commandName.toString()}] for user (${
          commandInteraction.member?.user?.id
        }) ${commandInteraction.member?.user?.username}#${
          commandInteraction.member?.user?.discriminator
        }`
      );
      this.getAppInstances().logger.debug(commandInteraction.options);

      await command.run(commandInteraction);
    }
  }
}
