import Chapitre from '../entity/chapitre.js';
import superagent from 'superagent';

export const getChapitre = async (
  manga: string,
  number: number,
  isCubari: boolean
) => {
  const chapitre = await superagent
    .get(manga)
    .set('accept', 'json')
    .then((res) => JSON.parse(res.text).chapters[number]);
  if (!chapitre) {
    throw new Error('invalid chapter');
  }
  return await getChapitreById(chapitre, number, isCubari);
};

export const getChapitreById = async (
  chapitre: { title: string; groups: Array<Array<string>> },
  number: number,
  isCubari: boolean
) => {
  const pages = Object.values(chapitre.groups).pop();
  return new Chapitre(
    //FIXME
    pages as Array<string>,
    number,
    chapitre.title,
    //FIXME
    (pages as Array<unknown>).length,
    (page) => page,
    `https://cubari.moe/read/gist/${isCubari}/${number}`,
    []
  );
};
