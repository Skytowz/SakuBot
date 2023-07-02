import { CacheType, CommandInteraction } from 'discord.js';
import AbstractCommand from './AbstractCommand.js';
import TypeHelp from '../entity/typeHelp.js';
import { sample } from '../utils/arrayUtils.js';
import { AppInstances } from '../AppInstances.js';
import EventError from '../errors/EventError.js';

const IMAGES = [
  'https://media.discordapp.net/attachments/991333308988395670/991448778395631726/IMG_20220402_184149.jpg',
  'https://media.discordapp.net/attachments/991333308988395670/991448778789888090/IMG_20220311_214535.jpg',
  'https://media.discordapp.net/attachments/991333308988395670/991449285809942628/20210629_225506.jpg',
  'https://media.discordapp.net/attachments/991333308988395670/991449449677209701/20211229_181714.jpg',
  'https://media.discordapp.net/attachments/991333308988395670/991449286212599949/20201111_211421.jpg',
  'https://media.discordapp.net/attachments/991333308988395670/991449449073217726/IMG_0398.jpg',
  'https://media.discordapp.net/attachments/991333308988395670/992525237407191102/IMG_20220421_002513.jpg',
];

const WHITELIST = ['713837802638278749', '273756946308530176'];

export default class GogoleCommand extends AbstractCommand {
  public constructor(appInstances: AppInstances) {
    super(appInstances, {
      id: 'gogole',
      name: ['gogole'],
      description: 'Commande gogole',
      type: TypeHelp.Autre,
      slashInteraction: true,
    });
  }

  public async run(commandInteraction: CommandInteraction<CacheType>) {
    if (!WHITELIST.includes(String(commandInteraction.member?.user.id))) {
      throw new EventError('Tu ne peux pas utiliser cette commande');
    }

    await commandInteraction.reply({ files: [sample(IMAGES)] });
  }
}
