import { WEB_URL } from '@/configs/app';

/**
 * 获取文章路径
 */
export const getArticleDetailUrl = (articleId: number) => `/article/${articleId}`;

/**
 * 获取完整的文章路径
 */
export const getArticleDetailFullUrl = (articleId: number) =>
  `${WEB_URL}${getArticleDetailUrl(articleId)}`;

/**
 * 获取标签路径
 */
export const getTagUrl = (path: string) => `/tag/${path}`;

/**
 * 获取分类路径
 */
export const getCategoryUrl = (path: string) => `/category/${path}`;
