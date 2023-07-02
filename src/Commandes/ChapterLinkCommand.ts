/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  ApplicationCommandOptionType,
  CacheType,
  CommandInteraction,
} from 'discord.js';
import AbstractCommand from './AbstractCommand.js';
import TypeHelp from '../entity/typeHelp.js';
import SlashOption from '../utils/slashOption.js';
import { generateMagaViewerEmbeds } from '../utils/mangaUtils.js';
import { AppInstances } from '../AppInstances.js';

export default class ChapterLinkCommand extends AbstractCommand {
  public constructor(appInstances: AppInstances) {
    super(appInstances, {
      name: ['chapter'],
      help: "Affiche n'importe quel chapitre de mangadex",
      type: TypeHelp.ViewManga,
      cmd: 'chapter',
      args: [
        new SlashOption(
          'url',
          'Lien mangadex',
          ApplicationCommandOptionType.String,
          true
        ),
        new SlashOption('page', 'Numéro de la page'),
      ],
      slash: true,
    });
  }

  public async run(commandInteraction: CommandInteraction<CacheType>) {
    //@ts-ignore
    const url = commandInteraction.options.getString('url');
    const id = url.match(/chapter\/([a-zA-Z0-9-]+)(\/?.*)/i)?.at(1);
    if (id && url.match(/mangadex.org\/chapter/)) {
      generateMagaViewerEmbeds(
        commandInteraction,
        //@ts-ignore
        null,
        //@ts-ignore
        commandInteraction.options.getString('page'),
        {
          idChap: id,
        }
      );
    } else {
      return commandInteraction.reply({
        content: 'Lien invalide',
        ephemeral: true,
      });
    }
  }
}
