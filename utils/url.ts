import { WEB_URL } from '@/configs/app';

/**
 * 获取片段详情地址
 *
 * @param rootCategoryPath 当前根分类路径
 * @param snippetId 片段id
 * @returns 片段详情url
 */
export const getSnippetDetailUrl = (rootCategoryPath: string, snippetId: number) =>
  `/snippet/${rootCategoryPath}/s/${snippetId}`;

/**
 * 获取根分类路径
 *
 * @param rootCategoryPath 根分类路径
 * @returns 获取根分类路径
 */
export const getSnippetRootCategoryUrl = (rootCategoryPath: string) =>
  `/snippet/${rootCategoryPath}/p/1`;

/**
 * 获取分页路径片段
 *
 * @param rootCategoryPath 根分类路径
 * @param categoryPath 分类路径
 * @returns 分类片段路径
 */
export const getSnippetPageCategoryUrl = (
  rootCategoryPath: string,
  categoryPath: string
) => `/snippet/${rootCategoryPath}/t/${categoryPath}/p/1`;

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
