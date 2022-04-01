export const articleKeys = {
  article: 'article' as const,
  lists: () => [articleKeys.article, 'list'] as const,
  pagination: (current: number) => [articleKeys.article, 'page', current] as const,
  tag: (tag: string) => [articleKeys.article, 'tag', tag] as const,
  category: (category: string) => [articleKeys.article, 'category', category] as const,
  detail: (id: number) => [articleKeys.article, 'detail', id] as const,
  publish: () => ['publish', ...articleKeys.lists()] as const,
  banner: () => ['banner', ...articleKeys.lists()] as const,
  search: (keywords: string) => [articleKeys.article, 'search', keywords] as const,
  archive: () => [articleKeys.article, 'archive'] as const,
};

export const commentKeys = {
  comment: 'comment' as const,
  lists: (articleId: number) =>
    [articleKeys.article, articleId, commentKeys.comment, 'list'] as const,
  like: (id: number) => [commentKeys.comment, id, 'like'] as const,
};

export const globalDataKeys = {
  globalData: 'globalData' as const,
};
