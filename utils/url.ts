import { WEB_URL } from '@/configs/app';

const baseUrlMap = {
  article: '/article',
  tag: '/tag',
  category: '/category',
};

export const isArticleRoute = (url: string) => url.startsWith(baseUrlMap.article);

export const isTagRoute = (url: string) => url.startsWith(baseUrlMap.tag);

export const isCategoryRoute = (url: string) => url.startsWith(baseUrlMap.category);

/**
 * 获取文章路径
 */
export const getArticleDetailRoute = (articleId: number) =>
  `${baseUrlMap.article}/${articleId}`;

/**
 * 获取标签路径
 */
export const getTagRoute = (path: string) => `${baseUrlMap.tag}/${path}`;

/**
 * 获取分类路径
 */
export const getCategoryRoute = (path: string) => `${baseUrlMap.category}/${path}`;

export const getPageUrl = (uri: string) => `${WEB_URL}${uri}`;

/**
 * 获取完整的文章路径
 */
export const getArticleDetailFullUrl = (articleId: number) =>
  getPageUrl(getArticleDetailRoute(articleId));

/**
 * stringify 参数
 */
export const stringifyParams = (params: Record<string, any>) =>
  Object.keys(params).reduce((s, k) => {
    const value = params[k];
    const delimiter = s === '' ? '' : '&';
    if (value === undefined || value === null) return s;
    return `${s + delimiter + k}=${value}`;
  }, '');
