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
      name: ['pp'],
      help: "> Recupère la photo d'un profil de sois même ou d'un utilisateur",
      type: TypeHelp.Autre,
      cmd: 'pp [mentions]',
      args: [
        new SlashOption()
          .setName('mention')
          .setDescription('La personne')
          .setType(ApplicationCommandOptionType.Mentionable),
      ],
      slash: true,
      user: true,
    });
  }

  public async run(commandInteraction: CommandInteraction<CacheType>) {
    let user;
    if (commandInteraction.isUserContextMenuCommand()) {
      user = commandInteraction.targetUser;
    } else if (
      commandInteraction.isChatInputCommand() &&
      commandInteraction.options.getMentionable('mention')
    ) {
      user = commandInteraction.options.getMentionable('mention');
    } else {
      user = commandInteraction.user;
    }
    //@ts-ignore
    const url = user?.avatarURL() ?? user?.user?.avatarURL();
    if (!url)
      return commandInteraction.reply({
        content: "Cet utilisateur n'as pas de photo de profil",
        ephemeral: true,
      });
    await commandInteraction.reply(url + '?size=4096');
  }
}
