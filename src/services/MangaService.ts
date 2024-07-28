import TeamBan from '../entity/TeamBan.js';
import AbstractService, { SERVICE_BEAN_TYPE } from './AbstractService.js';
import GistService from './GistService.js';
import MangadexService from './MangadexService.js';
import injector from 'wire-dependency-injection';
import MangaseeService from './MangaseeService.js';

export interface ChapterFetchOptions {
  chapterId?: string;
  cubariId?: string;
  research?: string;
  chapterNumber?: number;
  bannedTeams?: Array<TeamBan>;
  languages?: Array<string>;
  mangasee?: boolean;
}

export default class MangaService extends AbstractService {
  static {
    injector.instance(this.name, this, {
      category: SERVICE_BEAN_TYPE,
      wiring: [MangadexService.name, GistService.name, MangaseeService.name],
    });
  }

  public constructor(
    private mangadexService: MangadexService,
    private gistService: GistService,
    private mangaseeService: MangaseeService
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
      } else if (options.mangasee) {
        chapitre = await this.mangaseeService.getChapitre(
          options.research as string,
          options.chapterNumber as number
        );
      } else {
        chapitre = await this.mangadexService.getChapitre(
          options.research as string,
          options.chapterNumber as number,
          options.languages as Array<string>,
          options.bannedTeams as Array<TeamBan>
        );
      }
    }
    return chapitre;
  }
}
