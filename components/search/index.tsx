import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { ArticleList } from '@/components/article';
import { useSearch } from '@/hooks/article';
import { Layout } from '@/components/common';
import { Banner, Empty, Loading } from '@/components/ui';

const Search = () => {
  const router = useRouter();
  const keyword = (router.query.keyword ?? '').toString();
  const articles = useSearch(keyword);

  if (articles.isLoading || articles.isFetching) {
    return <Loading />;
  }

  return (
    <div className='space-y-6'>
      <NextSeo title={`${keyword} - Search`} />

      <Banner>关键字: {keyword}</Banner>

      {articles.data?.data.length === 0 ? <Empty /> : <ArticleList {...articles} />}
    </div>
  );
};

Search.Layout = Layout;

export default Search;
