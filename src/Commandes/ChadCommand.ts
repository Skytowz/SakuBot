import { ApplicationCommandOptionType, CommandInteraction, GuildMember } from 'discord.js';
import AbstractCommand from './AbstractCommand.js';
import TypeHelp from '../entity/typeHelp.js';
import SlashOption from '../utils/slashOption.js';
import Canvas from '@napi-rs/canvas';
import { AppInstances } from '../types/AppInstances.js';
import EventError from '../errors/EventError.js';

export default class ChadCommand extends AbstractCommand {
  public constructor(appInstances: AppInstances) {
    super(appInstances, {
      id: 'chad',
      name: ['chad'],
      description:
        'Envoie un photomontage de soit meme chad ou d\'une personne tag en Chad',
      type: TypeHelp.Autre,
      args: [
        new SlashOption()
          .setName('mention')
          .setDescription('Le chad')
          .setType(ApplicationCommandOptionType.Mentionable),
      ],
      slashInteraction: true,
      userInteraction: true,
    });
  }

  public async run(commandInteraction: CommandInteraction) {
    await commandInteraction.deferReply();
    let user;
    if (commandInteraction.isUserContextMenuCommand()) {
      user = commandInteraction.targetUser;
    } else if (
      commandInteraction.isChatInputCommand() &&
      commandInteraction.options.getMentionable('mention')
    ) {
      user = (commandInteraction.options.getMentionable('mention') as GuildMember).user;
    } else {
      user = commandInteraction.user;
    }

    const url = user.avatarURL({ extension: 'png' });
    if (!url) {
      throw new EventError('Cet utilisateur n\'as pas de photo de profil');
    }

    const canvas = Canvas.createCanvas(678, 761);

    const context = await initializeContext(canvas);

    await drawHead(context, url);

    const buffer = await canvas.encode('png');
    await commandInteraction.followUp({ files: [buffer] });
  }
}

const initializeContext = async (canvas: Canvas.Canvas) => {
  const context = canvas.getContext('2d');

  const background = await Canvas.loadImage(
    'https://media.discordapp.net/attachments/991387297767510167/1017410101574914088/unknown.png?width=498&height=559',
  );
  context.drawImage(background, 0, 0, canvas.width, canvas.height);
  return context;
};

const drawHead = async (context: Canvas.SKRSContext2D, url: string) => {
  const avatar = await Canvas.loadImage(url + '?size=4096');
  context.drawImage(avatar, 150, 60, 390, 390);
};
