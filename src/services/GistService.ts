import Chapitre from '../entity/Chapitre.js';
import superagent from 'superagent';
import AbstractService, { SERVICE_BEAN_TYPE } from './AbstractService.js';
import injector, { Bean, ClassType } from 'wire-dependency-injection';

export default class GistService extends AbstractService {
  public constructor(bean: Bean) {
    super(bean.getId());
  }

  public async getChapitre(manga: string, number: number, cubariId: string) {
    const chapitre = await superagent
      .get(manga)
      .set('accept', 'json')
      .then((res) => JSON.parse(res.text).chapters[number]);
    if (!chapitre) {
      throw new Error('invalid chapter');
    }
    return await this.getChapitreById(chapitre, number, cubariId);
  }

  public async getChapitreById(
    chapitre: { title: string; groups: Array<Array<string>> },
    number: number,
    cubariId: string
  ) {
    const pages = Object.values(chapitre.groups).pop();
    return new Chapitre(
      pages as Array<string>,
      number,
      chapitre.title,
      (pages as Array<unknown>).length,
      (page) => page,
      `https://cubari.moe/read/gist/${cubariId}/${number}`,
      []
    );
  }
}

injector.registerBean(
  GistService as ClassType,
  GistService.name,
  SERVICE_BEAN_TYPE
);
