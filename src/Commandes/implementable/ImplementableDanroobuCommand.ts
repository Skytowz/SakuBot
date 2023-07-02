/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ApplicationCommandOptionType, CommandInteraction } from 'discord.js';
import SlashOption from '../../utils/slashOption.js';
import { CommandDetails } from '../../types/Command.js';
import AbstractCommand from '../AbstractCommand.js';
import { getGeneralImageByTag } from '../../services/danroobuService.js';
import { AppInstances } from '../../types/AppInstances.js';
import TypeHelp from '../../entity/typeHelp.js';
import EventError from '../../errors/EventError.js';

export default class ImplementableDanroobuCommand extends AbstractCommand {
  public static readonly abstractId = 'abstract.danroobu';

  public constructor(appInstances: AppInstances, details: CommandDetails) {
    super(appInstances, {
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
    if (!commandInteraction.isChatInputCommand()) {
      throw new EventError(
        "cette action ne peut être effectuée qu'avec une commande"
      );
    }
    const solo = !!commandInteraction.options.getBoolean('solo');
    const sensitive = !!commandInteraction.options.getBoolean('sensitive');
    const url = await getGeneralImageByTag(
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
