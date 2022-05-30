import type { GetStaticPathsResult } from 'next';
import { dehydrate, QueryClient } from 'react-query';
import { getGlobalData } from '@/api/global';
import { Search } from '@/components/common';
import { globalDataKeys } from '@/constants/queryKeys';

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(globalDataKeys.globalData, () => getGlobalData());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60 * 60 * 24, // 一个小时
  };
}

export function getStaticPaths(): GetStaticPathsResult {
  return {
    paths: [],
    fallback: true,
  };
}

export default Search;
