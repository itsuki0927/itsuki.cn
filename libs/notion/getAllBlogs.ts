import { idToUuid } from "notion-utils";
import index from "@/libs/notion";
import getAllPageIds from "./getAllPageIds";
import getPageProperties from "./getPageProperties";
import filterPublishedPosts from "./filterPublishedBlogs";
import { NOTION_PAGE_ID } from "@/constants/notion";
import { Blog } from "@/types/blog";

export interface GetAllBlogsParams {
  onlyRecent?: boolean;
}

async function getAllBlogs(params?: GetAllBlogsParams) {
  const { onlyRecent } = params || {};
  let id = NOTION_PAGE_ID;
  const response = await index.getPage(id);

  id = idToUuid(id);
  const collection = Object.values(response.collection)[0]?.value;
  const collectionQuery = response.collection_query;
  const block = response.block;
  const schema = collection?.schema;

  const rawMetadata = block[id]?.value;

  if (
    rawMetadata?.type !== "collection_view_page" &&
    rawMetadata?.type !== "collection_view"
  ) {
    console.log(`pageId '${id}' is not a database`);
    return null;
  } else {
    // Construct Data
    const pageIds = getAllPageIds(collectionQuery);

    const data = pageIds.map((pageId) => {
      const id = String(pageId);
      const properties = getPageProperties(id, block, schema) || null;

      return properties as Blog;
    });

    const posts = filterPublishedPosts({
      posts: data,
      onlyRecent,
    });

    posts.sort((a, b) => {
      if (a.publishedAt && b.publishedAt) {
        return b.publishedAt.valueOf() - a.publishedAt.valueOf();
      }
      if (a.createdAt && b.createdAt) {
        return b.createdAt.valueOf() - a.createdAt.valueOf();
      }
      return -1;
    });

    return posts;
  }
}

export default getAllBlogs;
