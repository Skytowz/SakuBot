import AbstractService from './AbstractService.js';
import { AppInstances } from '../types/AppInstances.js';

export type SaucenaoSourceData = {
  title?: string;
  source?: string;
  index_name?: string;
  ext_url?: string;
  thumbnail?: string;
  similarity?: string;
  author_name?: string;
  author_url?: string;
  twitter_user_handle?: string;
  eng_name?: string;
  danbooru_id?: string;
  creator?: string;
  characters?: string;
};

type RawResult = Array<{
  data: { [key: string]: string };
  header: { [key: string]: string };
}>;

export default class SaucenaoService extends AbstractService {
  public constructor(appInstances: AppInstances) {
    super(appInstances);
  }

  public async fetchSourceDataFromImageUrl(imageUrl: string) {
    const response = await fetch(
      `https://saucenao.com/search.php?db=999&output_type=2&numres=50&api_key=4f94dcf41458ba2601b9d09fe7d4107a7afd9071&url=${encodeURIComponent(
        imageUrl
      )}`
    );
    const { results }: { results: RawResult } = await response.json();
    if (!results) {
      return;
    }

    results.sort(
      (a, b) => Number(b.header.similarity) - Number(a.header.similarity)
    );
    const res = results[0];
    return {
      ...res.data,
      ...res.header,
      ext_url: res.data.ext_urls && res.data.ext_urls[0],
    } as SaucenaoSourceData;
  }
}
