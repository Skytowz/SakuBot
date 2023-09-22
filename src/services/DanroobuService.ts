import superagent from 'superagent';
import AbstractService, { SERVICE_BEAN_TYPE } from './AbstractService.js';
import injector, { Bean } from 'wire-dependency-injection';

export default class DanroobuService extends AbstractService {
  public constructor(bean: Bean) {
    super(bean.getId());
  }

  public async getGeneralImageByTag(
    name: string,
    solo: boolean,
    sensitive: boolean,
    allResult: boolean
  ) {
    return await superagent
      .get(
        `https://gelbooru.com/index.php?tags=${name}+sort:random${
          allResult
            ? ''
            : `${solo ? '+solo' : ''}+rating:${
                sensitive
                  ? 'sensitive+-loli+-child+-lolita+-lolicon+-shota'
                  : 'general'
              }`
        }+-video&page=dapi&json=1&s=post&q=index&limit=1`
      )
      .set('User-Agent', 'Discord Bot Hayasaku')
      .then((res) => res?.body?.post?.pop()?.file_url);
  }
}

injector.registerBean(DanroobuService, {
  type: SERVICE_BEAN_TYPE,
});
