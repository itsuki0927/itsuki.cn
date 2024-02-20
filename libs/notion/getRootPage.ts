import { unstable_cache as cache } from 'next/cache';
import { NOTION_PAGE_ID } from '@/constants/env';
import index from '.';

const getRootPage = cache(
  async () => {
    console.log('getRootPage:');
    let id = NOTION_PAGE_ID;
    const response = await index.getPage(id);

    const collection = Object.values(response.collection)[0]?.value;
    const collectionQuery = response.collection_query;
    const block = response.block;
    const schema = collection?.schema;

    return { block, schema, collectionQuery };
  },
  ['getRootPage'],
  { revalidate: 3600 },
);

export default getRootPage;
