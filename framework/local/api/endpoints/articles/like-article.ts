import { ArticlesEndpoint } from '.';

const likeArticle: ArticlesEndpoint['handlers']['likeArticle'] = async ({
  res,
  config,
  body: { articleId },
}) => {
  config.fetch('PATCH', `/article/${articleId}`, {
    meta: 'liking',
  });

  res.status(200).json({ data: null, errors: [] });
};

export default likeArticle;
