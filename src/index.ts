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
import fs from 'fs';
import SlashCommand from './utils/slashCommand.js';

import { config } from 'dotenv';
config();

//FIXME
const rest = new REST({ version: '10' }).setToken(
  //@ts-ignore
  process.env.ENV == 'DEV' ? process.env.TOKEN_DEV : process.env.TOKEN
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

//FIXME
//@ts-ignore
Array.prototype.sample = function () {
  if (this.length == 1) return this[0];
  return this[Math.floor(Math.random() * this.length)];
};

client.on('rateLimit', (data) => {
  if (data.timeout > 1000) process.kill(1);
});

if (process.env.ENV == 'DEV') {
  client.login(process.env.TOKEN_DEV);
} else if (process.env.ENV == 'PROD') {
  client.login(process.env.TOKEN);
}

//FIXME
//@ts-ignore
client.commands = new Collection();

const commands: Array<ContextMenuCommandBuilder | SlashCommand> = [];

// const appCommand = new ContextMenuCommandBuilder().setName('chad').setType(ApplicationCommandType.Message);
//
// commands.push(appCommand);

//FIXME
const addList = (name: string, commande: any, object: any) => {
  if (!commande.help.noHelp || object) {
    //FIXME
    //@ts-ignore
    client.commands.set(name, commande);
    if (commande.help.slash || object?.slash) {
      commands.push(
        new SlashCommand()
          .setName(name)
          .setDescription(object?.help ?? commande.help.help)
          .setOption(commande.help.args ?? [])
      );
    }
    if (commande.help.user || object?.user) {
      commands.push(
        new ContextMenuCommandBuilder()
          .setName(name)
          .setType(ApplicationCommandType.User)
      );
    }
    if (commande.help.message || object?.message) {
      commands.push(
        new ContextMenuCommandBuilder()
          .setName(name)
          .setType(ApplicationCommandType.Message)
      );
    }
  }
};
(async () => {
  fs.readdir('./dist/Commandes/', async (error, f) => {
    console.log(f);
    //Recupération des commandes classiques
    const commandes = f.filter((f) => f.match(/^(?:(?!(?:\.data)).)*\.js$/));
    if (commandes.length <= 0)
      return console.log('Aucune commande classique trouvé');
    await Promise.all(
      commandes.map(async (f) => {
        // prettier-ignore
        const commande = await import(`./Commandes/${f}`);
        console.log(commande);

        if (typeof commande.help.name == 'object')
          commande.help.name.forEach((name: string) =>
            addList(name, commande, undefined)
          );
        else addList(commande.help.name, commande, undefined);
      })
    );
    console.log(f);
    //recuperation des commandes JSON
    const jsons = f.filter((f) => f.match(/\.data\.js$/));
    if (jsons.length <= 0) return console.log('Aucune commande JSON trouvé');
    Promise.all(
      jsons.map(async (f) => {
        const json = (await import(`./Commandes/${f}`)).default;
        const js = await import(`./Commandes/${f.replace(/\.data/g, '')}`);
        //FIXME
        Object.values(json).forEach((object: any) => {
          if (typeof object.name == 'object')
            object.name.forEach((name: string) => addList(name, js, object));
          else addList(object.name, js, object);
        });
      })
    );
    //Initialisation des commandes dans l'
    try {
      console.log('Started refreshing application (/) commands.');
      await rest.put(
        Routes.applicationCommands(
          //FIXME
          //@ts-ignore
          process.env.ENV == 'DEV' ? process.env.APP_ID_DEV : process.env.APP_ID
        ),
        { body: commands }
      );
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
    //FIXME
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const events = (await import(`./Events/${f}`)).default;
    const event = f.split('.')[0];

    console.log(events);

    client.on(event, events.bind(null, client));
  });
});
