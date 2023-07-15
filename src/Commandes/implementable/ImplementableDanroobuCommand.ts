/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ApplicationCommandOptionType, CommandInteraction } from 'discord.js';
import SlashOption from '../../utils/slashOption.js';
import { ImplementableDanroobuCommandDetails } from '../../types/Command.js';
import AbstractCommand from '../AbstractCommand.js';
import TypeHelp from '../../entity/typeHelp.js';
import EventError from '../../errors/EventError.js';
import DanroobuService from '../../services/DanroobuService.js';
import injector, { ClassType } from 'wire-dependency-injection';

export default class ImplementableDanroobuCommand extends AbstractCommand<ImplementableDanroobuCommandDetails> {
  public static readonly abstractId = 'abstract.danroobu';

  private danroobuService?: DanroobuService = injector.autoWire(
    DanroobuService as ClassType,
    (b) => (this.danroobuService = b)
  );

  public constructor(details: ImplementableDanroobuCommandDetails) {
    super({
      // @ts-ignore
      id: ImplementableDanroobuCommand.abstractId,
      helpDescription: 'sert à donner un fanart donroobu aléatoire',
      args: [
        new SlashOption()
          .setName('solo')
          .setDescription('Solo')
          .setType(ApplicationCommandOptionType.Boolean),
        new SlashOption()
          .setName('sensitive')
          .setDescription('Sensitive')
          .setType(ApplicationCommandOptionType.Boolean),
      ],
      slashInteraction: true,
      type: TypeHelp.Character,
      ...details,
    });
  }

  public async run(commandInteraction: CommandInteraction) {
    const danroobuService = this.danroobuService as DanroobuService;
    if (!commandInteraction.isChatInputCommand()) {
      throw new EventError(
        "cette action ne peut être effectuée qu'avec une commande"
      );
    }
    const solo = !!commandInteraction.options.getBoolean('solo');
    const sensitive = !!commandInteraction.options.getBoolean('sensitive');
    const url = await danroobuService.getGeneralImageByTag(
      this.getDetails().options?.research as string,
      solo,
      sensitive
    );
    if (url && sensitive) {
      await commandInteraction.deferReply();
      await commandInteraction.editReply({
        files: [{ attachment: url, name: 'SPOILER_image.jpg', spoiler: true }],
      });
    } else if (url) {
      await commandInteraction.reply({ content: url });
    } else {
      await commandInteraction.reply({
        content: 'Aucune image trouvé',
        ephemeral: true,
      });
    }
  }
}
