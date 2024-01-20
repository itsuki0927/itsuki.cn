import { idToUuid } from "notion-utils";
import index from "@/libs/notion";
import getAllPageIds from "./getAllPageIds";
import getPageProperties from "./getPageProperties";
import filterPublishedPosts from "./filterPublishedBlogs";
import { NOTION_PAGE_ID } from "@/constants/notion";

interface GetAllBlogsParams {
  onlyNewsletter?: boolean;
  onlyPost?: boolean;
  onlyHidden?: boolean;
  onlyRecent?: boolean;
}

async function getAllBlogs(params?: GetAllBlogsParams) {
  const { onlyNewsletter, onlyPost, onlyHidden, onlyRecent } = params || {};
  let id = NOTION_PAGE_ID;
  const response = await index.getPage(id);

  id = idToUuid(id);
  const collection = Object.values(response.collection)[0]?.value;
  const collectionQuery = response.collection_query;
  const block = response.block;
  const schema = collection?.schema;

  const rawMetadata = block[id]?.value;

  // Check Type
  if (
    rawMetadata?.type !== "collection_view_page" &&
    rawMetadata?.type !== "collection_view"
  ) {
    console.log(`pageId '${id}' is not a database`);
    return null;
  } else {
    // Construct Data
    const pageIds = getAllPageIds(collectionQuery);
    const data = [];
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
      }

      data.push(properties);
    }

    // remove all the the items doesn't meet requirements
    const posts = filterPublishedPosts({
      posts: data,
      onlyNewsletter,
      onlyPost,
      onlyHidden,
      onlyRecent,
    });

    // Sort by date
    // if (BLOG.sortByDate) {
    //   posts.sort((a, b) => b.date - a.date);
    // }

    return posts as any[];
  }
}

export default getAllBlogs;
