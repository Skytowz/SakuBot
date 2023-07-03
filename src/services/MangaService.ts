import AbstractService from './AbstractService.js';
import { AppInstances } from '../types/AppInstances.js';
import GistService from './GistService.js';
import MangadexService from './MangadexService.js';

export interface ChapterFetchOptions {
  chapterId?: string;
  cubariId?: string;
  research?: string;
  chapterNumber?: number;
  bannedTeams?: Array<string>;
  languages?: Array<string>;
}

export default class MangaService extends AbstractService {
  public constructor(appInstances: AppInstances) {
    super(appInstances);
  }

  public async fetchChapter(options: ChapterFetchOptions) {
    const mangadexService = this.getAppInstances().serviceManager.getService(
      MangadexService
    ) as MangadexService;
    const gistService = this.getAppInstances().serviceManager.getService(
      GistService
    ) as GistService;
    let chapitre;
    if (options.chapterId) {
      const data = await mangadexService.getChapitreInfoById(options.chapterId);
      chapitre = await mangadexService.getChapitreById(data);
    } else {
      if (options.cubariId) {
        chapitre = await gistService.getChapitre(
          options.research as string,
          options.chapterNumber as number,
          options.cubariId
        );
      } else {
        chapitre = await mangadexService.getChapitre(
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
