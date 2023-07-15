import { CommandInteraction, GuildMember } from 'discord.js';
import AbstractService, { SERVICE_BEAN_TYPE } from './AbstractService.js';
import EventError from '../errors/EventError.js';
import injector, { Bean, ClassType } from 'wire-dependency-injection';

export default class CommandInteractionService extends AbstractService {
  public constructor(bean: Bean) {
    super(bean.getId());
  }

  public async getGuildMember(
    commandInteraction: CommandInteraction
  ): Promise<GuildMember | undefined> {
    const presumedGuildMember = await commandInteraction.guild?.members.fetch({
      user: commandInteraction.member?.user.id,
    });
    // noinspection SuspiciousTypeOfGuard
    if (presumedGuildMember instanceof GuildMember) {
      return presumedGuildMember as GuildMember;
    }
    return presumedGuildMember?.first();
  }

  public async checkDiscordGuildMember(commandInteraction: CommandInteraction) {
    const guildMember = await this.getGuildMember(commandInteraction);
    if (!guildMember) {
      throw new EventError('Nous ne parvenons pas a vous trouver');
    }
    return guildMember;
  }
}

injector.registerBean(
  CommandInteractionService as ClassType,
  CommandInteractionService.name,
  SERVICE_BEAN_TYPE
);
