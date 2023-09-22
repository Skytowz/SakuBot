import './beans.js';
import logger from './logger.js';
import { Client, GatewayIntentBits, REST } from 'discord.js';
import dotenv from 'dotenv';
import { registerLoggerBean } from './beans/LoggerBean.js';
import { registerClientBean } from './beans/ClientBean.js';
import { registerDiscordRestBean } from './beans/DiscordRestBean.js';

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

registerDiscordRestBean(rest);

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
