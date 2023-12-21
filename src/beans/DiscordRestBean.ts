import injector from 'wire-dependency-injection';
import { REST } from 'discord.js';

export const registerDiscordRestBean = (rest: REST) => {
  injector.declare('discordRest', rest);
};
