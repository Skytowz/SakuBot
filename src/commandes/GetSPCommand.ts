import {
  ApplicationCommandOptionType,
  CommandInteraction,
  GuildMember,
  User,
} from 'discord.js';
import AbstractCommand, { COMMAND_BEAN_TYPE } from './AbstractCommand.js';
import TypeHelp from '../entity/typeHelp.js';
import SlashOption from '../utils/slashOption.js';
import EventError from '../errors/EventError.js';
import injector from 'wire-dependency-injection';

export default class GetSPCommand extends AbstractCommand {
  static {
    injector.instance(this.name, this, {
      category: COMMAND_BEAN_TYPE,
    });
  }

  public constructor() {
    super({
      id: 'serverpic',
      name: ['serverpic'],
      description: "Recupère l'icone du serveur",
      type: TypeHelp.Autre,
      slashInteraction: true,
    });
  }

  public async run(commandInteraction: CommandInteraction) {
    let url = commandInteraction.guild?.iconURL();
    await commandInteraction.reply(url + '?size=4096');
  }
}
