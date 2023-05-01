import { Client, CommandInteraction } from 'discord.js';
import TypeHelp from '../entity/typeHelp';

/**
 *
 * @param {Client} client
 * @param {CommandInteraction} interaction
 */
export const run = async (client: Client, interaction: CommandInteraction) => {
  if (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    !interaction.member.roles.cache.find(
      (e) => e.id == '780835397008621600' || '685583592084340740'
    )
  )
    return interaction.reply({
      content: 'Tu ne peux pas utiliser cette commande',
      ephemeral: true,
    });
  if (!interaction.isMessageContextMenuCommand())
    return interaction.reply({
      content: "Ceci n'est pas un message",
      ephemeral: true,
    });
  if (interaction.targetMessage.pinned)
    return interaction.reply({
      content: 'Le message est déjà pin',
      ephemeral: true,
    });

  interaction.targetMessage.pin(
    `<@${interaction.member.user.id}> a pin le message.`
  );
  await interaction.reply({
    content: `<@${interaction.member.user.id}> a pin un message.`,
  });
};

export const help = {
  name: ['pin'],
  help: '> pin le message',
  type: TypeHelp.Utils,
  cmd: 'pin',
  message: true,
};
