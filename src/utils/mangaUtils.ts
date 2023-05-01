/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  CommandInteraction,
} from 'discord.js';
import {
  getChapitre,
  getChapitreById,
  getChapitreInfoById,
} from '../services/mangadexService.js';
import { getChapitre as getChapitreMangaReader } from '../services/mangareaderService.js';
import { CommandDeclarationOptions } from '../Commandes/Command.js';

/**
 *
 * @param {CommandInteraction} interaction
 * @param {Array} args
 * @param {string} id
 * @param {string} [slug]
 * @returns
 */
export const send = async (
  interaction: CommandInteraction,
  chap: number | string,
  numero: number | string,
  {
    research,
    langue,
    idChap,
    mangaReader,
    options,
  }: {
    research?: string;
    langue: Array<string>;
    idChap?: string;
    mangaReader?: boolean;
    options?: CommandDeclarationOptions;
  }
) => {
  let chapitre;
  let defer = false;
  if (idChap) {
    const data = await getChapitreInfoById(idChap);
    chapitre = await getChapitreById(data);
    if (typeof chapitre == 'string')
      return interaction.reply({ content: chapitre, ephemeral: true });
  } else {
    if (!chap || chap == '' || Number.isNaN(chap))
      return interaction.reply({
        content: 'Veuillez rentrer un numéro de chapitre valide',
        ephemeral: true,
      });
    if (mangaReader) {
      interaction.deferReply();
      defer = true;
      chapitre = await getChapitreMangaReader(research as string, chap);
    } else {
      chapitre = await getChapitre(
        research as string,
        chap,
        options as CommandDeclarationOptions,
        langue
      );
    }
    if (typeof chapitre == 'string') {
      if (defer) {
        return interaction.channel?.send({
          content: chapitre,
          //@ts-ignore
          ephemeral: true,
        });
      }
      return interaction.reply({ content: chapitre, ephemeral: true });
    }
  }
  const embedList = chapitre.getEmbedList();

  if (
    numero &&
    numero != '' &&
    !Number.isNaN(numero) &&
    (numero as number) <= chapitre.nbPages &&
    (numero as number) > 0
  )
    embedList.index = (numero as number) - 1;

  const content = embedList.getContent() as any;

  if (chapitre.nbPages > 1) {
    const row = new ActionRowBuilder().addComponents(
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
  if (defer) {
    interaction.followUp(content);
  } else {
    interaction.reply(content);
  }
  const msg = await interaction.fetchReply();

  if (chapitre.nbPages > 1) {
    const interact = msg.createMessageComponentCollector({ time: 180000 });

    interact.on('collect', async (i) => {
      if (i.customId === 'before') {
        //@ts-ignore
        embedList.left(i);
      } else if (i.customId === 'next') {
        //@ts-ignore
        embedList.right(i);
      } else if (i.customId === 'lock') {
        interact.stop();
      }
    });

    interact.on('end', async (i) => {
      msg.edit({ components: [] });
    });
  }
};
