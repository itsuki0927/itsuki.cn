import { Article } from '@/entities/article';
import { SearchResponse } from '@/entities/response/base';
import ArticleCard from './Card';
import styles from './style.module.scss';

type ArticleListProps = {
  articles: SearchResponse<Article>;
};

const ArticleList = ({ articles }: ArticleListProps) => {
  return (
    <div>
      <div className={styles.list}>
        {articles?.data?.map(article => (
          <ArticleCard article={article} key={article.id} />
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
