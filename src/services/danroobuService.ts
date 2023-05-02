import * as superagent from 'superagent';

export const getGeneralImageByTag = async (
  name: string,
  solo: boolean,
  sensitive: boolean
) =>
  await superagent
    .get(
      `https://gelbooru.com/index.php?tags=${name}${
        solo ? '+solo' : ''
      }+sort:random+-video+rating:${
        sensitive ? 'sensitive+-loli+-child+-lolita+-lolicon+-shota' : 'general'
      }&page=dapi&json=1&s=post&q=index&limit=1`
    )
    .set('User-Agent', 'Discord Bot Hayasaku')
    .then((res) => res?.body?.post?.pop()?.file_url);
