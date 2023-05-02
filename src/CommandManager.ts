import { REST } from 'discord.js';
import AbstractCommand from './Commandes/AbstractCommand.js';
import { registerCommands } from './services/commandService.js';

export class CommandManager {
  private commands: Array<AbstractCommand> = [];

  public constructor(commands: Array<AbstractCommand> = []) {
    if (commands) this.commands = commands;
  }

  public getAll() {
    return this.commands;
  }

  public getCommandIndex(command: AbstractCommand) {
    return this.commands.indexOf(command);
  }

  public haveCommand(command: AbstractCommand) {
    return this.getCommandIndex(command) !== -1;
  }

  public isCommandNameUsed(commandName: string) {
    return !!this.getCommandByName(commandName);
  }

  public isOneOfCommandNamesUsed(command: AbstractCommand) {
    return command
      .getDetails()
      .name?.some((commandName) => this.isCommandNameUsed(commandName));
  }

  public getCommandByName(commandName: string) {
    return this.commands.find((command) =>
      command.getDetails().name?.includes(commandName)
    );
  }

  public addCommand(command: AbstractCommand) {
    if (this.haveCommand(command) || this.isOneOfCommandNamesUsed(command))
      return false;
    return !!this.commands.push(command);
  }

  public removeCommand(command: AbstractCommand) {
    if (!this.haveCommand(command)) return false;
    return !!this.commands.splice(this.getCommandIndex(command), 1);
  }

  public async registerCommands(rest: REST) {
    return registerCommands(rest, this.commands);
  }
}
