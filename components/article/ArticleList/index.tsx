import { QueryList, PaginationListProps } from '@/components/common';
import { Article } from '@/entities/article';
import ArticleCard from '../ArticleCard';

type ArticleListProps = Omit<PaginationListProps<Article>, 'children'>;

const ArticleList = ({ data, ...rest }: ArticleListProps) => (
  <QueryList {...rest} data={data?.data}>
    {article => <ArticleCard article={article} key={article.id} />}
  </QueryList>
);
export default ArticleList;
