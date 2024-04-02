import { Client } from 'undici';
import LogChild from '../LogChild.js';
import injector from 'wire-dependency-injection';
import { MessageHandlerDetails } from '../types/MessageHandler.js';
import { Message } from 'discord.js';

export default class AbstractMessageHandler<
  MHD extends MessageHandlerDetails = MessageHandlerDetails,
> extends LogChild {
  private readonly details: MHD;

  protected client: Client = injector.autoWire(
    'client',
    (b) => (this.client = b)
  );

  public constructor(details: MHD) {
    super('(Command)[' + details.id + ']: ');
    this.details = { slashInteraction: true, ...details };
  }

  public getDetails() {
    return this.details;
  }
  public async run(message: Message): Promise<void> {
    await Promise.reject(message);
  }

  public toString() {
    return `${this.details.id} : ${this.details.regex}`;
  }
}

export const MESSAGE_HANDLER_BEAN_TYPE = 'messageHandler';
