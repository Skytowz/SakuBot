import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  CommandInteraction,
  EmbedBuilder,
  Message,
} from 'discord.js';
import AbstractCommand from './AbstractCommand.js';
import TypeHelp from '../entity/typeHelp.js';
import { request } from 'undici';
import { AppInstances } from '../AppInstances.js';
import {
  fetchSourceDataFromImageUrl,
  SourceData,
} from '../services/saucenaoService.js';
import EventError from '../errors/EventError.js';

export default class SauceCommand extends AbstractCommand {
  public constructor(appInstances: AppInstances) {
    super(appInstances, {
      name: ['sauce'],
      help: "> Donne la source d'une image",
      type: TypeHelp.Utils,
      cmd: 'sauce',
      message: true,
      slash: false,
    });
  }

  public async run(commandInteraction: CommandInteraction) {
    await commandInteraction.deferReply({ ephemeral: true });

    if (!commandInteraction.isMessageContextMenuCommand()) {
      throw new EventError("Ceci n'est pas un message");
    }

    const sourceImageUrl = extractUrlFromMessage(
      commandInteraction.targetMessage
    );

    if (!sourceImageUrl) {
      throw new EventError('Image ou lien incompatible');
    }

    const result = await fetchSourceDataFromImageUrl(sourceImageUrl);

    if (!result) {
      throw new EventError('Impossible de récupérer la source');
    }

    const embed = convertImageSourceDataToEmbed(
      result,
      commandInteraction.user.id
    );

    const row = createButtonRowForImageSourceDataToEmbed(result);

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
        await interaction.update({ content: '-', embeds: [], components: [] });
        await commandInteraction.followUp({
          embeds: [embed],
          components: [row],
          ephemeral: false,
          allowedMentions: { repliedUser: false },
        });
      }
    });
  }
}

const createButtonRowForImageSourceDataToEmbed = (data: SourceData) => {
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
};

const convertImageSourceDataToEmbed = (
  data: SourceData,
  requestingUserId: string
) => {
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
};

const extractUrlFromMessage = (message: Message): string | undefined => {
  let sourceImage: string | undefined;

  const sourceImageAttachment = message.attachments.find((value) =>
    value.contentType?.includes('image')
  );

  if (sourceImageAttachment) {
    sourceImage = sourceImageAttachment.url;
  } else if (isImgUrl(message.content)) {
    sourceImage = message.content;
  }

  return sourceImage?.split('?')[0];
};

const isImgUrl = (url: string) => {
  if (!validURL(url)) return false;
  return request(url).then(({ headers }) => {
    return headers['content-type']?.includes('image');
  });
};

const validURL = (str: string): boolean => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // fragment locator
  return pattern.test(str);
};
