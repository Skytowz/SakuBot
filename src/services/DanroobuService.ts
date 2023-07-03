import superagent from 'superagent';
import { AppInstances } from '../types/AppInstances.js';
import AbstractService from './AbstractService.js';

export default class DanroobuService extends AbstractService {
  public constructor(appInstances: AppInstances) {
    super(appInstances);
  }

  public async getGeneralImageByTag(
    name: string,
    solo: boolean,
    sensitive: boolean
  ) {
    return await superagent
      .get(
        `https://gelbooru.com/index.php?tags=${name}${
          solo ? '+solo' : ''
        }+sort:random+-video+rating:${
          sensitive
            ? 'sensitive+-loli+-child+-lolita+-lolicon+-shota'
            : 'general'
        }&page=dapi&json=1&s=post&q=index&limit=1`
      )
      .set('User-Agent', 'Discord Bot Hayasaku')
      .then((res) => res?.body?.post?.pop()?.file_url);
  }
}
