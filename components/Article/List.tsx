import { Article } from '@/entities/article';
import { SearchResponse } from '@/entities/response/base';
import Card from '../Card';
import Pagination from '../Pagination';
import { CurrentPageSizeProps } from '../Pagination/util';
import ArticleCard from './Card';
import styles from './style.module.scss';

type ArticleListWrapperProps = {
  articles: SearchResponse<Article>;
  onChange: (current: number, pageSize: number) => void;
  pagination?: CurrentPageSizeProps | false;
};

const ArticleListWrapper = ({ articles, onChange, pagination }: ArticleListWrapperProps) => {
  return (
    <>
      <div className={styles.list}>
        {articles?.data?.map(article => (
          <ArticleCard article={article} key={article.id} />
        ))}
      </div>
      {pagination !== false && (
        <Card bodyStyle={{ padding: '12px', textAlign: 'center' }}>
          <Pagination onChange={onChange} total={articles.total} {...pagination} />
        </Card>
      )}
    </>
  );
};

export default ArticleListWrapper;
