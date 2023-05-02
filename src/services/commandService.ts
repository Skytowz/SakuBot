import {
  ApplicationCommandType,
  ContextMenuCommandBuilder,
  REST,
  Routes,
} from 'discord.js';
import AbstractCommand from '../Commandes/AbstractCommand.js';
import SlashCommand from '../utils/slashCommand.js';

export const registerCommands = async (
  rest: REST,
  commands: Array<AbstractCommand>
) => {
  const convertedCommands = convertCommands(commands);

  await registerCommandsIdAPI(rest, convertedCommands);

  return convertedCommands;
};

export const convertCommands = (commands: Array<AbstractCommand>) => {
  return commands.flatMap((command) =>
    (command.getDetails().name || []).flatMap((commandName) =>
      convertCommand(commandName, command)
    )
  );
};

export const convertCommand = (name: string, command: AbstractCommand) => {
  const result: Array<SlashCommand | ContextMenuCommandBuilder> = [];
  if (!command.getDetails().nohelp) {
    if (command.getDetails().slash) {
      result.push(
        new SlashCommand()
          .setName(name)
          .setDescription(command.getDetails().help as string)
          .setOption(command.getDetails().args ?? [])
      );
    }
    if (command.getDetails().user) {
      result.push(
        new ContextMenuCommandBuilder()
          .setName(name)
          .setType(ApplicationCommandType.User)
      );
    }
    if (command.getDetails().message) {
      result.push(
        new ContextMenuCommandBuilder()
          .setName(name)
          .setType(ApplicationCommandType.Message)
      );
    }
  }
  return result;
};

export const registerCommandsIdAPI = async (
  rest: REST,
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
