/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Client, CommandInteraction } from 'discord.js';
import answers from './answer.data.js';

export const run = async (client: Client, interaction: CommandInteraction) => {
  const answer = Object.values(answers).find((answer) =>
    answer.name.includes(interaction.commandName)
  );
  //FIXME
  //@ts-ignore
  interaction.reply(answer?.send.sample());
};

export const help = {
  noHelp: true,
};
