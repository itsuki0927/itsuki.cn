export const GUESTBOOK = 10000;

export const DEFAULT_CURRENT = 1;

export const DEFAULT_PAGE_SIZE = 6;

export const TIMESTAMP = {
  MINIUTE: 1000 * 60,
  HOUR: 1000 * 60 * 60,
  DAY: 1000 * 60 * 60 * 24,
} as const;

export const DEFAULT_ROUTE_LIST = [
  { path: '/blog', name: '文章', en: 'Blog' },
  /* { path: '/archive', name: '归档',en:'Archive' }, */
  { path: '/guestbook', name: '留言', en: 'Guestbook' },
  { path: '/about', name: '关于', en: 'About' },
];

export const DEFAULT_ROUTE_LIST_WITH_HOME = [
  { path: '/', name: '首页', en: 'Home' },
  ...DEFAULT_ROUTE_LIST,
];

export const COMMENT_WITH_GUESTBOOK = {
  blogId: GUESTBOOK,
};
