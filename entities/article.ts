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

export type LikeArticleBody = {
  articleId: number;
};

export type ArticleTypes = {
  article: Article;
  searchBody: SearchArticlesBody;
  likeBody: LikeArticleBody;
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

export type LikeArticleHook<T extends ArticleTypes = ArticleTypes> = {
  data: void;
  actionInput: T['likeBody'];
  body: T['likeBody'];
  fetcherInput: T['likeBody'];
};

export type ArticlesSchema<T extends ArticleTypes = ArticleTypes> = {
  endpoint: {
    options: Record<string, any>;
    handlers: {
      getArticles: SearchArticlesHook<T>;
      likeArticle: LikeArticleHook<T>;
    };
  };
};

export type GetArticleOperation<T extends ArticleTypes = ArticleTypes> = {
  data: { article: T['article'] };
  variables: { articleId: number };
};

export type GetAllArticlePathsOperation<T extends ArticleTypes = ArticleTypes> = {
  data: { articles: Pick<T['article'], 'id'>[] };
};

export type AddArticleReadOperation = {
  variables: {
    articleId: number;
  };
};

export type GetAllArticlesOperation<T extends ArticleTypes = ArticleTypes> = {
  data: SearchResponse<T['article']>;
  variables: SearchArticlesBody & { banner?: true };
};

export type GetAllArticlePathsQuery = SearchResponse<Article>;
