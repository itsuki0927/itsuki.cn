import { useRouter } from 'next/router';
import { ArticleList } from '@/components/article';
import { Layout } from '@/components/common';
import { Loading } from '@/components/ui';
import useSearch from '@/framework/blog/article/use-search';

const Search = () => {
  const router = useRouter();
  const keyword = (router.query.keyword ?? '') as string;
  const { data } = useSearch({ search: keyword });

  if (!data) {
    return <Loading />;
  }

  return (
    <div>
      <h2 style={{ marginTop: 0 }}>Search:{keyword}</h2>
      <ArticleList articles={data?.articles} />
    </div>
  );
};

Search.Layout = Layout;

export default Search;
