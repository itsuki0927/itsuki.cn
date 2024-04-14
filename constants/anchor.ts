import type { Key } from 'react';

// 获取元素id
export const getElementId = (elementId: string) => `#${elementId}`;

// 文章
export const BLOG_HEADING_ELEMENT_ID_PREFIX = 'blog-heading';

// 获取id
export const getId = (text: string) =>
  text.toLowerCase().replaceAll(/\s/g, '-').replaceAll(/[;?.]/g, '');

export const getBlogHeadingElementId = (title: string) =>
  `${BLOG_HEADING_ELEMENT_ID_PREFIX}-${getId(title)}`;
export const BLOG_ACTIONS_ELEMENT_ID = 'blog-action';

// 评论
export const COMMENT_ELEMENT_PREFIX = 'comment';
export const COMMENT_VIEW_ELEMENT_ID = `${COMMENT_ELEMENT_PREFIX}-view`;
export const getCommentElementId = (id: Key) =>
  `${COMMENT_ELEMENT_PREFIX}-${id}`;
