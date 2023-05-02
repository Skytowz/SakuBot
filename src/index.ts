import { Client, GatewayIntentBits, REST } from 'discord.js';
import commandsData from './data/commands.js';
import eventsData from './data/events.js';
import AbstractCommand from './Commandes/AbstractCommand.js';
import { CommandManager } from './CommandManager.js';
import AbstractEvent from './Events/AbstractEvent.js';
import dotenv from 'dotenv';

dotenv.config();

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

commandsData.forEach(({ command, details }) =>
  commandManager.addCommand(new command(client, commandManager, details || {}))
);

const events: Array<AbstractEvent> = [];

eventsData.forEach(({ event }) =>
  events.push(
    new event(client, commandManager, (undefined as unknown) as string)
  )
);

events.forEach((event) => {
  client.on(event.getEventIdentifier(), (args) => event.execute(args));
});

(async () => {
  try {
    console.log(
      `Starting the refresh of ${
        commandManager.getAll().length
      } application (/) commands.`
    );
    await commandManager.registerCommands(rest);
    console.log(
      `Successfully loaded ${
        commandManager.getAll().length
      } application (/) commands.`
    );
  } catch (error) {
    console.error(error);
  }
})();
