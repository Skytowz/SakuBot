import AbstractService, { SERVICE_BEAN_TYPE } from './AbstractService.js';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} from 'discord.js';
import injector, { Bean, ClassType } from 'wire-dependency-injection';

export type SaucenaoSourceData = {
  title?: string;
  source?: string;
  index_name?: string;
  ext_url?: string;
  thumbnail?: string;
  similarity?: string;
  author_name?: string;
  author_url?: string;
  twitter_user_handle?: string;
  eng_name?: string;
  danbooru_id?: string;
  creator?: string;
  characters?: string;
};

type RawResult = Array<{
  data: { [key: string]: string };
  header: { [key: string]: string };
}>;

export default class SaucenaoService extends AbstractService {
  public constructor(bean: Bean) {
    super(bean.getId());
  }

  public async fetchSourceDataFromImageUrl(imageUrl: URL) {
    const response = await fetch(
      `https://saucenao.com/search.php?db=999&output_type=2&numres=50&api_key=4f94dcf41458ba2601b9d09fe7d4107a7afd9071&url=${encodeURIComponent(
        imageUrl.toString()
      )}`
    );
    const { results }: { results: RawResult } = await response.json();
    if (!results) {
      return;
    }

    results.sort(
      (a, b) => Number(b.header.similarity) - Number(a.header.similarity)
    );
    const res = results[0];
    return {
      ...res.data,
      ...res.header,
      ext_url: res.data.ext_urls && res.data.ext_urls[0],
    } as SaucenaoSourceData;
  }

  public convertImageSourceDataToEmbed(
    data: SaucenaoSourceData,
    requestingUserId: string
  ) {
    const embed = new EmbedBuilder()
      .setTitle(String(data.title ?? data.source ?? data.index_name))
      .setURL(String(data.ext_url ?? data.thumbnail))
      .setImage(String(data.thumbnail))
      .addFields(
        { name: 'Commande par :', value: `<@${requestingUserId}>` },
        {
          name: 'Similitude',
          value: `${data.similarity}%`,
        }
      );
    if (data.author_name) {
      embed.setAuthor({ name: data.author_name, url: data.author_url });
    } else if (data.twitter_user_handle) {
      embed.setAuthor({
        name: data.twitter_user_handle,
        url: `https://twitter.com/${data.twitter_user_handle}`,
      });
    } else if (data.eng_name) {
      embed.setAuthor({ name: data.eng_name, url: data.thumbnail });
    } else if (data.danbooru_id) {
      embed
        .setAuthor({ name: String(data.creator), url: data.ext_url })
        .setTitle(String(data.characters));
    }
    return embed;
  }

  public createButtonRowForImageSourceDataToEmbed(data: SaucenaoSourceData) {
    return new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setLabel('Voir')
        .setURL(String(data.ext_url ?? data.thumbnail))
        .setStyle(ButtonStyle.Link),
      new ButtonBuilder()
        .setCustomId('show')
        .setEmoji('👁')
        .setLabel('Afficher')
        .setStyle(ButtonStyle.Secondary)
    );
  }
}

injector.registerBean(
  SaucenaoService as ClassType,
  SaucenaoService.name,
  SERVICE_BEAN_TYPE
);
