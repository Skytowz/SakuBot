import { CommandInteraction, GuildMemberRoleManager } from 'discord.js';
import AbstractCommand from './AbstractCommand.js';
import TypeHelp from '../entity/typeHelp.js';
import { AppInstances } from '../AppInstances.js';
import EventError from '../errors/EventError.js';

const WHITELIST = ['780835397008621600', '685583592084340740'];

export default class GetPPCommand extends AbstractCommand {
  public constructor(appInstances: AppInstances) {
    super(appInstances, {
      id: 'pin',
      name: ['pin'],
      description: '> pin le message',
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
    if (commandInteraction.targetMessage.pinned) {
      throw new EventError('Le message est deja pin');
    }

    await commandInteraction.targetMessage.pin(
      `<@${commandInteraction.member?.user.id}> a pin le message.`
    );
    await commandInteraction.reply({
      content: `<@${commandInteraction.member?.user.id}> a pin un message.`,
    });
  }
}
