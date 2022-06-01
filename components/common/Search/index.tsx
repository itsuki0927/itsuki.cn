import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { ArticleList, ArticleSkeletonList } from '@/components/article';
import { useSearch } from '@/hooks/article';
import { Layout } from '@/components/common';
import { Banner, BannerSkeleton } from '@/components/ui';
import { useMount } from '@/hooks';
import { gtag } from '@/utils/gtag';
import { GAEventCategories } from '@/constants/gtag';

const Search = () => {
  const { query, isFallback } = useRouter();
  const keyword = (query.keyword ?? '').toString();
  const articles = useSearch(keyword);

  useMount(() => {
    gtag.event('search', {
      category: GAEventCategories.Search,
      label: keyword,
    });
  });

  if (isFallback || articles.isLoading || articles.isFetching) {
    return (
      <div className='space-y-6'>
        <BannerSkeleton />

        <ArticleSkeletonList />
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <NextSeo title={`${keyword} - Search`} />

      <Banner title={`关键字: ${keyword}`} description='搜索' />

      <ArticleList {...articles} />
    </div>
  );
};

Search.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;

export default Search;
