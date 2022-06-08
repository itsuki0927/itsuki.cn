import { Empty } from '@/components/ui';
import { UseArticles } from '@/hooks/article/useArticles';
import ArticleCard from '../ArticleCard';
import { ArticleSkeletonList } from '../ArticleSkeleton';

type ArticleListProps = UseArticles;

const ArticleList = ({ data, ...rest }: ArticleListProps) => {
  if (rest.isFetching || rest.isLoading) {
    return <ArticleSkeletonList />;
  }

  if (data?.total === 0) {
    return <Empty />;
  }

  return (
    <div className='flex flex-wrap'>
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
