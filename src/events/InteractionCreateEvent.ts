import { CommandInteraction } from 'discord.js';
import AbstractEvent, { EVENT_BEAN_TYPE } from './AbstractEvent.js';
import injector from 'wire-dependency-injection';
import AbstractCommand, {
  COMMAND_BEAN_TYPE,
} from '../commandes/AbstractCommand.js';

export default class InteractionCreateEvent extends AbstractEvent {
  static {
    injector.instance(this.name, this, {
      category: EVENT_BEAN_TYPE,
    });
  }

  public constructor() {
    super('interactionCreate');
  }

  protected async onEvent(commandInteraction: CommandInteraction) {
    if (
      commandInteraction.isChatInputCommand() ||
      commandInteraction.isContextMenuCommand()
    ) {
      const commandName = commandInteraction.commandName;
      const command = injector
        .wire<Array<AbstractCommand>>({ category: COMMAND_BEAN_TYPE })
        .find((b) => b.getDetails().name?.includes(commandName));
      if (!command) return;

      this.getLogger().info(
        `Executing command [${commandName.toString()}] for user (${commandInteraction
          .member?.user?.id}) ${commandInteraction.member?.user
          ?.username}#${commandInteraction.member?.user?.discriminator}`
      );

      await command.run(commandInteraction);
    }
  }
}
