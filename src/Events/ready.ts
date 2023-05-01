import { ActivityType, Client } from 'discord.js';

export default async (client: Client) => {
  client.user?.setActivity('Saku le best', { type: ActivityType.Playing });
};
