/* eslint-disable @typescript-eslint/ban-ts-comment */
import Chapitre from '../entity/Chapitre.js';
import superagent from 'superagent';
import AbstractService, { SERVICE_BEAN_TYPE } from './AbstractService.js';
import injector from 'wire-dependency-injection';
import { AttachmentBuilder } from 'discord.js';
import fetch from 'node-fetch';
import TeamBan from '../entity/TeamBan.js';

export default class MangadexService extends AbstractService {
  static {
    injector.instance(this.name, this, {
      category: SERVICE_BEAN_TYPE,
    });
  }

  public constructor() {
    super(MangadexService.name);
  }

  public async getChapitre(
    mangaId: string,
    numero: number,
    languages: Array<string>,
    bannedTeams: Array<TeamBan>
  ) {
    const idTeamBan = bannedTeams
      ?.filter((e) => e.isBan(numero))
      .map((e) => e.id);

    let offset = 0;
    let data;
    let result;
    if (!languages || languages.includes('fr')) {
      let URL = `https://api.mangadex.org/manga/${mangaId}/feed?translatedLanguage[]=fr&includeExternalUrl=0&limit=500`;
      idTeamBan?.forEach((teamId) => {
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
      (index) => `https://mangadex.org/chapter/${chapitre.id}/${index}`,
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
