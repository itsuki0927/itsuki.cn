import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { ArticleList } from '@/components/article';
import { useSearch } from '@/hooks/article';
import { Layout } from '@/components/common';
import { Banner, Loading } from '@/components/ui';

const Search = () => {
  const router = useRouter();
  const keyword = (router.query.keyword ?? '').toString();
  const articles = useSearch(keyword);

  if (articles.isLoading || articles.isFetching) {
    return <Loading />;
  }

  return (
    <div className='space-y-5'>
      <NextSeo title={`${keyword} - Search`} />

      <Banner>关键字: {keyword}</Banner>

      <ArticleList {...articles} />
    </div>
  );
};

Search.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;

export default Search;
