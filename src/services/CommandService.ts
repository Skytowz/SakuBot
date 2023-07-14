import {
  ApplicationCommandType,
  ContextMenuCommandBuilder,
  REST,
  Routes,
} from 'discord.js';
import AbstractCommand from '../Commandes/AbstractCommand.js';
import SlashCommand from '../utils/slashCommand.js';
import AbstractService, { SERVICE_BEAN_TYPE } from './AbstractService.js';
import injector from 'wire-dependency-injection';

export default class CommandService extends AbstractService {
  public async registerCommands(rest: REST, commands: Array<AbstractCommand>) {
    const convertedCommands = this.convertCommands(commands);

    await this.registerCommandsIdAPI(rest, convertedCommands);

    return convertedCommands;
  }

  public convertCommands(commands: Array<AbstractCommand>) {
    return commands.flatMap((command) =>
      (command.getDetails().name || []).flatMap((commandName) =>
        this.convertCommand(commandName, command)
      )
    );
  }

  public convertCommand(name: string, command: AbstractCommand) {
    const result: Array<SlashCommand | ContextMenuCommandBuilder> = [];
    if (!command.getDetails().nohelp) {
      if (command.getDetails().slashInteraction) {
        const slashCommand = new SlashCommand()
          .setName(name)
          .setOption(command.getDetails().args ?? []);
        if (command.getDetails().description) {
          slashCommand.setDescription(
            command.getDetails().description as string
          );
        }
        result.push(slashCommand);
      }
      if (command.getDetails().userInteraction) {
        result.push(
          new ContextMenuCommandBuilder()
            .setName(name)
            .setType(ApplicationCommandType.User)
        );
      }
      if (command.getDetails().messageInteraction) {
        result.push(
          new ContextMenuCommandBuilder()
            .setName(name)
            .setType(ApplicationCommandType.Message)
        );
      }
    }
    return result;
  }

  public async registerCommandsIdAPI(
    rest: REST,
    commands: Array<ContextMenuCommandBuilder | SlashCommand>
  ) {
    return rest.put(
      Routes.applicationCommands(
        (process.env.ENV == 'DEV'
          ? process.env.APP_ID_DEV
          : process.env.APP_ID) as string
      ),
      { body: commands }
    );
  }
}

injector.registerBean('commandService', CommandService, SERVICE_BEAN_TYPE);
