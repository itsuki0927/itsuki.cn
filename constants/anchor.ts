import { Key } from 'react';

export const ARTICLE_HEADING_ELEMENT_ID_PREFIX = 'article_heading';
export const getArticleHeadingElementId = (level: number, title: string) =>
  `${ARTICLE_HEADING_ELEMENT_ID_PREFIX}_${level}_${title}`;

export const COMMENT_ELEMENT_PREFIX = 'comment';
export const getCommentElementId = (id: Key) => `${COMMENT_ELEMENT_PREFIX}_${id}`;
