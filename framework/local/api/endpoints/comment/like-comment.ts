import { CommentEndpoint } from '.';

const likeComment: CommentEndpoint['handlers']['likeComment'] = async ({
  res,
  config,
  body: { commentId },
}) => {
  config.fetch('PATCH', `/comment/${commentId}`, {
    meta: 'liking',
  });

  return res.status(200).json({ data: null, errors: [] });
};

export default likeComment;
