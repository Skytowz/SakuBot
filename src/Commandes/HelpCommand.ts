/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  ActionRowBuilder,
  APIEmbed,
  Colors,
  CommandInteraction,
  EmbedBuilder,
  InteractionReplyOptions,
  SelectMenuBuilder,
} from 'discord.js';
import AbstractCommand from './AbstractCommand.js';
import TypeHelp from '../entity/typeHelp.js';
import { AppInstances } from '../AppInstances.js';

export default class HelpCommand extends AbstractCommand {
  public constructor(appInstances: AppInstances) {
    super(appInstances, {
      name: ['help'],
      cmd: 'help',
      type: TypeHelp.Utils,
      help: "Appel l'aide",
      slash: true,
    });
  }

  public async run(commandInteraction: CommandInteraction) {
    const mainEmbed = buildMainEmbed();

    const replyOptions: InteractionReplyOptions = {
      embeds: [mainEmbed],
      components: [],
    };

    const commandsWithHelp = this.getAppInstances()
      .commandManager.getAll()
      .filter(
        (command) => !command.getDetails().nohelp && command.getDetails().type
      );

    const typesHelps = TypeHelp.getValues();

    const typeHelpEmbeds = buildTypeHelpEmbeds(typesHelps, commandsWithHelp);

    const row = new ActionRowBuilder<SelectMenuBuilder>().addComponents(
      new SelectMenuBuilder().setCustomId('SelectHelp').setOptions(
        typesHelps.map(({ name }) => {
          return {
            label: name,
            value: name,
          };
        })
      )
    );
    replyOptions.components = [row];

    await commandInteraction.reply(replyOptions);

    const msg = await commandInteraction.fetchReply();
    const interact = msg.createMessageComponentCollector({ time: 180000 });
    interact.on('collect', (i) => {
      if (i.customId === 'SelectHelp') {
        i.update({
          embeds: [
            typeHelpEmbeds.find((embed) =>
              //@ts-ignore
              embed.data.description?.startsWith('**' + i.values)
            ) as APIEmbed,
          ],
        });
      }
    });
    interact.on('end', () => {
      msg.edit({ components: [] });
    });
  }
}

const buildMainEmbed = () => {
  return new EmbedBuilder()
    .setColor(Colors.DarkPurple)
    .setTitle('Help')
    .setThumbnail(
      'https://greeks.ufl.edu/wp-content/uploads/2019/10/noun_FAQ_793197.png'
    )
    .setDescription('Choose your help page below');
};

const buildTypeHelpEmbeds = (
  typeHelps: Array<TypeHelp>,
  commands: Array<AbstractCommand>
) => {
  const organisedTypeHelps = typeHelps.map((typeHelp) => {
    const filteredCommands = commands.filter(
      (command) => command.getDetails().type === typeHelp
    );
    return { type: typeHelp, commands: filteredCommands };
  });

  return organisedTypeHelps.map(({ type, commands }) =>
    new EmbedBuilder()
      .setColor(Colors.DarkPurple)
      .setTitle('Help')
      .setThumbnail(
        'https://greeks.ufl.edu/wp-content/uploads/2019/10/noun_FAQ_793197.png'
      )
      .setDescription(
        `**${type.name}**\n------------------------------\n${type.description}\n------------------------------`
      )
      .addFields(
        commands.map((v) => {
          return {
            name: '/' + v.getDetails().cmd,
            value: '> ' + v.getDetails().help + '.',
            inline: false,
          };
        })
      )
  );
};
