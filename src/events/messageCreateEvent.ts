import { CommandInteraction, Message } from 'discord.js';
import AbstractEvent, { EVENT_BEAN_TYPE } from './AbstractEvent.js';
import injector from 'wire-dependency-injection';
import AbstractMessageHandler, {
  MESSAGE_HANDLER_BEAN_TYPE,
} from '../commandesMessageHandler/AbstractMessageHandler.js';

export default class MessageCreateEvent extends AbstractEvent {
  static {
    injector.instance(this.name, this, {
      category: EVENT_BEAN_TYPE,
    });
  }

  public constructor() {
    super('messageCreate');
  }

  protected async onEvent(message: Message) {
    const handler = injector
      .wire<Array<AbstractMessageHandler>>({
        category: MESSAGE_HANDLER_BEAN_TYPE,
      })
      .find((b) => message.content.match(b.getDetails().regex));
    if (!handler) return;
    this.getLogger().info(
      `Handler match [${handler.toString()}] for user (${message.member?.user
        ?.id}) ${message.member?.user?.username}#${message.member?.user
        ?.discriminator}`
    );
    handler.run(message);
  }
}
