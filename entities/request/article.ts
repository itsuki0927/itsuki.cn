import { BaseSearchRequest } from '../response/base';

/**
 * 文章搜索 请求类
 */
export type ArticleSearchRequest = BaseSearchRequest<{
  tag?: number;
  category?: number;
  content?: number;
  banner?: number;
  publish?: number;
}>;
