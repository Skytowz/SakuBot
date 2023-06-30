import { ActivityType } from 'discord.js';
import AbstractEvent from './AbstractEvent.js';
import { AppInstances } from '../AppInstances.js';

export default class readyEvent extends AbstractEvent {
  public constructor(appInstances: AppInstances) {
    super(appInstances, 'ready');
  }

  protected async onEvent() {
    this.getAppInstances().client.user?.setActivity('Saku le best', {
      type: ActivityType.Playing,
    });
    this.getAppInstances().logger.info(
      `Bot instance (${this.getAppInstances().client.user?.id}) ${
        this.getAppInstances().client.user?.username
      }#${this.getAppInstances().client.user?.discriminator} is ready!`
    );
  }
}
