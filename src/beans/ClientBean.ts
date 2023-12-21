import injector from 'wire-dependency-injection';
import { Client } from 'discord.js';

export const registerClientBean = (client: Client) => {
  injector.declare('client', client);
};
