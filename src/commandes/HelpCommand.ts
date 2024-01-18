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
import AbstractCommand, { COMMAND_BEAN_TYPE } from './AbstractCommand.js';
import TypeHelp from '../entity/typeHelp.js';
import injector from 'wire-dependency-injection';

export default class HelpCommand extends AbstractCommand {
  static {
    injector.instance(this.name, this, {
      category: COMMAND_BEAN_TYPE,
    });
  }

  public constructor() {
    super({
      id: 'help',
      name: ['help'],
      type: TypeHelp.Utils,
      description: "Appel l'aide",
      slashInteraction: true,
    });
  }

  public async run(commandInteraction: CommandInteraction) {
    const mainEmbed = buildMainEmbed();

    const replyOptions: InteractionReplyOptions = {
      embeds: [mainEmbed],
      components: [],
    };

    const typesHelps = TypeHelp.getValues();

    const commands = injector.wire<Array<AbstractCommand>>({
      category: COMMAND_BEAN_TYPE,
    });

    const typeHelpEmbeds = buildTypeHelpEmbeds(typesHelps, commands);

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
            typeHelpEmbeds.find(
              (embed) =>
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
  const commandsWithHelp = commands.filter(
    (command) => !command.getDetails().nohelp && command.getDetails().type
  );
  const organisedTypeHelps = typeHelps.map((typeHelp) => {
    const filteredCommands = commandsWithHelp.filter(
      (command) => command.getDetails().type === typeHelp
    );
    return { type: typeHelp, commands: filteredCommands };
  });

  return organisedTypeHelps.map(({ type, commands }) => {
    const reduceCommands = reduceCommandsPerParentId(commands);
    const groupedCommandsByParentId = groupCommandsByParentId(commands);
    return new EmbedBuilder()
      .setColor(Colors.DarkPurple)
      .setTitle('Help')
      .setThumbnail(
        'https://greeks.ufl.edu/wp-content/uploads/2019/10/noun_FAQ_793197.png'
      )
      .setDescription(
        `**${type.name}**\n------------------------------\n${type.description}\n------------------------------`
      )
      .addFields(
        reduceCommands.map((command) => {
          return {
            name: generateCommandNamePlaceholder(command),
            value: generateCommandDescription(
              command,
              groupedCommandsByParentId.find(
                (c) => c.parentId === command.getDetails().parentId
              )?.commandsNames ?? []
            ),
            inline: false,
          };
        })
      );
  });
};

const generateCommandNamePlaceholder = (command: AbstractCommand) => {
  let placeholder = '/';
  if (command.getDetails().parentId) {
    placeholder += '{commande}';
  } else {
    placeholder += command.getDetails().name?.[0] ?? command.getDetails().id;
  }
  const args = command.getDetails().args ?? [];
  if (args.length > 0) {
    placeholder += ' ';
    placeholder += args
      .map((arg) =>
        arg.required ? '<' + arg.name + '>' : '[' + arg.name + ']'
      )
      .join(' ');
  }
  return placeholder;
};

const generateCommandDescription = (
  command: AbstractCommand,
  groupedCommandsNames: Array<string>
) => {
  let description = '> ';
  description +=
    command.getDetails().helpDescription ?? command.getDetails().description;
  if (groupedCommandsNames.length > 0) {
    description += ' ';
    description += `[${groupedCommandsNames.join(', ')}]`;
  }
  return description;
};

const groupCommandsByParentId = (commands: Array<AbstractCommand>) => {
  const reducedCommands = reduceCommandsPerParentId(commands);
  return reducedCommands
    .filter((command) => command.getDetails().parentId)
    .map((uniqCommand) => ({
      parentId: uniqCommand.getDetails().parentId as string,
      commandsNames: commands
        .filter(
          (command) =>
            command.getDetails().parentId &&
            command.getDetails().parentId === uniqCommand.getDetails().parentId
        )
        .map((command) => command.getDetails().name?.[0])
        .filter((name) => name !== undefined) as Array<string>,
    }));
};

const reduceCommandsPerParentId = (commands: Array<AbstractCommand>) => {
  return commands.filter(
    (command, index) =>
      !command.getDetails().parentId ||
      commands.findIndex(
        (sCommand) =>
          sCommand.getDetails().parentId === command.getDetails().parentId
      ) === index
  );
};
