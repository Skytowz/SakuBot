/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Colors,
  SelectMenuBuilder,
  ActionRowBuilder,
  Client,
  CommandInteraction,
} from 'discord.js';
import fs from 'fs';
import TypeHelp from '../entity/typeHelp.js';
import Embed from '../utils/embed.js';
import { CommandDeclaration, CommandRun } from './Command.js';

export const run: CommandRun = async (
  client: Client,
  interaction: CommandInteraction
) => {
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
    const embeds = TypeHelp.getValues().map(([key, value, description]) => {
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
        TypeHelp.getValues().map(([key, value, description]) => {
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
    interaction.reply(content);
    const msg = await interaction.fetchReply();
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
    interact.on('end', (i) => {
      msg.edit({ components: [] });
    });
  });
};

export const help: CommandDeclaration = {
  name: ['help'],
  cmd: 'help',
  type: TypeHelp.Utils,
  help: "Appelle l'aide",
  slash: true,
};
