import { CommandInteraction, GuildMemberRoleManager } from 'discord.js';
import AbstractCommand from './AbstractCommand.js';
import TypeHelp from '../entity/typeHelp.js';
import { AppInstances } from '../AppInstances.js';

const WHITELIST = ['780835397008621600', '685583592084340740'];

export default class GetPPCommand extends AbstractCommand {
  public constructor(appInstances: AppInstances) {
    super(appInstances, {
      name: ['pin'],
      help: '> pin le message',
      type: TypeHelp.Utils,
      cmd: 'pin',
      slash: false,
      message: true,
    });
  }

  public async run(commandInteraction: CommandInteraction) {
    if (
      !(commandInteraction.member
        ?.roles as GuildMemberRoleManager).cache.find(({ id }) =>
        WHITELIST.includes(id)
      )
    ) {
      await commandInteraction.reply({
        content: 'Tu ne peux pas utiliser cette commande',
        ephemeral: true,
      });
      return;
    }
    if (!commandInteraction.isMessageContextMenuCommand()) {
      await commandInteraction.reply({
        content: "Ceci n'est pas un message",
        ephemeral: true,
      });
      return;
    }
    if (commandInteraction.targetMessage.pinned) {
      await commandInteraction.reply({
        content: 'Le message est deja pin',
        ephemeral: true,
      });
      return;
    }

    await commandInteraction.targetMessage.pin(
      `<@${commandInteraction.member?.user.id}> a pin le message.`
    );
    await commandInteraction.reply({
      content: `<@${commandInteraction.member?.user.id}> a pin un message.`,
    });
  }
}
