import { BaseGuildTextChannel, Message, MessageReplyOptions } from 'discord.js';
import AbstractMessageHandler, {
  MESSAGE_HANDLER_BEAN_TYPE,
} from './AbstractMessageHandler.js';
import injector from 'wire-dependency-injection';
import { link } from 'fs';
import MangaService from '../../services/MangaService.js';
import {
  generateMagaViewerEmbeds,
  generateMangaViewerButtonBar,
  initializeMangaViewerInterractionsWithMessage,
} from '../../utils/mangaUtils.js';
import EventError from '../../errors/EventError.js';
import PageChapitreList from '../../utils/pageChapitreList.js';

export default class MangadexChapterLinkHandler extends AbstractMessageHandler {
  static {
    injector.instance(this.name, this, {
      category: MESSAGE_HANDLER_BEAN_TYPE,
      wiring: [MangaService.name],
    });
  }

  private lastTrigger: number | undefined;

  public constructor(private mangaService: MangaService) {
    super({
      id: 'MangadexChapterLink',
      regex: /https:\/\/mangadex\.org\/chapter\/[0-9a-zA-Z\-]+/m,
    });
  }

  public async run(message: Message) {
    const timeTrigger = new Date().getTime();

    if (this.lastTrigger && timeTrigger - this.lastTrigger < 10000) return;

    if (
      message.channel instanceof BaseGuildTextChannel &&
      message.channel.parentId &&
      ['714212170828742710', '805926040856952883'].includes(
        message.channel.parentId
      )
    )
      return;
    this.lastTrigger = timeTrigger;
    const linkInformation: RegExpMatchArray | null = message.content.match(
      /https:\/\/mangadex\.org\/chapter\/([0-9a-zA-Z\-]+)\/?([0-9]+)?/m
    );
    if (!linkInformation) {
      this.getLogger().error(message.content, 'Problème au niveau du match');
      return;
    }
    const id = linkInformation[1];
    const page = Number(linkInformation[2]);

    let embeds: PageChapitreList;
    try {
      const chapter = await this.mangaService.fetchChapter({
        chapterNumber: 0,
        chapterId: id,
      });
      embeds = await generateMagaViewerEmbeds(chapter, page);
    } catch (e) {
      this.getLogger().debug("une erreur s'est produite");
      this.getLogger().debug(e);
      throw new EventError('chapitre invalide');
    }

    const buttonBar = (await generateMangaViewerButtonBar(
      embeds
    )) as MessageReplyOptions;

    buttonBar.allowedMentions = { repliedUser: false };
    const msg = await message.reply(buttonBar);

    message.suppressEmbeds();

    await initializeMangaViewerInterractionsWithMessage(
      msg,
      embeds,
      message.author.id
    );
  }
}
