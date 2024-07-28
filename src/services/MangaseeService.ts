/* eslint-disable @typescript-eslint/ban-ts-comment */
import Chapitre from '../entity/Chapitre.js';
import superagent from 'superagent';
import AbstractService, { SERVICE_BEAN_TYPE } from './AbstractService.js';
import injector from 'wire-dependency-injection';
import { AttachmentBuilder } from 'discord.js';

export default class MangaseeService extends AbstractService {
  static {
    injector.instance(this.name, this, {
      category: SERVICE_BEAN_TYPE,
    });
  }

  public constructor() {
    super(MangaseeService.name);
  }

  public async getChapitre(slug: string, numero: number) {
    let data;
    let result;
    let URL = `https://mangasee123.com/read-online/${slug}-chapter-1-page-1.html`;
    result = await superagent.get(URL);
    data = result.text.match(/vm\.CHAPTERS = ([^;]*)/);
    if (data === undefined || data === null) {
      throw new Error('invalid chapter');
    }
    const allChapter = JSON.parse(data[1]);

    const matchUrl = result.text.match(/vm\.CurPathName = "([\"])";/);
    if (matchUrl === undefined || matchUrl === null) {
      throw new Error('invalid chapter');
    }
    const url = matchUrl[1];

    let numChapter = numero.toString();
    if (numChapter.includes('.')) {
      numChapter = numChapter.replace('.', '');
    } else {
      numChapter += '0';
    }
    numChapter = '1' + numChapter.padStart(5, '0');

    const chapter = allChapter.find(
      (chapter: { Chapter: string }) => chapter.Chapter === numChapter
    );

    if (!chapter) {
      throw new Error('invalid chapter');
    }

    return await this.getChapitreById(
      slug,
      numero,
      parseInt(chapter.Page),
      url
    );
  }

  public async getChapitreById(
    slug: string,
    chapter: number,
    nbPages: number,
    url: string
  ) {
    const arrayPages = Array.from({ length: nbPages }, (_, i) =>
      (i + 1).toString()
    );

    let splitNumChap = chapter.toString().split('.');
    splitNumChap[0] = splitNumChap[0].padStart(4, '0');
    let numChap = splitNumChap.join('.');

    const files: Array<Promise<AttachmentBuilder>> = arrayPages.map(
      async (pageNumber: string) => {
        const pageName = `${pageNumber.padStart(3, '0')}`;
        const img = await fetch(
          `https://${url}/manga/${slug}/${numChap}-${pageNumber.padStart(
            3,
            '0'
          )}.png`
        );
        return new AttachmentBuilder(Buffer.from(await img.arrayBuffer()), {
          name: `${pageName}.png`,
        });
      }
    );

    return new Chapitre(
      arrayPages,
      chapter.toString(),
      `Chapter ${chapter.toString()}`,
      nbPages,
      (page) => `attachment://${page.padStart(3, '0')}.png`,
      (index) =>
        `https://mangasee123.com/read-online/${slug}-chapter-${numChap}-page-${index}.html`,
      files
    );
  }
}
