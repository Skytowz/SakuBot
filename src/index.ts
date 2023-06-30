import { Client, GatewayIntentBits, REST } from 'discord.js';
import commandsData from './data/commands.js';
import eventsData from './data/events.js';
import { CommandManager } from './CommandManager.js';
import AbstractEvent from './Events/AbstractEvent.js';
import dotenv from 'dotenv';
import logger from './logger.js';

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

const events: Array<AbstractEvent> = [];

commandsData.forEach(({ command, details }) => {
  const commandLogger = logger.child(
    {},
    { msgPrefix: `[${details?.name || 'unknown'}] : ` }
  );
  commandManager.addCommand(
    new command(
      {
        commandManager: commandManager,
        client: client,
        logger: commandLogger,
        events: events,
      },
      details || {}
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
      {
        commandManager: commandManager,
        client: client,
        logger: eventLogger,
        events: events,
      },
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
