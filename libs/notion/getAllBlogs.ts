import { idToUuid } from 'notion-utils';
import getAllPageIds from './getAllPageIds';
import getPageProperties from './getPageProperties';
import filterPublishedPosts from './filterPublishedBlogs';
import { Blog } from '@/types/blog';
import getRootPage from './getRootPage';
import { NOTION_PAGE_ID } from '@/constants/env';

export interface GetAllBlogsParams {
  onlyRecent?: boolean;
}

async function getAllBlogs({ onlyRecent }: GetAllBlogsParams = {}) {
  const { block, schema, collectionQuery } = await getRootPage();

  const id = idToUuid(NOTION_PAGE_ID);

  const rawMetadata = block[id]?.value;

  if (
    rawMetadata?.type !== 'collection_view_page' &&
    rawMetadata?.type !== 'collection_view'
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
