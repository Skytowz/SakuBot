/* eslint-disable @typescript-eslint/ban-ts-comment */
import Canvas from '@napi-rs/canvas';
import {
  ApplicationCommandOptionType,
  Client,
  CommandInteraction,
} from 'discord.js';
import TypeHelp from '../entity/typeHelp.js';
import SlashOption from '../utils/slashOption.js';
/**
 *
 * @param {Client} client
 * @param {CommandInteraction} interaction
 */
export const run = async (client: Client, interaction: CommandInteraction) => {
  let user;
  if (interaction.isUserContextMenuCommand()) {
    user = interaction.targetUser;
  } else if (
    interaction.isChatInputCommand() &&
    interaction.options.getMentionable('mention')
  ) {
    user = interaction.options.getMentionable('mention');
  } else {
    user = interaction.user;
  }
  const canvas = Canvas.createCanvas(678, 761);
  const context = canvas.getContext('2d');

  const background = await Canvas.loadImage(
    'https://media.discordapp.net/attachments/991387297767510167/1017410101574914088/unknown.png?width=498&height=559'
  );
  context.drawImage(background, 0, 0, canvas.width, canvas.height);

  //FIXME
  const url =
    //@ts-ignore
    user?.avatarURL({ format: 'png' }) ??
    //@ts-ignore
    user?.user?.avatarURL({ format: 'png' });
  if (!url)
    return interaction.reply({
      content: "Cet utilisateur n'as pas de photo de profil",
      ephemeral: true,
    });
  const avatar = await Canvas.loadImage(url + '?size=4096');
  context.drawImage(avatar, 150, 60, 390, 390);

  const buffer = await canvas.encode('png');
  interaction.reply({ files: [buffer] });
};

export const help = {
  name: 'chad',
  help:
    "Envoie un photomontage de soit meme chad ou d'une personne tag en Chad",
  cmd: 'chad [tag]',
  type: TypeHelp.Autre,
  args: [
    new SlashOption()
      .setName('mention')
      .setDescription('Le chad')
      .setType(ApplicationCommandOptionType.Mentionable),
  ],
  slash: true,
  user: true,
};
