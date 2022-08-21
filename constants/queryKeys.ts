export const articleKeys = {
  article: ['article'] as const,
  lists: () => [...articleKeys.article, 'list'] as const,
  recent: () => [...articleKeys.article, 'recent'] as const,
  pagination: (current: number) => [...articleKeys.article, 'page', current] as const,
  tag: (tag: string) => [...articleKeys.article, 'tag', tag] as const,
  detail: (path: string) => [...articleKeys.article, 'detail', path] as const,
  detailByPath: (path: string) =>
    [...articleKeys.article, 'detail-by-path', path] as const,
  publish: () => [...articleKeys.lists(), 'publish'] as const,
  banner: () => [...articleKeys.lists(), 'banner'] as const,
  hot: () => [...articleKeys.lists(), 'hot'] as const,
  search: (keywords: string) => [...articleKeys.article, 'search', keywords] as const,
  archive: () => [...articleKeys.article, 'archive'] as const,
};

export const commentKeys = {
  comment: ['comment'] as const,
  lists: (articleId: number) =>
    [...articleKeys.article, articleId, ...commentKeys.comment, 'list'] as const,
  like: (id: number) => [...commentKeys.comment, id, 'like'] as const,
};

export const tagKeys = {
  tag: ['tag'] as const,
  lists: () => [...tagKeys.tag, 'list'] as const,
};

export const blacklistKeys = {
  list: ['blacklist'] as const,
};
