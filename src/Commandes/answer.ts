/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Client, CommandInteraction } from 'discord.js';
import answers from './answer.data.js';
import { CommandDeclaration, CommandRun } from './Command.js';
import { sample } from '../utils/arrayUtils.js';

export const run: CommandRun = async (
  client: Client,
  interaction: CommandInteraction
) => {
  const answer = Object.values(answers).find((answer) =>
    answer.name.includes(interaction.commandName)
  );
  //@ts-ignore
  interaction.reply(sample(answer?.send));
};

export const help: CommandDeclaration = {
  nohelp: true,
};
