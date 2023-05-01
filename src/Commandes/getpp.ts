/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  ApplicationCommandOptionType,
  Client,
  CommandInteraction,
} from 'discord.js';
import TypeHelp from '../entity/typeHelp.js';
import SlashOption from '../utils/slashOption.js';

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
  //FIXME
  //@ts-ignore
  const url = user?.avatarURL() ?? user?.user?.avatarURL();
  if (!url)
    return interaction.reply({
      content: "Cet utilisateur n'as pas de photo de profil",
      ephemeral: true,
    });
  await interaction.reply(url + '?size=4096');
};

export const help = {
  name: ['pp'],
  help: "> Recupère la photo d'un profil de sois même ou d'un utilisateur",
  type: TypeHelp.Autre,
  cmd: 'pp [mentions]',
  args: [
    new SlashOption()
      .setName('mention')
      .setDescription('La personne')
      .setType(ApplicationCommandOptionType.Mentionable),
  ],
  slash: true,
  user: true,
};
