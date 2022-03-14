import { ArticlesEndpoint } from '.';

const getArticles: ArticlesEndpoint['handlers']['getArticles'] = async ({
  res,
  body,
  blog,
}) => {
  const data = await blog.getAllArticles({ variables: body });

  res.status(200).json({
    data: {
      articles: data,
      found: !!data.total,
    },
  });
};

export default getArticles;
