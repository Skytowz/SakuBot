/* eslint-disable @typescript-eslint/ban-ts-comment */
import danbooru from './danroobu.data.js';
import { getGeneralImageByTag } from '../services/danroobuService';
import {
  ApplicationCommandOptionType,
  Client,
  CommandInteraction,
} from 'discord.js';
import SlashOption from '../utils/slashOption';

export const run = async (client: Client, interaction: CommandInteraction) => {
  // @ts-ignore
  const name = Object.values(danbooru).find((cmd) =>
    cmd.name.includes(interaction.commandName)
  );
  // @ts-ignore
  const sensitive = interaction.options.getBoolean('sensitive');
  const url = await getGeneralImageByTag(
    name.research,
    // @ts-ignore
    interaction.options.getBoolean('solo'),
    sensitive
  );
  if (url && sensitive) {
    await interaction.deferReply();
    interaction.editReply({
      files: [{ attachment: url, name: 'SPOILER_image.jpg', spoiler: true }],
    });
  } else if (url) {
    interaction.reply({ content: url });
  } else {
    interaction.reply({ content: 'Aucune image trouvé', ephemeral: true });
  }
};

export const help = {
  noHelp: true,
  slash: true,
  args: [
    new SlashOption('solo', 'Solo', ApplicationCommandOptionType.Boolean),
    new SlashOption(
      'sensitive',
      'Sensitive',
      ApplicationCommandOptionType.Boolean
    ),
  ],
};
