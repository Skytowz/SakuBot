import Chapitre from '../entity/Chapitre.js';
import superagent from 'superagent';
import AbstractService, { SERVICE_BEAN_TYPE } from './AbstractService.js';
import injector from 'wire-dependency-injection';

export default class GistService extends AbstractService {
  static {
    injector.instance(this.name, this, {
      category: SERVICE_BEAN_TYPE,
    });
  }

  private CLIENT_ID = 'Client-ID b7c69d2903407d9';

  public constructor() {
    super(GistService.name);
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
    chapitre: { title: string; groups: Array<Array<string>> | object },
    number: number | string,
    cubariId: string
  ) {
    let pages = Object.values(chapitre.groups).pop();
    if (typeof pages === 'string') pages = await this.getPagesImgur(pages);
    return new Chapitre(
      pages as Array<string>,
      number as string,
      chapitre.title,
      (pages as Array<unknown>).length,
      (page) => page,
      (index) => `https://cubari.moe/read/gist/${cubariId}/${number}/${index}`,
      []
    );
  }

  public async getPagesImgur(proxy: string) {
    const idImgur: string | undefined = proxy.match(/\/([^/]*)$/)?.at(1);
    if (idImgur === undefined) throw new Error('Erreur au niveau du chapitre');
    return await fetch(`https://api.imgur.com/3/album/${idImgur}/images`, {
      method: 'get',
      headers: {
        Authorization: this.CLIENT_ID,
      },
    })
      .then((res) => res.json())
      .then((res) => res.data.map((e: any) => e.link));
  }
}
