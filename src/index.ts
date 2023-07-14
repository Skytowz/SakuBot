import './beans.js';
import logger from './logger.js';
import { Client, GatewayIntentBits, REST } from 'discord.js';
import AbstractEvent, { EVENT_BEAN_TYPE } from './events/AbstractEvent.js';
import dotenv from 'dotenv';
import CommandService from './services/CommandService.js';
import { registerLoggerBean } from './beans/LoggerBean.js';
import { registerClientBean } from './beans/ClientBean.js';
import injector from 'wire-dependency-injection';
import AbstractCommand, {
  COMMAND_BEAN_TYPE,
} from './Commandes/AbstractCommand.js';

dotenv.config();

registerLoggerBean(logger);

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

registerClientBean(client);

client.on('rateLimit', (data) => {
  if (data.timeout > 1000) process.kill(1);
});

if (process.env.ENV == 'DEV') {
  client.login(process.env.TOKEN_DEV);
} else if (process.env.ENV == 'PROD') {
  client.login(process.env.TOKEN);
}

const events = injector
  .getContainer()
  ?.getBeans()
  .filter((b) => b.getType() === EVENT_BEAN_TYPE)
  ?.map((b) => b.getInstance()) as Array<AbstractEvent>;

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

const commands = injector
  .getContainer()
  ?.getBeans()
  .filter((b) => b.getType() === COMMAND_BEAN_TYPE)
  ?.map((b) => b.getInstance()) as Array<AbstractCommand>;

commands.forEach((c) => console.log(c.getDetails().name));

const commandService = injector.wire('commandService') as CommandService;

(async () => {
  try {
    logger.info(
      `Starting the refresh of ${commands.length} application (/) commands.`
    );
    await commandService.registerCommands(rest, commands);
    logger.info(
      `Successfully loaded ${commands.length} application (/) commands.`
    );
    logger.debug({
      loadedCommands: commands.map((command) => command.toString()),
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
