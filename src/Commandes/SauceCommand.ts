/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  CommandInteraction,
  CacheType,
  Client,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} from 'discord.js';
import AbstractCommand from './AbstractCommand.js';
import TypeHelp from '../entity/typeHelp.js';
import Embed from '../utils/embed.js';
import { request } from 'undici';
import { CommandManager } from '../CommandManager.js';

export default class SauceCommand extends AbstractCommand {
  public constructor(client: Client, commandManager: CommandManager) {
    super(client, commandManager, {
      name: ['sauce'],
      help: "> Donne la source d'une image",
      type: TypeHelp.Utils,
      cmd: 'sauce',
      message: true,
      slash: false,
    });
  }

  public async run(commandInteraction: CommandInteraction<CacheType>) {
    commandInteraction.deferReply({ ephemeral: true });

    if (!commandInteraction.isMessageContextMenuCommand())
      return commandInteraction.editReply({
        content: "Ceci n'est pas un message",
      });
    let img;
    let image;
    if (
      (img = commandInteraction.targetMessage.attachments.find((value) =>
        value.contentType?.includes('image')
      ))
    ) {
      image = img.url;
    } else if (isImgUrl(commandInteraction.targetMessage.content)) {
      image = commandInteraction.targetMessage.content;
    } else {
      return commandInteraction.editReply({
        content: "Ceci n'est pas une image",
      });
    }
    image = image.split('?')[0];
    if (!isImgUrl(image))
      return commandInteraction.editReply({
        content: 'Image ou lien incompatible',
      });

    const result = await fetch(
      `https://saucenao.com/search.php?db=999&output_type=2&numres=50&api_key=4f94dcf41458ba2601b9d09fe7d4107a7afd9071&url=${encodeURIComponent(
        image
      )}`
    );
    const { results } = await result.json();
    if (!results) {
      return commandInteraction.editReply({
        content: 'Image ou lien incompatible',
      });
    }
    results.sort((a: any, b: any) => b.header.similarity - a.header.similarity);
    const res = results[0];
    const embed = new Embed()
      .setTitle(res.data.title ?? res.data.source ?? res.header.index_name)
      .setUrl(res.data.ext_urls ? res.data.ext_urls[0] : res.header.thumbnail)
      .setImage(res.header.thumbnail)
      .addField('Similitude', `${res.header.similarity}%`);
    if (res.data.author_name) {
      embed.setAuthorNameUrl(res.data.author_name, res.data.author_url);
    } else if (res.data.twitter_user_handle) {
      embed.setAuthorNameUrl(
        res.data.twitter_user_handle,
        `https://twitter.com/${res.data.twitter_user_handle}`
      );
    } else if (res.data.eng_name) {
      embed.setAuthorNameUrl(res.data.eng_name, res.header.thumbnail);
    } else if (res.data.danbooru_id) {
      embed
        .setAuthorNameUrl(res.data.creator, res.data.ext_urls[0])
        .setTitle(res.data.characters);
    }
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel('Voir')
        .setURL(res.data.ext_urls ? res.data.ext_urls[0] : res.header.thumbnail)
        .setStyle(ButtonStyle.Link),
      new ButtonBuilder()
        .setCustomId('show')
        .setEmoji('👁')
        .setLabel('Afficher')
        .setStyle(ButtonStyle.Secondary)
    );

    commandInteraction.editReply({
      //@ts-ignore
      embeds: [embed],
      //@ts-ignore
      components: [row],
    });
    const msg = await commandInteraction.fetchReply();
    const interact = msg.createMessageComponentCollector({ time: 180000 });

    interact.on('collect', async (i) => {
      if (i.customId === 'show') {
        row.components.pop();
        i.update({ content: '-', embeds: [], components: [] });
        commandInteraction.editReply({
          //@ts-ignore
          embeds: [embed],
          //@ts-ignore
          components: [row],
          allowedMentions: { repliedUser: false },
        });
      }
    });
  }
}

const isImgUrl = (url: string) => {
  if (!validURL(url)) return false;
  return request(url).then(({ headers }) => {
    return headers['content-type']?.includes('image');
  });
};

const validURL = (str: string) => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // fragment locator
  return !!pattern.test(str);
};
