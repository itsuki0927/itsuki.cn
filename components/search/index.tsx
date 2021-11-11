import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { ArticleList } from '@/components/article';
import { Layout } from '@/components/common';
import useSearch from '@/framework/local/article/use-search';
import SearchSkeleton from './SearchSkeleton';

const Search = () => {
  const router = useRouter();
  const keyword = (router.query.keyword ?? '') as string;
  const { data } = useSearch({ search: keyword });

  if (!data) {
    return <SearchSkeleton />;
  }

  return (
    <div>
      <NextSeo title={`${keyword} - Search`} />
      <h2 style={{ marginTop: 0 }}>Search:{keyword}</h2>
      <ArticleList articles={data?.articles} />
    </div>
  );
};

Search.Layout = Layout;

export default Search;
