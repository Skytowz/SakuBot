import { REST } from 'discord.js';
import AbstractCommand from './Commandes/AbstractCommand.js';
import { AppInstances } from './types/AppInstances.js';
import CommandService from './services/CommandService.js';

export class CommandManager {
  private appInstances!: AppInstances;
  private readonly commands;

  public constructor(
    appInstances?: AppInstances,
    commands: Array<AbstractCommand> = []
  ) {
    this.appInstances = appInstances as AppInstances;
    this.commands = commands;
  }

  public getAppInstances() {
    return this.appInstances;
  }

  public setAppInstances(appInstances: AppInstances) {
    this.appInstances = appInstances;
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
    const commandService = this.appInstances.serviceManager.getService(
      CommandService
    ) as CommandService;
    return commandService.registerCommands(rest, this.commands);
  }
}
