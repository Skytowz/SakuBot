/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  CommandInteraction,
  CacheType,
  Client,
  Colors,
  ActionRowBuilder,
  SelectMenuBuilder,
  APIEmbed,
} from 'discord.js';
import AbstractCommand from './AbstractCommand.js';
import TypeHelp from '../entity/typeHelp.js';
import Embed from '../utils/embed.js';
import fs from 'fs';
import { CommandManager } from '../CommandManager.js';
import pino from 'pino';

export default class HelpCommand extends AbstractCommand {
  public constructor(
    logger: pino.Logger,
    client: Client,
    commandManager: CommandManager
  ) {
    super(logger, client, commandManager, {
      name: ['help'],
      cmd: 'help',
      type: TypeHelp.Utils,
      help: "Appelle l'aide",
      slash: true,
    });
  }

  public async run(commandInteraction: CommandInteraction<CacheType>) {
    const help = new Embed()
      .setColor(Colors.DarkPurple)
      .setTitle('Help')
      .setThumbnail(
        'https://greeks.ufl.edu/wp-content/uploads/2019/10/noun_FAQ_793197.png'
      )
      .setDescription('Choose your help page below');

    const values = this.getCommandManager()
      .getAll()
      .filter(
        (command) => !command.getDetails().nohelp && command.getDetails().type
      );

    const embeds = TypeHelp.getValues().map(([, value, description]) => {
      return new Embed()
        .setColor(Colors.DarkPurple)
        .setTitle('Help')
        .setThumbnail(
          'https://greeks.ufl.edu/wp-content/uploads/2019/10/noun_FAQ_793197.png'
        )
        .setDescription(
          `**${value}**\n------------------------------\n${description}\n------------------------------`
        )
        .addFields(
          values
            .filter((v) => v.getDetails().type?.name == value)
            .map((v) => {
              return {
                name: '/' + v.getDetails().cmd,
                value: '> ' + v.getDetails().help + '.',
                inline: false,
              };
            })
        );
    });
    const content = { embeds: [help] };
    const row = new ActionRowBuilder().addComponents(
      new SelectMenuBuilder().setCustomId('SelectHelp').setOptions(
        TypeHelp.getValues().map(([, value]) => {
          return {
            label: value,
            value: value,
          };
        })
      )
    );
    //@ts-ignore
    content.components = [row];
    //@ts-ignore
    commandInteraction.reply(content);
    const msg = await commandInteraction.fetchReply();
    const interact = msg.createMessageComponentCollector({ time: 180000 });
    interact.on('collect', (i) => {
      if (i.customId === 'SelectHelp') {
        i.update({
          embeds: [
            embeds.find((v) =>
              //@ts-ignore
              v.description?.startsWith('**' + i.values)
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
