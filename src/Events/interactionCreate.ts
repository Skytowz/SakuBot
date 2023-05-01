/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Client, CommandInteraction } from 'discord.js';

/**
 *
 * @param {Client} client
 * @param {CommandInteraction} interaction
 * @returns
 */
export default async (client: Client, interaction: CommandInteraction) => {
  if (interaction.isChatInputCommand() || interaction.isContextMenuCommand()) {
    const commande = interaction.commandName;
    //@ts-ignore
    const cmd = client.commands.get(commande);
    if (!cmd) return;

    cmd.run(client, interaction);
  }
};
