import Logger from './logger.js';
import { Client } from 'discord.js';
import { CommandManager } from './CommandManager.js';
import AbstractEvent from './Events/AbstractEvent.js';

export type AppInstances = {
  logger: Logger;
  client: Client;
  commandManager: CommandManager;
  events: Array<AbstractEvent>;
};
