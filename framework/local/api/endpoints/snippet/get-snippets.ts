import { SnippetsEndpoint } from '.';

const getSnippets: SnippetsEndpoint['handlers']['getSnippets'] = async ({
  res,
  body,
  blog,
}) => {
  const snippets = await blog.getAllSnippets({ variables: body });

  res.status(200).json({
    data: {
      snippets,
      found: !!snippets.total,
    },
  });
};

export default getSnippets;
