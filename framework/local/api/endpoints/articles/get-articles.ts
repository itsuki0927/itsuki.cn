// eslint-disable-next-line import/no-cycle
import { Article } from '@/entities/article';
import { SearchResponse } from '@/entities/response/base';
// eslint-disable-next-line import/no-cycle
import { ArticlesEndpoint } from '.';

const getArticles: ArticlesEndpoint['handlers']['getArticles'] = async ({
  res,
  config,
  body,
}) => {
  const url = new URL('/article', 'http://a');
  if (body.search) {
    url.searchParams.append('name', body.search);
  }
  const data = await config.fetch<SearchResponse<Article>>(
    'GET',
    url.pathname + url.search
  );

  return res.status(200).json({
    data: {
      articles: data.data,
      found: !!data.data.total,
    },
  });
};

export default getArticles;
