/* eslint-disable @typescript-eslint/ban-ts-comment */
import got from 'got';
import { JSDOM } from 'jsdom';
import Chapitre from '../entity/chapitre.js';

export const getChapitre = async (manga: string, numero: string) => {
  let res;
  if (numero.includes('.')) {
    numero = numero.replace('.', '-');
  }
  //FIXME
  //@ts-ignore
  await got(`https://www.mangafr.net/manga/${manga}/chapitre-${numero}/`)
    .then((response: any) => {
      const document = new JSDOM(response.body).window.document;
      const img0 = document.querySelector('#image-0');
      if (img0 == null) {
        res = 'Chapitre invalide';
        return;
      }
      //FIXME
      //@ts-ignore
      const url = img0.src.slice(0, -'1.jpg'.length);
      const page = Array.from(
        Array(document.querySelectorAll('.page-break').length).keys()
      ).map((i) => i + 1);
      if (page.length == 0) res = 'Numéro de chapitre invalide';
      else
        res = new Chapitre(
          page,
          numero,
          `Chapitre N°${numero}`,
          page.length,
          (num) => `${url}/${num}.png`,
          `https://bentomanga.com/manga/${manga}/chapter/${numero}`,
          []
        );
    })
    .catch((err: any) => {
      console.error(err);
      res = 'Il y a eu problème';
    });
  return res;
};
