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

export default class GetPPCommand extends AbstractCommand {
  static {
    injector.instance(this.name, this, {
      category: COMMAND_BEAN_TYPE,
    });
  }

  public constructor() {
    super({
      id: 'pp',
      name: ['pp'],
      description:
        "Recupère la photo d'un profil de sois même ou d'un utilisateur",
      type: TypeHelp.Autre,
      args: [
        new SlashOption()
          .setName('mention')
          .setDescription('La personne')
          .setType(ApplicationCommandOptionType.Mentionable)
          .setRequired(true),
        new SlashOption()
          .setName('serveur')
          .setDescription('PP de serveur ou non')
          .setType(ApplicationCommandOptionType.Boolean),
      ],
      slashInteraction: true,
      userInteraction: true,
    });
  }

  public async run(commandInteraction: CommandInteraction) {
    let serveur = commandInteraction.options.get('serveur')?.value as boolean;
    let user: User | GuildMember;
    if (commandInteraction.isUserContextMenuCommand()) {
      if (commandInteraction.targetMember)
        user = commandInteraction.targetMember as GuildMember;
      else user = commandInteraction.user;
      serveur = true;
    } else if (
      commandInteraction.isChatInputCommand() &&
      commandInteraction.options.getMentionable('mention') &&
      commandInteraction.options.getMentionable('mention') instanceof
        GuildMember
    ) {
      user = commandInteraction.options.getMentionable(
        'mention'
      ) as GuildMember;
    } else {
      user = commandInteraction.user;
    }
    // FIXME: find a typesafe way to get the url
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore

    this.getLogger().info(serveur);

    let url;
    if (user) {
      if (user instanceof GuildMember && !serveur) user = user.user;
      url = user.displayAvatarURL();
    }
    if (!url) {
      throw new EventError("Cet utilisateur n'as pas de photo de profil");
    }

    await commandInteraction.reply(url + '?size=4096');
  }
}
