import Chapitre from '../entity/Chapitre.js';
import superagent from 'superagent';
import AbstractService from './AbstractService.js';
import { AppInstances } from '../types/AppInstances.js';

export default class GistService extends AbstractService {
  public constructor(appInstances: AppInstances) {
    super(appInstances);
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
