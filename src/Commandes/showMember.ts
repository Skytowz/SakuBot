import injector from 'wire-dependency-injection';
import AbstractCommand, { COMMAND_BEAN_TYPE } from './AbstractCommand.js';
import TypeHelp from '../entity/typeHelp.js';
import SlashOption from '../utils/slashOption.js';
import {
  ActionRowBuilder,
  ApplicationCommandOptionType,
  ButtonBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
  Colors,
  CommandInteraction,
  Guild,
  GuildMember,
  InteractionReplyOptions,
  Role,
} from 'discord.js';
import Embed from '../utils/embed.js';
import EmbedList from '../utils/embedList.js';

export default class ShowMember extends AbstractCommand {
  public constructor() {
    super({
      id: 'members',
      name: ['members'],
      description: 'Affiche les membres du serveurs',
      type: TypeHelp.Utils,
      slashInteraction: true,
      args: [
        new SlashOption()
          .setName('role')
          .setDescription('Role des membres')
          .setRequired(true)
          .setType(ApplicationCommandOptionType.Role),
      ],
    });
  }

  private static MEMBER_BY_PAGE = 15;

  public async run(commandInteraction: CommandInteraction) {
    if (!commandInteraction.isChatInputCommand()) {
      commandInteraction.reply({ content: 'ERROR', ephemeral: true });
      return;
    }
    const role: Role = commandInteraction.options.getRole('role') as Role;
    const guild = commandInteraction.guild;
    if (guild == null) {
      commandInteraction.reply({ content: 'ERROR', ephemeral: true });
      return;
    }
    await commandInteraction.deferReply();
    await guild.members.fetch();
    const members = role.members;
    const embeds: Embed[] = [];
    const embedsSize = Math.ceil(members.size / ShowMember.MEMBER_BY_PAGE);
    for (let i = 0; i < members.size; i += ShowMember.MEMBER_BY_PAGE) {
      const iteration = Math.ceil(i / ShowMember.MEMBER_BY_PAGE) + 1;
      const embed = new Embed();
      embed.setColor(role.color);
      embed.setTitle(role.name);
      embed.setFooter(
        `${members.size} membres\nPage ${iteration}/${embedsSize}`
      );
      let description = '';
      for (
        let j = i;
        j < i + ShowMember.MEMBER_BY_PAGE && j < members.size;
        j++
      ) {
        const member = members.at(j);
        if (!member) continue;
        description += `- <@${member.id}> : ${member.user.username}\n`;
      }
      embed.setDescription(description);
      embeds.push(embed);
    }
    if (embeds.length == 0) {
      await commandInteraction.deleteReply();
      commandInteraction.followUp({
        content: `Il n'y a aucun membre avec le rôle <@&${role.id}>`,
        ephemeral: true,
      });
      return;
    }
    const embedList = new EmbedList(embeds, embeds.length, 0, []);
    const message = await this.generateEmbedListMessage(embedList);
    await commandInteraction.followUp(message);
    await this.initializeEmbedListInterractions(commandInteraction, embedList);
  }

  private generateEmbedListMessage = async (embedList: EmbedList) => {
    const content = (await embedList.getContent()) as InteractionReplyOptions;

    if (embedList.length > 1) {
      const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder()
          .setCustomId('before')
          .setLabel('<')
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setCustomId('next')
          .setLabel('>')
          .setStyle(ButtonStyle.Secondary)
      );
      content.ephemeral = false;
      content.components = [row];
    }
    return content;
  };

  private initializeEmbedListInterractions = async (
    commandInteraction: CommandInteraction,
    embedList: EmbedList
  ) => {
    const msg = await commandInteraction.fetchReply();

    if (embedList.length > 1) {
      const interact = msg.createMessageComponentCollector({ time: 180000 });

      interact.on('collect', async (i) => {
        if (i.user.id != commandInteraction.user.id) {
          await i.reply({
            content: 'Tu ne peux pas utiliser cette commande',
            ephemeral: true,
          });
          return;
        } else if (i.customId === 'before') {
          //@ts-ignore
          embedList.left(i);
        } else if (i.customId === 'next') {
          //@ts-ignore
          embedList.right(i);
        }
      });

      interact.on('end', async () => {
        await msg.edit({ components: [] });
      });
    }
  };
}

injector.registerBean(ShowMember, { type: COMMAND_BEAN_TYPE });
