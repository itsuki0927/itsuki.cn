import { Database } from "@/types_db";
import itsukiFetcher from "../lib/fetcher";

export const getComments = async (blogId: number) => {
  const { data } = await itsukiFetcher<
    Database["public"]["Tables"]["comment"]["Row"][]
  >({
    path: `/api/comment/${blogId}`,
    tags: ["comment"],
  });
  return data;
};

export const createComment = async (
  row: Pick<
    Database["public"]["Tables"]["comment"]["Insert"],
    "agent" | "blogId" | "content"
  >,
) => {
  const { data } = await itsukiFetcher<
    Database["public"]["Tables"]["comment"]["Row"][]
  >({
    path: `/api/comment/${row.blogId}`,
    method: "POST",
    variables: row,
  });
  return data;
};
