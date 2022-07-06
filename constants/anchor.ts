import { Key } from 'react';

// 获取元素id
export const getElementId = (elementId: string) => `#${elementId}`;

// 文章
export const ARTICLE_HEADING_ELEMENT_ID_PREFIX = 'article_heading';
export const getArticleHeadingElementId = (level: number, title: string) =>
  `${ARTICLE_HEADING_ELEMENT_ID_PREFIX}_${level}_${title}`;
export const ARTICLE_ACTIONS_ELEMENT_ID = 'article_action';

// 评论
export const COMMENT_ELEMENT_PREFIX = 'comment';
export const COMMENT_VIEW_ELEMENT_ID = `${COMMENT_ELEMENT_PREFIX}_view`;
export const getCommentElementId = (id: Key) => `${COMMENT_ELEMENT_PREFIX}_${id}`;
