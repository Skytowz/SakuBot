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

const commands: Array<AbstractCommand> = [];

commandsData.forEach(({ command, details }) => {
  commands.push(new command(client, details || {}));
});

const commandManager = new CommandManager(commands);

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
  //Initialisation des commandes dans l'api
  try {
    console.log('Started refreshing application (/) commands.');
    await commandManager.registerCommands(rest);
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
