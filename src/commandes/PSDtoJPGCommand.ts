import { CommandInteraction } from 'discord.js';
import AbstractCommand, { COMMAND_BEAN_TYPE } from './AbstractCommand.js';
import TypeHelp from '../entity/typeHelp.js';
import EventError from '../errors/EventError.js';
import { extractUrlsFromDiscordMessage } from '../utils/urlUtils.js';
import injector from 'wire-dependency-injection';
import superagent from 'superagent';
import { readPsd } from 'ag-psd';
import 'ag-psd/initialize-canvas.js';
import fs from 'fs';

export default class PSDtoJPGCommand extends AbstractCommand {
  static {
    injector.instance(this.name, this, {
      category: COMMAND_BEAN_TYPE,
    });
  }

  public constructor() {
    super({
      id: 'convertpsd',
      name: ['convertpsd'],
      description: 'Converti un PSD en JPG',
      type: TypeHelp.Utils,
      slashInteraction: false,
      messageInteraction: false,
    });
  }

  public async run(commandInteraction: CommandInteraction) {
    await commandInteraction.deferReply();

    if (!commandInteraction.isMessageContextMenuCommand()) {
      throw new EventError("Ceci n'est pas un message");
    }

    const urlImages = extractUrlsFromDiscordMessage(
      commandInteraction.targetMessage
    );

    if (!urlImages) {
      throw new EventError('Image ou lien incompatible');
    }
    const jpgBuffer = urlImages.map(async (sourceImageUrl) => {
      if (
        !sourceImageUrl.toString().endsWith('.psd') &&
        !sourceImageUrl.toString().match(/\.psd\?/g)
      ) {
        return undefined;
      }
      const response = await superagent.get(sourceImageUrl.toString()).buffer();
      const buffer = Buffer.from(response.body, 'binary');
      const psd = readPsd(buffer);
      if (!psd.children) {
        return undefined;
      }
      return (
        (psd.children[0].canvas ||
          psd.children[0]?.children?.at(0)?.canvas) as any
      )?.toBuffer();
    });
    const images = (await Promise.all(jpgBuffer)).filter((e) => e);
    await commandInteraction.followUp({
      files: images,
    });

    // try {
    //   result =
    //     await this.saucenaoService.fetchSourceDataFromImageUrl(sourceImageUrl);
    // } catch (e) {
    //   this.getLogger().error("Une erreur s'est produite");
    //   this.getLogger().error(e);
    // }

    // if (!result) {
    //   throw new EventError('Impossible de récupérer la source');
    // }

    // await commandInteraction.followUp({
    //   embeds: [embed],
    // });
  }
}
