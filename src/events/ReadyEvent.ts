import { ActivityType } from 'discord.js';
import AbstractEvent, { EVENT_BEAN_TYPE } from './AbstractEvent.js';
import injector from 'wire-dependency-injection';

export default class ReadyEvent extends AbstractEvent {
  public constructor() {
    super('ready');
  }

  protected async onEvent() {
    this.client?.user?.setActivity('Saku le best', {
      type: ActivityType.Playing,
    });
    this.logger?.info(
      `Bot instance (${this.client?.user?.id}) ${this.client?.user?.username}#${this.client?.user?.discriminator} is ready!`
    );
  }
}

injector.registerBean('readyEvent', ReadyEvent, EVENT_BEAN_TYPE);
