import { WEB_URL } from '@/configs/app';

const baseUrlMap = {
  article: '/article',
  blog: '/blog',
  tag: '/tag',
};

export const isArticleRoute = (url: string) => url.startsWith(baseUrlMap.article);

export const isTagRoute = (url: string) => url.startsWith(baseUrlMap.tag);

/**
 * 获取文章路径
 */
export const getArticleDetailRoute = (articleId: number) =>
  `${baseUrlMap.article}/${articleId}`;

export const getBlogDetailRoute = (path: string) => `${baseUrlMap.blog}/${path}`;

/**
 * 获取标签路径
 */
export const getTagRoute = (path: string) => `${baseUrlMap.tag}/${path}`;

export const getPageUrl = (uri: string) => `${WEB_URL}${uri}`;

/**
 * 获取完整的文章路径
 */
export const getArticleDetailFullUrl = (articleId: number) =>
  getPageUrl(getArticleDetailRoute(articleId));

export const getBlogDetailFullUrl = (path: string) =>
  getPageUrl(getBlogDetailRoute(path));

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
