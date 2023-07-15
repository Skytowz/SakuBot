import { ActivityType } from 'discord.js';
import AbstractEvent, { EVENT_BEAN_TYPE } from './AbstractEvent.js';
import injector, { ClassType } from 'wire-dependency-injection';

export default class ReadyEvent extends AbstractEvent {
  public constructor() {
    super('ready');
  }

  protected async onEvent() {
    this.client?.user?.setActivity('Saku le best', {
      type: ActivityType.Playing,
    });
    this.getLogger().info(
      `Bot instance (${this.client?.user?.id}) ${this.client?.user?.username}#${this.client?.user?.discriminator} is ready!`
    );
  }
}

injector.registerBean(
  ReadyEvent as ClassType,
  ReadyEvent.name,
  EVENT_BEAN_TYPE
);
