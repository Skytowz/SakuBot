import { ActivityType, Client } from 'discord.js';
import { CommandManager } from '../CommandManager.js';
import AbstractEvent from './AbstractEvent.js';

export default class readyEvent extends AbstractEvent {
  public constructor(client: Client, commandManager: CommandManager) {
    super(client, commandManager, 'ready');
  }

  protected async onEvent() {
    this.getClient().user?.setActivity('Saku le best', {
      type: ActivityType.Playing,
    });
  }
}
