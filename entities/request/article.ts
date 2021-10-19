import { BaseSearchRequest } from '../response/base';

/**
 * 文章搜索 请求类
 */
export type ArticleSearchRequest = BaseSearchRequest<{
  tag?: string;
  category?: string;
  content?: number;
  banner?: number;
  publish?: number;
}>;
