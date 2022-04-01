import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { ArticleCard } from '@/components/article';
import { useSearch } from '@/hooks/article';
import { HijackRender, Layout } from '@/components/common';
import { Empty } from '@/components/ui';
import SearchSkeleton from './SearchSkeleton';

const Search = () => {
  const router = useRouter();
  const keyword = (router.query.keyword ?? '').toString();
  const articles = useSearch(keyword);

  return (
    <div className='space-y-6'>
      <NextSeo title={`${keyword} - Search`} />

      <div className='bg-white p-4'>
        <span>
          关键字: <strong className='text-blue-400'>{keyword}</strong>
        </span>
      </div>

      {articles.data?.data.length === 0 ? (
        <Empty />
      ) : (
        <HijackRender
          {...articles}
          className='space-y-6'
          loadingContent={<SearchSkeleton />}
          emptyContent={<Empty />}
        >
          {articles.data?.data.map(article => (
            <ArticleCard article={article} key={article.id} />
          ))}
        </HijackRender>
      )}
    </div>
  );
};

Search.Layout = Layout;

export default Search;
