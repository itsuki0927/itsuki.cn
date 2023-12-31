import { ROUTE_MAP } from "@/constants/route";

export const getBlogDetailRoute = (path: string) =>
  `${ROUTE_MAP.blog}/${path}` as const;
