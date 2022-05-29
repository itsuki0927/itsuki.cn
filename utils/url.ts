import { WEB_URL } from '@/configs/app';

export const getPageUrl = (uri: string) => `${WEB_URL}${uri}`;

/**
 * 获取文章路径
 */
export const getArticleDetailRoute = (articleId: number) => `/article/${articleId}`;

/**
 * 获取完整的文章路径
 */
export const getArticleDetailFullUrl = (articleId: number) =>
  getPageUrl(getArticleDetailRoute(articleId));

/**
 * 获取标签路径
 */
export const getTagUrl = (path: string) => `/tag/${path}`;

/**
 * 获取分类路径
 */
export const getCategoryUrl = (path: string) => `/category/${path}`;

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
