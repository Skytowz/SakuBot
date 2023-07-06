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
    return (
      await commandInteraction.guild?.members.fetch({
        user: commandInteraction.member?.user.id,
      })
    )?.first();
  }

  public async checkDiscordGuildMember(commandInteraction: CommandInteraction) {
    const guildMember = await this.getGuildMember(commandInteraction);
    if (!guildMember) {
      throw new EventError('Nous ne parvenons pas � vous trouver');
    }
    return guildMember;
  }
}
