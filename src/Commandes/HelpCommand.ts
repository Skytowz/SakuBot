/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  CommandInteraction,
  CacheType,
  Client,
  Colors,
  ActionRowBuilder,
  SelectMenuBuilder,
} from 'discord.js';
import AbstractCommand from './AbstractCommand.js';
import TypeHelp from '../entity/typeHelp.js';
import Embed from '../utils/embed.js';
import fs from 'fs';

export default class HelpCommand extends AbstractCommand {
  public constructor(client: Client) {
    super(client, {
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

    fs.readdir('./dist/Commandes/', async (error, f) => {
      if (error) console.log(error);
      const values = (
        await Promise.all(
          f
            .filter((f) => f.match(/^(?:(?!(?:\.data)).)*\.js$/))
            .map((v) => import(`./${v}`))
        )
      )
        .map((v) => v.help)
        .filter((v) => !v.noHelp && v.type);
      const jsons = (
        await Promise.all(
          f.filter((f) => f.match(/\.data\.js$/)).map((v) => import(`./${v}`))
        )
      )
        .map((v) => v.default)
        .flatMap((json) =>
          Object.values(json).map((value) => {
            //@ts-ignore
            value.type = value.id
              ? TypeHelp.ViewManga
              : //@ts-ignore
                TypeHelp.getValue(value.type);
            return value;
          })
        );
      values.push(...jsons);
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
              .filter((v) => v.type.name == value)
              .map((v) => {
                return {
                  name: '/' + v.cmd,
                  value: '> ' + v.help + '.',
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
              //@ts-ignore
              embeds.find((v) => v.description.startsWith('**' + i.values)),
            ],
          });
        }
      });
      interact.on('end', () => {
        msg.edit({ components: [] });
      });
    });
  }
}
