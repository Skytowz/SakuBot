import { ApplicationCommandOptionType, CommandInteraction } from 'discord.js';
import AbstractCommand from './AbstractCommand.js';
import TypeHelp from '../entity/typeHelp.js';
import SlashOption from '../utils/slashOption.js';
import { AppInstances } from '../types/AppInstances.js';
import EventError from '../errors/EventError.js';

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

  public async run(commandInteraction: CommandInteraction) {
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
    // FIXME: find a typesafe way to get the url
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const url = user?.avatarURL() ?? user?.user?.avatarURL();
    if (!url) {
      throw new EventError("Cet utilisateur n'as pas de photo de profil");
    }

    await commandInteraction.reply(url + '?size=4096');
  }
}
