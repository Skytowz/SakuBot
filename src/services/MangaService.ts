import AbstractService, { SERVICE_BEAN_TYPE } from './AbstractService.js';
import GistService from './GistService.js';
import MangadexService from './MangadexService.js';
import injector from 'wire-dependency-injection';

export interface ChapterFetchOptions {
  chapterId?: string;
  cubariId?: string;
  research?: string;
  chapterNumber?: number;
  bannedTeams?: Array<string>;
  languages?: Array<string>;
}

export default class MangaService extends AbstractService {
  static {
    injector.instance(this.name, this, {
      category: SERVICE_BEAN_TYPE,
      wiring: [MangadexService.name, GistService.name],
    });
  }

  public constructor(
    private mangadexService: MangadexService,
    private gistService: GistService
  ) {
    super(MangaService.name);
  }

  public async fetchChapter(options: ChapterFetchOptions) {
    let chapitre;
    if (options.chapterId) {
      const data = await this.mangadexService.getChapitreInfoById(
        options.chapterId
      );
      chapitre = await this.mangadexService.getChapitreById(data);
    } else {
      if (options.cubariId) {
        chapitre = await this.gistService.getChapitre(
          options.research as string,
          options.chapterNumber as number,
          options.cubariId
        );
      } else {
        chapitre = await this.mangadexService.getChapitre(
          options.research as string,
          options.chapterNumber as number,
          options.languages as Array<string>,
          options.bannedTeams as Array<string>
        );
      }
    }
    return chapitre;
  }
}
