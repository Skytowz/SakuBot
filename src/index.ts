/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Client,
  Collection,
  GatewayIntentBits,
  REST,
  Routes,
  ContextMenuCommandBuilder,
  ApplicationCommandType,
} from 'discord.js';
import * as fs from 'fs';
import SlashCommand from './utils/slashCommand.js';
import {
  filterCommandsDataFromList,
  filterCommandsFromList,
} from './utils/commandUtils.js';
import Command, {
  CommandDeclaration,
  CommandsData,
} from './Commandes/Command.js';

import { config } from 'dotenv';
config();

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

//FIXME: ne pas ajouter de champs à une classe!
//@ts-ignore
client.commands = new Collection();

const registeredCommands: Array<ContextMenuCommandBuilder | SlashCommand> = [];

const addList = (
  name: string,
  commande: Command,
  object?: CommandDeclaration
) => {
  if (!commande.help.nohelp || object) {
    //@ts-ignore
    client.commands.set(name, commande);
    if (commande.help.slash || object?.slash) {
      registeredCommands.push(
        new SlashCommand()
          .setName(name)
          .setDescription((object?.help ?? commande.help.help) as string)
          .setOption(commande.help.args ?? [])
      );
    }
    if (commande.help.user || object?.user) {
      registeredCommands.push(
        new ContextMenuCommandBuilder()
          .setName(name)
          .setType(ApplicationCommandType.User)
      );
    }
    if (commande.help.message || object?.message) {
      registeredCommands.push(
        new ContextMenuCommandBuilder()
          .setName(name)
          .setType(ApplicationCommandType.Message)
      );
    }
  }
};

(async () => {
  fs.readdir('./dist/Commandes/', async (error, f) => {
    //Recupération des commandes classiques
    const commandes = filterCommandsFromList(f);
    if (commandes.length <= 0)
      return console.log('Aucune commande classique trouvé');
    await Promise.all(commandes.map(importCommand));

    //recuperation des commandes data
    const datas = filterCommandsDataFromList(f);
    if (datas.length <= 0) return console.log('Aucune commande data trouvé');
    await Promise.all(datas.map(importCommandData));

    //Initialisation des commandes dans l'api
    try {
      console.log('Started refreshing application (/) commands.');
      await registerCommandsIdAPI(registeredCommands);
      console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
      console.error(error);
    }
  });
})();

fs.readdir('./dist/Events/', (error, f) => {
  if (error) console.log(error);
  console.log(`${f.length} events en chargement`);

  f.forEach(async (f) => {
    const events = (await import(`./Events/${f}`)).default;
    const event = f.split('.')[0];

    client.on(event, events.bind(null, client));
  });
});

export const importCommand = async (command: string) => {
  const commande: Command = await import(`./Commandes/${command}`);

  if (typeof commande.help.name == 'object')
    commande.help.name.forEach((name: string) =>
      addList(name, commande, undefined)
    );
  else addList((commande.help.name as unknown) as string, commande, undefined);
};

export const importCommandData = async (commandData: string) => {
  const data: CommandsData = (await import(`./Commandes/${commandData}`))
    .default;
  const js: Command = await import(
    `./Commandes/${commandData.replace(/\.data/g, '')}`
  );
  Object.values(data).forEach((object) => {
    if (typeof object.name == 'object')
      object.name.forEach((name: string) => addList(name, js, object));
    else addList((object.name as unknown) as string, js, object);
  });
};

export const registerCommandsIdAPI = async (
  commands: Array<ContextMenuCommandBuilder | SlashCommand>
) => {
  return rest.put(
    Routes.applicationCommands(
      (process.env.ENV == 'DEV'
        ? process.env.APP_ID_DEV
        : process.env.APP_ID) as string
    ),
    { body: commands }
  );
};
