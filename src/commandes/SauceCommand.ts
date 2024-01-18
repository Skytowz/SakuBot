import { CommandInteraction } from 'discord.js';
import AbstractCommand, { COMMAND_BEAN_TYPE } from './AbstractCommand.js';
import TypeHelp from '../entity/typeHelp.js';
import SaucenaoService from '../services/SaucenaoService.js';
import EventError from '../errors/EventError.js';
import { extractUrlFromDiscordMessage } from '../utils/urlUtils.js';
import injector from 'wire-dependency-injection';

export default class SauceCommand extends AbstractCommand {
  static {
    injector.instance(this.name, this, {
      category: COMMAND_BEAN_TYPE,
      wiring: [SaucenaoService.name],
    });
  }

  public constructor(private saucenaoService: SaucenaoService) {
    super({
      id: 'sauce',
      name: ['sauce'],
      description: "Donne la source d'une image",
      type: TypeHelp.Utils,
      messageInteraction: true,
      slashInteraction: false,
    });
  }

  public async run(commandInteraction: CommandInteraction) {
    await commandInteraction.deferReply({ ephemeral: true });

    if (!commandInteraction.isMessageContextMenuCommand()) {
      throw new EventError("Ceci n'est pas un message");
    }

    const sourceImageUrl = extractUrlFromDiscordMessage(
      commandInteraction.targetMessage
    );

    if (!sourceImageUrl) {
      throw new EventError('Image ou lien incompatible');
    }

    let result;

    try {
      result =
        await this.saucenaoService.fetchSourceDataFromImageUrl(sourceImageUrl);
    } catch (e) {
      this.getLogger().error("Une erreur s'est produite");
      this.getLogger().error(e);
    }

    if (!result) {
      throw new EventError('Impossible de récupérer la source');
    }

    const embed = this.saucenaoService.convertImageSourceDataToEmbed(
      result,
      commandInteraction.user.id
    );

    const row =
      this.saucenaoService.createButtonRowForImageSourceDataToEmbed(result);

    await commandInteraction.followUp({
      embeds: [embed],
      components: [row],
    });

    const reply = await commandInteraction.fetchReply();
    const replyInteraction = reply.createMessageComponentCollector({
      time: 180000,
    });

    replyInteraction.on('collect', async (interaction) => {
      // when the user click on show, we remove the button row and the previous message content, then post the result publicly
      if (interaction.customId === 'show') {
        row.components.pop();
        await commandInteraction.deleteReply();
        await commandInteraction.targetMessage.reply({
          embeds: [embed],
          components: [row],
          allowedMentions: { repliedUser: false },
        });
      }
    });
  }
}
