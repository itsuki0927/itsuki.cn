import getAllArticles from '@/api/operations/get-all-articles';
import { API_URL } from '@/configs/app';
import { BlogAPI, BlogAPIConfig, getBlogApi as blogApi } from '.';
import createFetchApi from './fetch-api';

export const config: BlogAPIConfig = {
  blogUrl: API_URL!,
  // locale:'',
  // locales:[]
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  fetch: createFetchApi(() => getBlogApi().getConfig()),
};

const operations = {
  getAllArticles,
};
export const provider = { config, operations };
export type Provider = typeof provider;
export type ItsukiBlogAPI<P extends Provider = Provider> = BlogAPI<P>;

export function getBlogApi<P extends Provider>(
  customProvider: P = provider as any
): ItsukiBlogAPI<P> {
  return blogApi(customProvider as any);
}
