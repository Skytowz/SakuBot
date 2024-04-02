/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  ActionRowBuilder,
  BaseMessageOptions,
  ButtonBuilder,
  ButtonStyle,
  CommandInteraction,
  InteractionReplyOptions,
  Message,
  MessagePayload,
} from 'discord.js';
import Chapitre from '../entity/Chapitre.js';
import PageChapitreList from './pageChapitreList.js';

export const generateMagaViewerEmbeds = async (
  chapitre: Chapitre,
  page: number
) => {
  const pageChapitreList = chapitre.getPageChapitreList();

  if (page <= chapitre.nbPages && page > 0) {
    pageChapitreList.index = page - 1;
  }

  return pageChapitreList;
};

export const generateMangaViewerButtonBar = async (
  pageChapitreList: PageChapitreList
) => {
  const content = (await pageChapitreList.getContent()) as BaseMessageOptions;

  if (pageChapitreList.length > 1) {
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId('before')
        .setLabel('<')
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId('next')
        .setLabel('>')
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId('lock')
        .setLabel('🔒')
        .setStyle(ButtonStyle.Secondary)
    );
    content.components = [row];
  }

  return content;
};

export const initializeMangaViewerInterractions = async (
  commandInteraction: CommandInteraction,
  pageChapitreList: PageChapitreList
) => {
  const msg = await commandInteraction.fetchReply();
  initializeMangaViewerInterractionsWithMessage(
    msg,
    pageChapitreList,
    commandInteraction.user.id
  );
};

export const initializeMangaViewerInterractionsWithMessage = async (
  msg: Message,
  pageChapitreList: PageChapitreList,
  userId: String
) => {
  if (pageChapitreList.length > 1) {
    const interact = msg.createMessageComponentCollector({ time: 180000 });

    interact.on('collect', async (i) => {
      if (i.user.id != userId) {
        await i.reply({
          content: 'Tu ne peux pas utiliser cette commande',
          ephemeral: true,
        });
      } else if (i.customId === 'before') {
        //@ts-ignore
        pageChapitreList.left(i);
      } else if (i.customId === 'next') {
        //@ts-ignore
        pageChapitreList.right(i);
      } else if (i.customId === 'lock') {
        interact.stop();
      }
    });

    interact.on('end', async () => {
      await msg.edit({ components: [] });
    });
  }
};
