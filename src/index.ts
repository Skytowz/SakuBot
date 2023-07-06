import { Client, GatewayIntentBits, REST } from 'discord.js';
import commandsData from './data/commands.js';
import eventsData from './data/events.js';
import { CommandManager } from './CommandManager.js';
import AbstractEvent from './Events/AbstractEvent.js';
import dotenv from 'dotenv';
import logger from './logger.js';
import { CommandDetails } from './types/Command.js';
import { ServiceManager } from './ServiceManager.js';
import SaucenaoService from './services/SaucenaoService.js';
import { AppInstances } from './types/AppInstances.js';
import CommandService from './services/CommandService.js';
import DanroobuService from './services/DanroobuService.js';
import GistService from './services/GistService.js';
import MangadexService from './services/MangadexService.js';
import MangaService from './services/MangaService.js';
import ResourcesService from './services/ResourcesService.js';
import CommandInteractionService from './services/CommandInteractionService.js';

dotenv.config();

const unhandledErrorsThreshold =
  Number(process.env.UNHANDLED_ERRORS_THRESHOLD) || 10;

let unhandledErrorCount = 0;

const unhandledErrorListener = (error: unknown) => {
  unhandledErrorCount++;
  logger.error('an unhandled exception occurred');
  logger.error(error);
  if (
    unhandledErrorsThreshold !== -1 &&
    unhandledErrorCount >= unhandledErrorsThreshold
  ) {
    logger.fatal(
      'too many unhandled errors occurred, shutting down for safety!'
    );
    process.exit(1);
  }
};

process.on('unhandledRejection', unhandledErrorListener);
process.on('uncaughtException', unhandledErrorListener);

const rest = new REST({ version: '10' }).setToken(
  (process.env.ENV == 'DEV'
    ? process.env.TOKEN_DEV
    : process.env.TOKEN) as string
);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.on('rateLimit', (data) => {
  if (data.timeout > 1000) process.kill(1);
});

if (process.env.ENV == 'DEV') {
  client.login(process.env.TOKEN_DEV);
} else if (process.env.ENV == 'PROD') {
  client.login(process.env.TOKEN);
}

const commandManager = new CommandManager();

const serviceManager = new ServiceManager();

const events: Array<AbstractEvent> = [];

const appInstances: AppInstances = {
  logger: logger,
  commandManager: commandManager,
  serviceManager: serviceManager,
  client: client,
  events: events,
};

commandManager.setAppInstances({
  ...appInstances,
  logger: logger.child({}, { msgPrefix: `[CommandManager] : ` }),
});

serviceManager.setAppInstances({
  ...appInstances,
  logger: logger.child({}, { msgPrefix: `[ServiceManager] : ` }),
});

const servicesClasses = [
  CommandService,
  DanroobuService,
  GistService,
  MangadexService,
  SaucenaoService,
  MangaService,
  ResourcesService,
  CommandInteractionService,
];

servicesClasses.forEach((serviceClass) => {
  const serviceLogger = logger.child(
    {},
    { msgPrefix: `[${serviceClass.name || 'unknown'}] : ` }
  );
  serviceManager.addService(
    new serviceClass({ ...appInstances, logger: serviceLogger })
  );
});

commandsData.forEach(({ command, details }) => {
  const commandLogger = logger.child(
    {},
    { msgPrefix: `[${details?.name || 'unknown'}] : ` }
  );
  commandManager.addCommand(
    new command(
      { ...appInstances, logger: commandLogger },
      details || ({} as CommandDetails)
    )
  );
});

eventsData.forEach(({ event }) => {
  const eventLogger = logger.child(
    {},
    { msgPrefix: `[${event.name || 'unknown'}] : ` }
  );
  events.push(
    new event(
      { ...appInstances, logger: eventLogger },
      (undefined as unknown) as string
    )
  );
});

try {
  logger.info(`Registering ${events.length} application events.`);
  events.forEach((event) => {
    client.on(event.getEventIdentifier(), (args) => event.execute(args));
  });
  logger.info(`Successfully registered ${events.length} application events.`);
  logger.debug({
    loadedEvents: events.map((event) => event.toString()),
  });
} catch (error) {
  logger.fatal(error);
  throw error;
}

(async () => {
  try {
    logger.info(
      `Starting the refresh of ${
        commandManager.getAll().length
      } application (/) commands.`
    );
    await commandManager.registerCommands(rest);
    logger.info(
      `Successfully loaded ${
        commandManager.getAll().length
      } application (/) commands.`
    );
    logger.debug({
      loadedCommands: commandManager
        .getAll()
        .map((command) => command.toString()),
    });
  } catch (error) {
    logger.fatal(error);
  }

  if (client.isReady()) {
    logger.info(`Application is fully loaded!`);
  } else {
    logger.info(
      `Application initialization is complete, please wait for the bot to connect!`
    );
  }
})();
