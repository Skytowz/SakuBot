/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  Channel,
  Colors,
  CommandInteraction,
  EmbedBuilder,
  Message,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';
import AbstractCommand, { COMMAND_BEAN_TYPE } from './AbstractCommand.js';
import TypeHelp from '../entity/typeHelp.js';
import SlashOption from '../utils/slashOption.js';
import { getDateFromTimeStamp } from '../utils/dateUtils.js';
import FormatError from '../errors/FormatError.js';
import EventError from '../errors/EventError.js';
import injector from 'wire-dependency-injection';
import { mod } from '../utils/numberUtils.js';
import { MockAgent } from 'undici';

export default class QuoteCommand extends AbstractCommand {
  public constructor() {
    super({
      id: 'quote',
      name: ['quote'],
      description: "Renvoie le contenu d'un message",
      type: TypeHelp.Utils,
      args: [
        new SlashOption()
          .setName('message')
          .setDescription('ID ou lien du message à quote')
          .setRequired(true),
      ],
      slashInteraction: true,
      messageInteraction: true,
    });
  }

  public async run(commandInteraction: CommandInteraction) {
    let targetChannelId = commandInteraction.channel?.id;
    let targetMessageId;
    try {
      const parsedIds = parseIdsFromCommandInteraction(commandInteraction);
      targetChannelId = parsedIds.channelId ?? targetChannelId;
      targetMessageId = parsedIds.messageId;
    } catch (e) {
      if (e instanceof FormatError) {
        throw new EventError(e.message);
      }
      throw e;
    }

    if (!targetChannelId || !targetMessageId) {
      throw new EventError('Merci de préciser tout les arguments nécessaires.');
    }

    let targetChannel: Channel | null | undefined;
    try {
      targetChannel = await this.client?.channels.fetch(targetChannelId);
    } catch (e) {
      /* empty */
    }

    if (!targetChannel) {
      throw new EventError("le salon n'existe pas");
    }

    let targetMessage;
    try {
      //@ts-ignore pas le choix...
      targetMessage = await targetChannel.messages.fetch(targetMessageId);
    } catch (e) {
      /* empty */
    }

    if (!targetMessage) {
      throw new EventError("le message n'existe pas");
    }

    const embeds = convertTargetMessageToQuoteEmbeds(
      targetMessage,
      targetChannel
    );

    const row = createButtonRow();

    await commandInteraction.reply({ embeds: embeds, components: [row] });

    const reply = await commandInteraction.fetchReply();
    const replyInteraction = reply.createMessageComponentCollector({
      time: 180000,
    });

    replyInteraction.on('collect', collect);
  }
}

const convertTargetMessageToQuoteEmbeds = (
  targetMessage: Message,
  targetChannel: Channel
) => {
  const iconUrl = targetMessage.author.avatarURL();
  const mainEmbed = new EmbedBuilder()
    .setColor(Colors.Fuchsia)
    .setDescription(
      targetMessage.content + `\n\n[Aller au message](${targetMessage.url})`
    )
    .setAuthor({
      name: targetMessage.author.username,
      ...(iconUrl ? { iconURL: iconUrl } : {}),
    })
    .setFooter({
      text:
        '#' +
        //@ts-ignore
        targetChannel.name +
        ' | ' +
        getDateFromTimeStamp(targetMessage.createdTimestamp),
    });

  if (targetMessage.attachments.size != 0) {
    const firstAttachment = targetMessage.attachments.first();
    if (firstAttachment?.contentType?.startsWith('image')) {
      mainEmbed.setImage(firstAttachment.proxyURL);
    }
  }

  const embeds = [mainEmbed];

  if (
    targetMessage.embeds &&
    targetMessage.embeds.length > 0 &&
    !(targetMessage.author.bot && targetMessage.embeds[0].title == null)
  ) {
    embeds.push(
      ...targetMessage.embeds.map((embed) => new EmbedBuilder(embed.data))
    );
  }
  return embeds;
};

type Ids = { messageId?: string; channelId?: string };

const parseIdsFromCommandInteraction = (
  commandInteraction: CommandInteraction
): Ids => {
  const ids: Ids = {};
  if (commandInteraction.isMessageContextMenuCommand()) {
    ids.messageId = commandInteraction.targetMessage.id;
  } else if (commandInteraction.isChatInputCommand()) {
    const argument = commandInteraction.options.getString('message') as string;
    let url;
    try {
      url = new URL(argument);
    } catch (e) {
      /* empty */
    }
    if (url?.host === 'discord.com' && url.pathname.startsWith('/channels')) {
      const splitIds = url.pathname.split('/');
      if (splitIds.length != 5) {
        throw new FormatError("le lien du message n'est pas valide");
      }
      ids.messageId = splitIds.pop();
      ids.channelId = splitIds.pop();
    } else if (url) {
      throw new FormatError("le lien du message n'est pas valide");
    } else {
      if (!argument.includes('-')) {
        ids.messageId = argument;
      } else if (argument.split(/-/).length != 2) {
        throw new FormatError(
          "veuillez donner l'id sous la forme <message-channel>-<message-message> ou le lien du message"
        );
      } else {
        const splitIds = argument.split(/-/);
        ids.channelId = splitIds[0];
        ids.messageId = splitIds[1];
      }
    }
  }
  return ids;
};

const createButtonRow = () => {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId('save')
      .setLabel('❤️')
      .setStyle(ButtonStyle.Secondary)
  );
};

const collect = async (interaction: ButtonInteraction) => {
  // when the user click on show, we remove the button row and the previous message content, then post the result publicly
  if (interaction.customId === 'save') {
    const modal = new ModalBuilder()
      .setCustomId('savequote')
      .setTitle('Sauvergarder');

    const nameInput = new TextInputBuilder()
      .setCustomId('name')
      .setLabel('Nom du favori')
      .setStyle(TextInputStyle.Short);

    const actionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(
      nameInput
    );

    modal.addComponents(actionRow);

    await interaction.showModal(modal);
  }
};

injector.registerBean(QuoteCommand, { type: COMMAND_BEAN_TYPE });
