import { CommandInteraction, GuildMember } from 'discord.js';
import AbstractService from './AbstractService.js';
import { AppInstances } from '../types/AppInstances.js';
import EventError from '../errors/EventError.js';

export default class CommandInteractionService extends AbstractService {
  public constructor(appInstances: AppInstances) {
    super(appInstances);
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
