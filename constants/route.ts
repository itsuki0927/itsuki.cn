export const ROUTE_MAP = {
  blog: '/blog',
  guestbook: '/guestbook',
  home: '/',
  admin: '/admin',
} as const;

export interface Route {
  path: string;
  name: string;
}

export const ROUTE_LIST: Route[] = [
  { path: ROUTE_MAP.blog, name: '文章' },
  { path: ROUTE_MAP.guestbook, name: '留言' },
] as const;

export const ROUTE_LIST_WITH_HOME: Route[] = [
  { path: ROUTE_MAP.home, name: '首页' },
  ...ROUTE_LIST,
] as const;
