import { ActivityType, Client } from 'discord.js';
import { CommandManager } from '../CommandManager.js';
import AbstractEvent from './AbstractEvent.js';
import pino from 'pino';

export default class readyEvent extends AbstractEvent {
  public constructor(
    logger: pino.Logger,
    client: Client,
    commandManager: CommandManager
  ) {
    super(logger, client, commandManager, 'ready');
  }

  protected async onEvent() {
    this.getClient().user?.setActivity('Saku le best', {
      type: ActivityType.Playing,
    });
    this.getLogger().info(
      `Bot instance (${this.getClient().user?.id}) ${
        this.getClient().user?.username
      }#${this.getClient().user?.discriminator} is ready!`
    );
  }
}
