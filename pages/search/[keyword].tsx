import type { GetStaticPathsResult } from 'next';
import { dehydrate, QueryClient } from 'react-query';
import { getGlobalData } from '@/api/global';
import { Search } from '@/components/common';

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('globalData', () => getGlobalData());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 200,
  };
}

export function getStaticPaths(): GetStaticPathsResult {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export default Search;
