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
    const data: Blog[] = [];
    for (let i = 0; i < pageIds.length; i++) {
      const id = String(pageIds[i]);
      const properties = (await getPageProperties(id, block, schema)) || null;

      if (properties) {
        // Add fullwidth to properties
        // properties.fullWidth =
        //   block[id].value?.format?.page_full_width ?? false;
        // Convert date (with timezone) to unix milliseconds timestamp
        // properties.date = (properties.date?.start_date)
        // ? dayjs.tz(properties.date?.start_date)
        // : dayjs(block[id].value?.created_time)
        // .valueOf();
        data.push(properties as Blog);
      }
    }

    const posts = filterPublishedPosts({
      posts: data,
      onlyRecent,
    });

    posts.sort((a, b) => {
      if (a.publishAt && b.publishAt) {
        return b.publishAt.valueOf() - a.publishAt.valueOf();
      }
      if (a.createAt && b.createAt) {
        return b.createAt.valueOf() - a.createAt.valueOf();
      }
      return -1;
    });

    return posts;
  }
}

export default getAllBlogs;
