/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  ApplicationCommandOptionType,
  CacheType,
  CommandInteraction,
} from 'discord.js';
import AbstractCommand from './AbstractCommand.js';
import TypeHelp from '../entity/typeHelp.js';
import SlashOption from '../utils/slashOption.js';
import { AppInstances } from '../AppInstances.js';

export default class GetPPCommand extends AbstractCommand {
  public constructor(appInstances: AppInstances) {
    super(appInstances, {
      id: 'pp',
      name: ['pp'],
      description:
        "> Recupère la photo d'un profil de sois même ou d'un utilisateur",
      type: TypeHelp.Autre,
      args: [
        new SlashOption()
          .setName('mention')
          .setDescription('La personne')
          .setType(ApplicationCommandOptionType.Mentionable),
      ],
      slashInteraction: true,
      userInteraction: true,
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
      commandInteraction.reply({
        content: "Cet utilisateur n'as pas de photo de profil",
        ephemeral: true,
      });
    await commandInteraction.reply(url + '?size=4096');
  }
}
