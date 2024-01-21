export const ROUTE_MAP = {
  blog: '/blog',
  guestbook: '/guestbook',
  home: '/',
  admin: '/admin',
} as const;

export const ROUTE_LIST = [
  { path: ROUTE_MAP.blog, name: '文章', en: 'Blog' },
  { path: ROUTE_MAP.guestbook, name: '留言', en: 'Guestbook' },
] as const;

export const ROUTE_LIST_WITH_HOME = [
  { path: ROUTE_MAP.home, name: '首页', en: 'Home' },
  ...ROUTE_LIST,
] as const;
