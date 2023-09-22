import { CommandInteraction, GuildMemberRoleManager } from 'discord.js';
import AbstractCommand, { COMMAND_BEAN_TYPE } from './AbstractCommand.js';
import TypeHelp from '../entity/typeHelp.js';
import EventError from '../errors/EventError.js';
import injector from 'wire-dependency-injection';

const WHITELIST = ['780835397008621600', '685583592084340740'];

export default class PinCommand extends AbstractCommand {
  public constructor() {
    super({
      id: 'pin',
      name: ['pin'],
      description: 'pin le message',
      type: TypeHelp.Utils,
      slashInteraction: false,
      messageInteraction: true,
    });
  }

  public async run(commandInteraction: CommandInteraction) {
    if (
      !(commandInteraction.member
        ?.roles as GuildMemberRoleManager).cache.find(({ id }) =>
        WHITELIST.includes(id)
      )
    ) {
      throw new EventError('Tu ne peux pas utiliser cette commande');
    }
    if (!commandInteraction.isMessageContextMenuCommand()) {
      throw new EventError("Ceci n'est pas un message");
    }
    if (!commandInteraction.targetMessage.pinned) {
      await commandInteraction.targetMessage.pin(
        `<@${commandInteraction.member?.user.id}> a pin le message.`
      );
      await commandInteraction.reply({
        content: `<@${commandInteraction.member?.user.id}> a pin un message.`,
        allowedMentions: { repliedUser: false },
      });
    } else {
      await commandInteraction.targetMessage.unpin(
        `<@${commandInteraction.member?.user.id}> a unpin le message.`
      );
      await commandInteraction.reply({
        content: `<@${commandInteraction.member?.user.id}> a unpin un message.`,
        allowedMentions: { repliedUser: false },
      });
    }
  }
}

injector.registerBean(PinCommand, { type: COMMAND_BEAN_TYPE });
