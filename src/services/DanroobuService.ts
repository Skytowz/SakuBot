import superagent from 'superagent';
import AbstractService, { SERVICE_BEAN_TYPE } from './AbstractService.js';
import injector from 'wire-dependency-injection';

export default class DanroobuService extends AbstractService {
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

injector.registerBean('danroobuService', DanroobuService, SERVICE_BEAN_TYPE);
