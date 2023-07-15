import AbstractService, { SERVICE_BEAN_TYPE } from './AbstractService.js';
import GistService from './GistService.js';
import MangadexService from './MangadexService.js';
import injector, { Bean, ClassType } from 'wire-dependency-injection';

export interface ChapterFetchOptions {
  chapterId?: string;
  cubariId?: string;
  research?: string;
  chapterNumber?: number;
  bannedTeams?: Array<string>;
  languages?: Array<string>;
}

export default class MangaService extends AbstractService {
  public constructor(bean: Bean) {
    super(bean.getId());
  }

  private mangadexService?: MangadexService = injector.autoWire(
    MangadexService as ClassType,
    (b) => (this.mangadexService = b)
  );
  private gistService?: GistService = injector.autoWire(
    GistService as ClassType,
    (b) => (this.gistService = b)
  );

  public async fetchChapter(options: ChapterFetchOptions) {
    const mangadexService = this.mangadexService as MangadexService;
    const gistService = this.gistService as GistService;
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

injector.registerBean(
  MangaService as ClassType,
  MangaService.name,
  SERVICE_BEAN_TYPE
);
