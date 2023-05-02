import Chapitre from '../entity/chapitre.js';
import * as superagent from 'superagent';

export const getChapitre = async (
  manga: string,
  numero: string,
  cubari: boolean
) => {
  const chapitre = await superagent
    .get(manga)
    .set('accept', 'json')
    .then((res) => JSON.parse(res.text).chapters[numero]);
  if (!chapitre) return 'Numéro de chapitre invalide';
  return await getChapitreById(chapitre, numero, cubari);
};

export const getChapitreById = async (
  chapitre: any,
  numero: string,
  cubari: boolean
) => {
  const pages = Object.values(chapitre.groups).pop();
  return new Chapitre(
    //FIXME
    pages as Array<string>,
    numero,
    chapitre.title,
    //FIXME
    (pages as Array<unknown>).length,
    (page) => page,
    `https://cubari.moe/read/gist/${cubari}/${numero}`,
    []
  );
};
