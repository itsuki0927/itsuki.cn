import { useRouter } from 'next/router';
import useSearch from '@/helpers/article/use-search';
import ArticleList from '../Article';
import Layout from '../Layout';
import Loading from '../Loading';

const Search = () => {
  const router = useRouter();
  const keyword = (router.query.keyword ?? '') as string;
  const { data } = useSearch({
    keyword,
  });

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
