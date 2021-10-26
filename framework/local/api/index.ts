import { API_URL, API_VERSION } from '@/configs/app';
import { BlogAPI, BlogAPIConfig, getBlogApi as blogApi } from '@/framework/blog/api';
import getArticle from './operations/get-article';
import patchArticleMeta from './operations/patch-article-meta';
import getAllArticlePaths from './operations/get-all-article-paths';
import getAllArticles from './operations/get-all-articles';
import getAllCategoryPaths from './operations/get-all-category-paths';
import getAllTagPaths from './operations/get-all-tag-paths';
import getSiteInfo from './operations/get-site-info';
import { createFetcher } from './utils/fetch-api';

export const config: BlogAPIConfig = {
  blogUrl: API_URL!,
  apiVersion: API_VERSION!,
  // locale:'',
  // locales:[]
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  fetch: createFetcher(() => getBlogApi().getConfig()),
};

const operations = {
  getArticle,
  patchArticleMeta,
  getAllArticles,
  getAllArticlePaths,
  getAllTagPaths,
  getAllCategoryPaths,
  getSiteInfo,
};
export const provider = { config, operations };
export type Provider = typeof provider;
export type ItsukiBlogAPI<P extends Provider = Provider> = BlogAPI<P>;

export function getBlogApi<P extends Provider>(
  customProvider: P = provider as any
): ItsukiBlogAPI<P> {
  return blogApi(customProvider as any);
}
