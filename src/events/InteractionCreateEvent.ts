import {
  BaseInteraction,
  CommandInteraction,
  ModalSubmitInteraction,
} from 'discord.js';
import AbstractEvent, { EVENT_BEAN_TYPE } from './AbstractEvent.js';
import injector from 'wire-dependency-injection';
import AbstractCommand, {
  COMMAND_BEAN_TYPE,
} from '../Commandes/AbstractCommand.js';

export default class InteractionCreateEvent extends AbstractEvent {
  public constructor() {
    super('interactionCreate');
  }

  protected async onEvent(commandInteraction: BaseInteraction) {
    if (
      !(
        commandInteraction.isChatInputCommand() ||
        commandInteraction.isContextMenuCommand() ||
        commandInteraction.isModalSubmit()
      )
    ) {
      return;
    }
    let commandName: string;
    if (commandInteraction.isModalSubmit()) {
      commandInteraction as ModalSubmitInteraction;
      commandName = commandInteraction.customId;
    } else {
      commandInteraction as CommandInteraction;
      commandName = commandInteraction.commandName;
    }
    const command = injector
      .getContainer()
      ?.getBeans()
      .find(
        (b) =>
          b.getType() === COMMAND_BEAN_TYPE &&
          (b.getInstance() as AbstractCommand)
            .getDetails()
            .name?.includes(commandName)
      )
      ?.getInstance() as AbstractCommand;
    if (!command) return;

    this.getLogger().info(
      `Executing command [${commandName.toString()}] for user (${
        commandInteraction.member?.user?.id
      }) ${commandInteraction.member?.user?.username}#${
        commandInteraction.member?.user?.discriminator
      }`
    );
    if (commandInteraction.isCommand())
      this.getLogger().debug(commandInteraction.options);

    await command.run(commandInteraction);
  }
}

injector.registerBean(InteractionCreateEvent, {
  type: EVENT_BEAN_TYPE,
});
