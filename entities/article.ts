import { ArticleOrigin } from '@/constants/article/origin';
import { ArticleOpen } from '@/constants/article/public';
import { PublishState } from '@/constants/publish';
import { Category } from './category';
import { Comment } from './comment';
import { IdentifiableEntity, SearchResponse } from './response/base';
import { Tag } from './tag';

export type Article = IdentifiableEntity<{
  title: string;
  description: string;
  content: string;
  author: string;
  cover: string;
  status: number;
  keywords: string;
  open: ArticleOpen;
  publish: PublishState;
  origin: ArticleOrigin;
  banner: number;
  reading: number;
  liking: number;
  commenting: number;
  tags: Tag[];
  categories: Category[];
  comments: Comment[];
}>;

export type SearchArticlesBody = {
  search?: string;
  tag?: string;
  category?: string;
};

export type ArticleTypes = {
  article: Article;
  searchBody: SearchArticlesBody;
};

export type SearchArticlesHook<T extends ArticleTypes = ArticleTypes> = {
  data: {
    articles: SearchResponse<T['article']>;
    found: boolean;
  };
  body: T['searchBody'];
  input: T['searchBody'];
  fetcherInput: T['searchBody'];
};

export type ArticlesSchema<T extends ArticleTypes = ArticleTypes> = {
  endpoint: {
    options: Record<string, any>;
    handlers: {
      getArticles: SearchArticlesHook<T>;
    };
  };
};

export type GetAllArticlePathsOperation<T extends ArticleTypes = ArticleTypes> = {
  data: Pick<T['article'], 'id'>[];
  variables: any;
};

export type GetAllArticlesOperation<T extends ArticleTypes = ArticleTypes> = {
  data: SearchResponse<T['article']>;
  variables: { search?: string; banner?: true; tag?: string; category?: string };
};
