/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  getChapitre,
  getChapitreById,
  getChapitreInfoById,
} from '../services/mangadexService.js';
import { CommandDeclarationOptions } from '../types/Command.js';
import { getChapitre as getChapitreGist } from '../services/gistService.js';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  CommandInteraction,
  InteractionReplyOptions,
} from 'discord.js';
import EmbedList from './embedList.js';

export const generateMagaViewerEmbeds = async (
  chap: number,
  number: number,
  {
    research,
    langue,
    idChap,
    isCubari,
    options,
  }: {
    research?: string;
    langue?: Array<string>;
    idChap?: string;
    isCubari?: boolean;
    options?: CommandDeclarationOptions;
  }
) => {
  let chapitre;
  if (idChap) {
    const data = await getChapitreInfoById(idChap);
    chapitre = await getChapitreById(data);
  } else {
    if (isCubari) {
      chapitre = await getChapitreGist(research as string, chap, isCubari);
    } else {
      chapitre = await getChapitre(
        research as string,
        chap,
        options as CommandDeclarationOptions,
        langue || []
      );
    }
  }
  const embedList = chapitre.getEmbedList();

  if (number <= chapitre.nbPages && number > 0) {
    embedList.index = number - 1;
  }

  return embedList;
};

export const generateMangaViewerButtonBar = (embedList: EmbedList) => {
  const content = embedList.getContent() as InteractionReplyOptions;

  if (embedList.length > 1) {
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
  embedList: EmbedList
) => {
  const msg = await commandInteraction.fetchReply();

  if (embedList.length > 1) {
    const interact = msg.createMessageComponentCollector({ time: 180000 });

    interact.on('collect', async (i) => {
      if (i.user.id != commandInteraction.user.id) {
        await i.reply({
          content: 'Tu ne peux pas utiliser cette commande',
          ephemeral: true,
        });
        return;
      } else if (i.customId === 'before') {
        //@ts-ignore
        embedList.left(i);
      } else if (i.customId === 'next') {
        //@ts-ignore
        embedList.right(i);
      } else if (i.customId === 'lock') {
        interact.stop();
      }
    });

    interact.on('end', async () => {
      await msg.edit({ components: [] });
    });
  }
};
