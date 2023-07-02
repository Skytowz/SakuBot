/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  CacheType,
  CommandInteraction,
  InteractionReplyOptions,
} from 'discord.js';
import { sample } from '../../utils/arrayUtils.js';
import { CommandDetails } from '../../types/Command.js';
import AbstractCommand from '../AbstractCommand.js';
import { AppInstances } from '../../AppInstances.js';
import TypeHelp from '../../entity/typeHelp.js';

export default class ImplementableAnswerCommand extends AbstractCommand {
  public static readonly abstractId = 'abstract.answer';

  public constructor(appInstances: AppInstances, details: CommandDetails) {
    super(appInstances, {
      // @ts-ignore
      id: ImplementableAnswerCommand.abstractId,
      slashInteraction: true,
      type: TypeHelp.Autre,
      ...details,
    });
  }

  public async run(commandInteraction: CommandInteraction<CacheType>) {
    await commandInteraction.reply(
      sample(this.getDetails().options?.send as Array<InteractionReplyOptions>)
    );
  }
}
