import Logger from '../logger.js';
import { Client } from 'discord.js';
import { CommandManager } from '../CommandManager.js';
import AbstractEvent from '../events/AbstractEvent.js';
import { ServiceManager } from '../ServiceManager.js';

export type AppInstances = {
  logger: Logger;
  client: Client;
  commandManager: CommandManager;
  serviceManager: ServiceManager;
  events: Array<AbstractEvent>;
};
