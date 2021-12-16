import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { ArticleList } from '@/components/article';
import { Layout } from '@/components/common';
import useSearch from '@/framework/local/article/use-search';
import SearchSkeleton from './SearchSkeleton';
import { Card } from '../ui';

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
      <Card style={{ marginBottom: 24 }}>
        <span>
          关键字: <strong style={{ color: '#1890ff' }}>{keyword}</strong>
        </span>
      </Card>
      <ArticleList articles={data?.articles} />
    </div>
  );
};

Search.Layout = Layout;

export default Search;
