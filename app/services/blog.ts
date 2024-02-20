import { NotionResponse } from "../blog/[slug]/page";
import itsukiFetcher from "../lib/fetcher";

export const getBlogs = async () => {
  const { data } = await itsukiFetcher<any[]>({
    path: "/api/blog",
  });
  return data;
};

export const getBlog = async (slug: string) => {
  const { data } = await itsukiFetcher<NotionResponse>({
    path: `/api/blog/${slug}`,
  });
  return data;
};
