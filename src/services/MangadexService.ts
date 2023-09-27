/* eslint-disable @typescript-eslint/ban-ts-comment */
import Chapitre from '../entity/Chapitre.js';
import superagent from 'superagent';
import AbstractService, { SERVICE_BEAN_TYPE } from './AbstractService.js';
import injector, { Bean } from 'wire-dependency-injection';
import { AttachmentBuilder } from 'discord.js';

export default class MangadexService extends AbstractService {
  public constructor(bean: Bean) {
    super(bean.getId());
  }

  public async getChapitre(
    mangaId: string,
    numero: number,
    languages: Array<string>,
    bannedTeams: Array<string>
  ) {
    let offset = 0;
    let data;
    let result;
    if (!languages || languages.includes('fr')) {
      let URL = `https://api.mangadex.org/manga/${mangaId}/feed?translatedLanguage[]=fr&includeExternalUrl=0&limit=500`;
      bannedTeams?.forEach((teamId) => {
        URL += `&excludedGroups[]=${teamId}`;
      });
      do {
        result = await superagent
          .get(`${URL}&offset=${offset * 500}`)
          .set('User-Agent', 'Hayasaku Bot');
        data = result.body.data.find(
          (element: { attributes: { chapter: string } }) =>
            element.attributes.chapter == String(numero)
        );
        offset++;
      } while (result.body.total > offset * 500 && typeof data == 'undefined');
    } else if (languages) {
      offset = 0;
      do {
        result = await superagent
          .get(
            `https://api.mangadex.org/manga/${mangaId}/feed?${languages
              .map((e) => `translatedLanguage[]=${e}&`)
              .join('')}includeExternalUrl=0&limit=500&offset=${offset * 500}`
          )
          .set('User-Agent', 'Hayasaku Bot')
          .catch((e) => console.error(e));
        data = result?.body.data.find(
          (element: { attributes: { chapter: string } }) =>
            element.attributes.chapter == String(numero) ||
            (numero == 1 && element.attributes.chapter == null)
        );
        offset++;
      } while (result?.body.total > offset * 500 && typeof data == 'undefined');
    }
    if (data === undefined) {
      throw new Error('invalid chapter');
    }
    return await this.getChapitreById(data);
  }

  public async getChapitreById(chapitre: {
    id: string;
    attributes: { chapter: number | string; title: string; pages: number };
  }) {
    const data = await superagent
      .get(
        `https://api.mangadex.org/at-home/server/${chapitre.id}?forcePort443=false`
      )
      .set('User-Agent', 'Hayasaku Bot')
      .then((res) => res.body.chapter);

    const files: Array<Promise<AttachmentBuilder>> = data.dataSaver.map(
      async (pageName: string) => {
        const img = await fetch(
          `https://uploads.mangadex.org/data-saver/${data.hash}/${pageName}`
        );
        return new AttachmentBuilder(Buffer.from(await img.arrayBuffer()), {
          name: `${pageName}.jpg`,
        });
      }
    );

    return new Chapitre(
      data.dataSaver,
      chapitre.attributes.chapter as string,
      chapitre.attributes.title,
      chapitre.attributes.pages,
      (page) => `attachment://${page}.jpg`,
      `https://mangadex.org/chapter/${chapitre.id}`,
      files
    );
  }

  public async getChapitreInfoById(id: string) {
    return await superagent
      .get(`https://api.mangadex.org/chapter/${id}`)
      .set('User-Agent', 'Hayasaku Bot')
      .then((res) => res.body.data);
  }
}

injector.registerBean(MangadexService, {
  type: SERVICE_BEAN_TYPE,
});
