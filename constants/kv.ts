export const kvKeys = {
  totalPageViews: "total_page_views",
  lastVisitor: "last_visitor",
  currentVisitor: "current_visitor",
  blogViews: (id: string) => `blog:views:${id}`,
  blogReactions: (id: string) => `blog:reactions:${id}`,
} as const;
