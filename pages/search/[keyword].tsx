import type { GetStaticPathsResult, GetStaticPropsContext } from 'next';
import Search from '@/components/search';
import { getSearchStaticProps } from '@/lib/search-prop';

export async function getStaticProps(context: GetStaticPropsContext) {
  return getSearchStaticProps(context);
}

export function getStaticPaths(): GetStaticPathsResult {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export default Search;
