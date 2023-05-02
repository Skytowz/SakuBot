/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  CommandInteraction,
  CacheType,
  Client,
  ApplicationCommandOptionType,
} from 'discord.js';
import AbstractCommand from './AbstractCommand.js';
import TypeHelp from '../entity/typeHelp.js';
import SlashOption from '../utils/slashOption.js';

export default class GetPPCommand extends AbstractCommand {
  public constructor(client: Client) {
    super(client, {
      name: ['pin'],
      help: '> pin le message',
      type: TypeHelp.Utils,
      cmd: 'pin',
      slash: true,
      user: true,
    });
  }

  public async run(commandInteraction: CommandInteraction<CacheType>) {
    if (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      !interaction.member.roles.cache.find(
        (e: { id: string }) =>
          e.id == '780835397008621600' || '685583592084340740'
      )
    )
      return commandInteraction.reply({
        content: 'Tu ne peux pas utiliser cette commande',
        ephemeral: true,
      });
    if (!commandInteraction.isMessageContextMenuCommand())
      return commandInteraction.reply({
        content: "Ceci n'est pas un message",
        ephemeral: true,
      });
    if (commandInteraction.targetMessage.pinned)
      return commandInteraction.reply({
        content: 'Le message est d�j� pin',
        ephemeral: true,
      });

    commandInteraction.targetMessage.pin(
      `<@${commandInteraction.member?.user.id}> a pin le message.`
    );
    await commandInteraction.reply({
      content: `<@${commandInteraction.member?.user.id}> a pin un message.`,
    });
  }
}
