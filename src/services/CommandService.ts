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
import { DiagnosticsChannel } from 'undici';
import Error = DiagnosticsChannel.Error;

export default class CommandService extends AbstractService {
  static {
    injector.instance(this.name, this, {
      category: SERVICE_BEAN_TYPE,
      wiring: ['discordRest'],
    });
  }

  private registerCommandQueue: Array<{
    command: AbstractCommand;
    callback: (error?: Error) => unknown;
  }> = [];

  private registerCommandQueueTimer = setTimeout(() => {
    /**/
  });

  public constructor(private discordRest: REST) {
    super(CommandService.name);
  }

  public executeRegisterCommandQueue() {
    const commands = this.registerCommandQueue.map(
      (element) => element.command
    );
    const callbacks = this.registerCommandQueue.map(
      (element) => element.callback
    );
    this.registerCommands(commands)
      .then(() => callbacks.forEach((c) => c()))
      .catch((error) => callbacks.forEach((c) => c(error)));
  }

  public addToRegisterCommandQueue(
    command: AbstractCommand,
    callback: (error?: Error) => unknown
  ) {
    this.registerCommandQueue.push({ command: command, callback: callback });
    clearTimeout(this.registerCommandQueueTimer);
    this.registerCommandQueueTimer = setTimeout(() => {
      this.executeRegisterCommandQueue();
    }, 500);
  }

  public async registerCommand(command: AbstractCommand) {
    return new Promise((resolve, reject) => {
      this.addToRegisterCommandQueue(command, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(command);
        }
      });
    });
  }

  public async registerCommands(commands: Array<AbstractCommand>) {
    const convertedCommands = this.convertCommands(commands);

    await this.registerCommandsIdAPI(convertedCommands);

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
    commands: Array<ContextMenuCommandBuilder | SlashCommand>
  ) {
    return this.discordRest.put(
      Routes.applicationCommands(
        (process.env.ENV == 'DEV'
          ? process.env.APP_ID_DEV
          : process.env.APP_ID) as string
      ),
      { body: commands }
    );
  }
}
