/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  CommandInteraction,
  InteractionReplyOptions,
} from 'discord.js';
import {
  getChapitre,
  getChapitreById,
  getChapitreInfoById,
} from '../services/mangadexService.js';
import { getChapitre as getChapitreMangaReader } from '../services/mangareaderService.js';
import { CommandDeclarationOptions } from '../types/Command.js';
import { getChapitre as getChapitreGist } from '../services/gistService.js';

export const send = async (
  interaction: CommandInteraction,
  chap: number | string,
  number: number | string,
  {
    research,
    langue,
    idChap,
    isMangeReader,
    isCubari,
    options,
  }: {
    research?: string;
    langue?: Array<string>;
    idChap?: string;
    isMangeReader?: boolean;
    isCubari?: boolean;
    options?: CommandDeclarationOptions;
  }
) => {
  let chapitre;
  await interaction.deferReply({ ephemeral: true });
  let defer = false;
  if (idChap) {
    const data = await getChapitreInfoById(idChap);
    chapitre = await getChapitreById(data);
    if (typeof chapitre == 'string')
      return interaction.channel?.send({ content: chapitre });
  } else {
    if (!chap || chap == '' || Number.isNaN(chap))
      return interaction.channel?.send({
        content: 'Veuillez rentrer un numéro de chapitre valide',
      });
    if (isMangeReader) {
      await interaction.deferReply();
      defer = true;
      chapitre = await getChapitreMangaReader(research as string, chap);
    } else if (isCubari) {
      chapitre = await getChapitreGist(
        research as string,
        chap as string,
        isCubari
      );
    } else {
      chapitre = await getChapitre(
        research as string,
        chap,
        options as CommandDeclarationOptions,
        langue || []
      );
    }
    if (typeof chapitre == 'string') {
      if (defer) {
        return interaction.channel?.send({
          content: chapitre,
        });
      }
      return interaction.channel?.send({ content: chapitre });
    }
  }
  const embedList = chapitre.getEmbedList();

  if (
    number &&
    number != '' &&
    !Number.isNaN(number) &&
    (number as number) <= chapitre.nbPages &&
    (number as number) > 0
  )
    embedList.index = (number as number) - 1;

  const content = embedList.getContent() as InteractionReplyOptions;

  if (chapitre.nbPages > 1) {
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

  await interaction.followUp(content);

  const msg = await interaction.fetchReply();

  if (chapitre.nbPages > 1) {
    const interact = msg.createMessageComponentCollector({ time: 180000 });

    interact.on('collect', async (i) => {
      if (i.user.id != interaction.user.id) {
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
