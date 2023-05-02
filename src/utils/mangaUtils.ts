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
import { CommandDeclarationOptions } from '../types/Command.js';
import { getChapitre as getChapitreGist } from '../services/gistService.js';

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
    cubari,
    options,
  }: {
    research?: string;
    langue?: Array<string>;
    idChap?: string;
    mangaReader: boolean;
    cubari: boolean;
    options?: CommandDeclarationOptions;
  }
) => {
  let chapitre;
  interaction.deferReply({ ephemeral: true });
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
    if (mangaReader) {
      interaction.deferReply();
      defer = true;
      chapitre = await getChapitreMangaReader(research as string, chap);
    } else if (cubari) {
      chapitre = await getChapitreGist(
        research as string,
        chap as string,
        cubari
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

  interaction.followUp(content);

  const msg = await interaction.fetchReply();

  if (chapitre.nbPages > 1) {
    const interact = msg.createMessageComponentCollector({ time: 180000 });

    interact.on('collect', async (i) => {
      if (i.user.id != interaction.user.id) {
        i.reply({
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

    interact.on('end', async (i) => {
      msg.edit({ components: [] });
    });
  }
};
