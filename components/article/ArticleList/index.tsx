import { Empty, Loading } from '@/components/ui';
import { UseArticles } from '@/hooks/article/useArticles';
import ArticleCard from '../ArticleCard';

type ArticleListProps = UseArticles;

const ArticleList = ({ data, ...rest }: ArticleListProps) => {
  if (rest.isFetching || rest.isLoading) {
    return <Loading />;
  }

  if (data?.total === 0) {
    return <Empty />;
  }

  return (
    <div className='space-y-6'>
      {data?.data.map((article, i) => (
        <ArticleCard
          style={{ animationDelay: `${0.2 * i}s` }}
          article={article}
          key={article.id}
        />
      ))}
    </div>
  );
};
export default ArticleList;
