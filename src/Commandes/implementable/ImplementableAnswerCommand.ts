/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  CommandInteraction,
  InteractionReplyOptions,
  MessagePayload,
} from 'discord.js';
import { sample } from '../../utils/arrayUtils.js';
import { ImplementableAnswerCommandDetails } from '../../types/Command.js';
import AbstractCommand from '../AbstractCommand.js';
import { AppInstances } from '../../types/AppInstances.js';
import TypeHelp from '../../entity/typeHelp.js';

export default class ImplementableAnswerCommand extends AbstractCommand<ImplementableAnswerCommandDetails> {
  public static readonly abstractId = 'abstract.answer';

  public constructor(
    appInstances: AppInstances,
    details: ImplementableAnswerCommandDetails
  ) {
    super(appInstances, {
      // @ts-ignore
      id: ImplementableAnswerCommand.abstractId,
      slashInteraction: true,
      type: TypeHelp.Autre,
      ...details,
    });
  }

  public async run(commandInteraction: CommandInteraction) {
    await commandInteraction.reply(
      sample(
        this.getDetails().options?.messages as Array<
          string | InteractionReplyOptions | MessagePayload
        >
      )
    );
  }
}
