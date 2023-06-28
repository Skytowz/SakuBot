/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  CommandInteraction,
  CacheType,
  Client,
  ApplicationCommandOptionType,
} from 'discord.js';
import AbstractCommand from './AbstractCommand.js';
import TypeHelp from '../entity/typeHelp.js';
import SlashOption from '../utils/slashOption.js';
import Canvas from '@napi-rs/canvas';
import { CommandManager } from '../CommandManager.js';
import pino from 'pino';

export default class ChadCommand extends AbstractCommand {
  public constructor(
    logger: pino.Logger,
    client: Client,
    commandManager: CommandManager
  ) {
    super(logger, client, commandManager, {
      name: ['chad'],
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
    });
  }

  public async run(commandInteraction: CommandInteraction<CacheType>) {
    let user;
    if (commandInteraction.isUserContextMenuCommand()) {
      user = commandInteraction.targetUser;
    } else if (
      commandInteraction.isChatInputCommand() &&
      commandInteraction.options.getMentionable('mention')
    ) {
      user = commandInteraction.options.getMentionable('mention');
    } else {
      user = commandInteraction.user;
    }
    const canvas = Canvas.createCanvas(678, 761);
    const context = canvas.getContext('2d');

    const background = await Canvas.loadImage(
      'https://media.discordapp.net/attachments/991387297767510167/1017410101574914088/unknown.png?width=498&height=559'
    );
    context.drawImage(background, 0, 0, canvas.width, canvas.height);

    const url =
      //@ts-ignore
      user?.avatarURL({ format: 'png' }) ??
      //@ts-ignore
      user?.user?.avatarURL({ format: 'png' });
    if (!url)
      return commandInteraction.reply({
        content: "Cet utilisateur n'as pas de photo de profil",
        ephemeral: true,
      });
    const avatar = await Canvas.loadImage(url + '?size=4096');
    context.drawImage(avatar, 150, 60, 390, 390);

    const buffer = await canvas.encode('png');
    commandInteraction.reply({ files: [buffer] });
  }
}
