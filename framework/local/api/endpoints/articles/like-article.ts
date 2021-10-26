// eslint-disable-next-line import/no-cycle
// eslint-disable-next-line import/no-cycle
import { ArticlesEndpoint } from '.';

const likeArticle: ArticlesEndpoint['handlers']['likeArticle'] = async ({
  res,
  config,
  body: { articleId },
}) => {
  config.fetch('PATCH', `/article/${articleId}`, {
    meta: 'liking',
  });

  return res.status(200).json({ data: null, errors: [] });
};

export default likeArticle;
