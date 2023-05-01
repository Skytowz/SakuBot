/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Client, Colors, CommandInteraction } from 'discord.js';
import TypeHelp from '../entity/typeHelp.js';
import { getDateFromTimeStamp } from '../utils/dateUtils.js';
import Embed from '../utils/embed.js';
import SlashOption from '../utils/slashOption.js';

/**
 *
 * @param {Client} client
 * @param {CommandInteraction} interaction
 * @returns
 */
export const run = async (client: Client, interaction: CommandInteraction) => {
  let message;
  if (interaction.isMessageContextMenuCommand()) {
    message = interaction.targetId;
  } else {
    //FIXME
    //@ts-ignore
    message = interaction.options.getString('message');
  }
  const ids = [];
  if (message.startsWith('https://discord.com/channels')) {
    const args = message.split('/');
    if (args.length != 7) {
      return interaction.reply({
        content: "Erreur, le lien du message n'est pas valide",
        ephemeral: true,
      });
    } else {
      const idMsg = args.pop();
      ids.push(args.pop(), idMsg);
    }
  } else {
    if (!message.includes('-')) {
      message = interaction.channel?.id + '-' + message;
    } else if (message.split(/-/).length > 2)
      return interaction.reply({
        content:
          "Erreur, veuillez donnez l'id sous la forme <message-channel>-<message-message> ou le lien du message",
        ephemeral: true,
      });
    ids.push(...message.split(/-/));
  }

  const channel = await client.channels.fetch(ids[0]).catch((e) => {
    console.log(e);
    return 'ERROR';
  });
  if (channel == 'ERROR')
    return interaction.reply({
      content: 'Channel innexistant',
      ephemeral: true,
    });

  //FIXME
  //@ts-ignore
  const messageFetch = await channel?.messages
    .fetch(ids[1])
    .catch(() => 'ERROR');
  if (messageFetch == 'ERROR')
    return interaction.reply({
      content: 'Message innexistant',
      ephemeral: true,
    });

  const embed = new Embed()
    .setColor(Colors.Fuchsia)
    .setDescription(
      messageFetch.content + `\n\n[Aller au message](${messageFetch.url})`
    )
    .setAuthor(messageFetch.author)
    .setFooter(
      '#' +
        //FIXME
        //@ts-ignore
        channel.name +
        ' | ' +
        getDateFromTimeStamp(messageFetch.createdTimestamp)
    );

  if (messageFetch.attachments.size != 0) {
    if (messageFetch.attachments.first().contentType.startsWith('image'))
      embed.setImage(messageFetch.attachments.first().proxyURL);
  }

  const embeds = [embed];

  if (
    messageFetch.embeds &&
    messageFetch.embeds.length > 0 &&
    !(messageFetch.author.bot && messageFetch.embeds[0].title == null)
  ) {
    embeds.push(...messageFetch.embeds);
  }
  //FIXME
  //@ts-ignore
  interaction.reply({ embeds: embeds });
  //
  //     if(messageFetch.attachments.size != 0){
  //         if(messageFetch.attachments.first().contentType.startsWith("image")) embed.setImage(messageFetch.attachments.first().proxyURL);
  //     }
  //
  //
  //     const embeds = [embed];
  //
  //     if(messageFetch.embeds && messageFetch.embeds.length > 0 && !(messageFetch.author.bot && messageFetch.embeds[0].title == null)){
  //         embeds.push(...messageFetch.embeds);
  //     }
  //     interaction.reply({embeds:embeds})
  // };
};

export const help = {
  name: ['quote'],
  help: "Renvoie le contenu d'un message",
  cmd: 'q/quote ([<id-channel>-]<id-message> | <url-message>)',
  type: TypeHelp.Utils,
  args: [
    new SlashOption()
      .setName('message')
      .setDescription('ID ou lien du message à quote')
      .setRequired(true),
  ],
  slash: true,
  message: true,
};
