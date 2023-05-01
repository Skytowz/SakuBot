/* eslint-disable @typescript-eslint/ban-ts-comment */
import Chapitre from '../entity/chapitre.js';
import superagent from 'superagent';

export const getChapitre = async (
  manga: string,
  numero: number | string,
  options: any,
  langue: Array<string>
) => {
  let offset = 0;
  let data;
  let result;
  if (!langue || langue.includes('fr')) {
    langue = langue?.filter((e) => e != 'fr');
    let URL = `https://api.mangadex.org/manga/${manga}/feed?translatedLanguage[]=fr&includeExternalUrl=0&limit=500`;
    if (options) {
      //FIXME
      //@ts-ignore
      options.banteam?.forEach((e) => {
        if (!e.from || numero > e.from) {
          URL += `&excludedGroups[]=${e.id}`;
        }
      });
    }
    do {
      result = await superagent.get(`${URL}&offset=${offset * 500}`);
      data = result.body.data.find(
        //FIXME
        //@ts-ignore
        (element) => element.attributes.chapter == numero
      );
      offset++;
    } while (result.body.total > offset * 500 && typeof data == 'undefined');
  } else if (langue && typeof data == 'undefined') {
    offset = 0;
    do {
      result = await superagent
        .get(
          `https://api.mangadex.org/manga/${manga}/feed?${langue
            .map((e) => `translatedLanguage[]=${e}&`)
            .join('')}includeExternalUrl=0&limit=500&offset=${offset * 500}`
        )
        .catch((e) => console.error(e));
      //FIXME
      //@ts-ignore
      data = result.body.data.find(
        //@ts-ignore
        (element) =>
          element.attributes.chapter == numero ||
          (numero == 1 && element.attributes.chapter == null)
      );
      offset++;
      //FIXME
      //@ts-ignore
    } while (result.body.total > offset * 500 && typeof data == 'undefined');
  }
  if (typeof data == 'undefined') return 'Numéro de chapitre invalide';
  //FIXME
  //@ts-ignore
  return await this.getChapitreById(data);
};

export const getChapitreById = async (chapitre: {
  id: string;
  attributes: { chapter: number; title: string; pages: number };
}) => {
  const data = await superagent
    .get(
      `https://api.mangadex.org/at-home/server/${chapitre.id}?forcePort443=false`
    )
    .then((res) => res.body.chapter);
  return new Chapitre(
    data.dataSaver,
    chapitre.attributes.chapter,
    chapitre.attributes.title,
    chapitre.attributes.pages,
    (num) => `https://uploads.mangadex.org/data-saver/${data.hash}/${num}`,
    `https://mangadex.org/chapter/${chapitre.id}`,
    []
  );
};

export const getChapitreInfoById = async (id: string) => {
  return await superagent
    .get(`https://api.mangadex.org/chapter/${id}`)
    .then((res) => res.body.data);
};
