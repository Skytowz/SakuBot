import { CommandInteraction, CacheType, Client } from 'discord.js';
import AbstractCommand from './AbstractCommand.js';
import TypeHelp from '../entity/typeHelp.js';
import { getTimeLeft } from '../utils/dateUtils.js';
import { CommandManager } from '../CommandManager.js';
import pino from 'pino';

export default class OnkWhenCommand extends AbstractCommand {
  public constructor(
    logger: pino.Logger,
    client: Client,
    commandManager: CommandManager
  ) {
    super(logger, client, commandManager, {
      name: ['onkwhen'],
      help:
        'Dis combien de temps il reste avant le début du 1er episode de Oshi no Ko',
      type: TypeHelp.Autre,
      cmd: 'onkwhen',
      slash: true,
    });
  }

  public async run(commandInteraction: CommandInteraction<CacheType>) {
    const sortieOnk = new Date('2023-04-12T17:00:00');
    const now = new Date();

    const res = getTimeLeft(now, sortieOnk);
    await commandInteraction.reply(
      !res
        ? "L'épisode 1 est déjà sorti !"
        : 'Il reste' + res + " avant la sortie de l'épisode!"
    );
  }
}
