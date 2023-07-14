/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ApplicationCommandOptionType, CommandInteraction } from 'discord.js';
import AbstractCommand, { COMMAND_BEAN_TYPE } from './AbstractCommand.js';
import TypeHelp from '../entity/typeHelp.js';
import SlashOption from '../utils/slashOption.js';
import EventError from '../errors/EventError.js';
import injector from 'wire-dependency-injection';

const WHITELIST = ['452186417334976532', '273756946308530176'];

export default class ClearCommand extends AbstractCommand {
  public constructor() {
    super({
      id: 'clear',
      name: ['clear'],
      description: 'Clear un certain nombre de message',
      type: TypeHelp.Utils,
      args: [
        new SlashOption(
          'nombre',
          'Nombre de message à supprimer',
          ApplicationCommandOptionType.Integer,
          true
        ),
      ],
      slashInteraction: true,
    });
  }

  public async run(commandInteraction: CommandInteraction) {
    await commandInteraction.deferReply({ ephemeral: true });
    if (WHITELIST.includes(String(commandInteraction.member?.user.id))) {
      throw new EventError('Tu ne peux pas utiliser cette commande');
    }
    if (!commandInteraction.isChatInputCommand()) {
      throw new EventError(
        "cette action ne peut être effectuée qu'avec une commande"
      );
    }

    const nombre = commandInteraction.options.getInteger('nombre');
    commandInteraction.channel
      //@ts-ignore
      ?.bulkDelete(nombre)
      .then(() =>
        commandInteraction.followUp({
          content: 'Les messages ont bien été supprimé',
        })
      )
      .catch(() =>
        commandInteraction.followUp({
          content: 'Une erreur est survenu',
        })
      );
  }
}

injector.registerBean('clearCommand', ClearCommand, COMMAND_BEAN_TYPE);
