import { PaginationListProps } from '@/components/common';
import { Empty, Loading } from '@/components/ui';
import { Article } from '@/entities/article';
import ArticleCard from '../ArticleCard';

type ArticleListProps = Omit<PaginationListProps<Article>, 'children'>;

// const ArticleList = ({ data, ...rest }: ArticleListProps) => (
//   <QueryList
//     {...rest}
//     loadingContent={<div className='h-screen w-[693px] bg-red-200' />}
//     data={data?.data}
//     className='space-y-5'
//   >
//     {article => <ArticleCard article={article} key={article.id} />}
//   </QueryList>
// );

const ArticleList = ({ data, ...rest }: ArticleListProps) => {
  if (rest.isFetching || rest.isLoading) {
    return <Loading />;
  }

  if (data?.total === 0) {
    return <Empty />;
  }

  return (
    <div className='space-y-5'>
      {data?.data.map((article, i) => (
        <ArticleCard
          style={{
            animationDelay: `${0.25 * i}s`,
          }}
          article={article}
          key={article.id}
        />
      ))}
    </div>
  );
};
export default ArticleList;
