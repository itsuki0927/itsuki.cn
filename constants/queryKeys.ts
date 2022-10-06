export const blogKeys = {
  blog: ['blog'] as const,
  lists: () => [...blogKeys.blog, 'list'] as const,
  recent: () => [...blogKeys.blog, 'recent'] as const,
  pagination: (current: number) => [...blogKeys.blog, 'page', current] as const,
  tag: (tag: string) => [...blogKeys.blog, 'tag', tag] as const,
  detail: (path: string) => [...blogKeys.blog, 'detail', path] as const,
  detailByPath: (path: string) => [...blogKeys.blog, 'detail-by-path', path] as const,
  publish: () => [...blogKeys.lists(), 'publish'] as const,
  banner: () => [...blogKeys.lists(), 'banner'] as const,
  hot: () => [...blogKeys.lists(), 'hot'] as const,
  search: (keywords: string) => [...blogKeys.blog, 'search', keywords] as const,
  archive: () => [...blogKeys.blog, 'archive'] as const,
};

export const commentKeys = {
  comment: ['comment'] as const,
  lists: (blogId: number) =>
    [...blogKeys.blog, blogId, ...commentKeys.comment, 'list'] as const,
  like: (id: number) => [...commentKeys.comment, id, 'like'] as const,
  recent: () => [...commentKeys.comment, 'recent'] as const,
};

export const tagKeys = {
  tag: ['tag'] as const,
  lists: () => [...tagKeys.tag, 'list'] as const,
};

export const blacklistKeys = {
  list: ['blacklist'] as const,
};

export const summaryKeys = {
  summary: () => ['summary'] as const,
};
