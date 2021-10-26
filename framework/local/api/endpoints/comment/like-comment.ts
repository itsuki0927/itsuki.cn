import { CommentEndpoint, CommentPathPrefix } from '.';

const likeComment: CommentEndpoint['handlers']['likeComment'] = async ({
  res,
  config,
  body: { commentId },
}) => {
  config.fetch('PATCH', `${CommentPathPrefix}/${commentId}`, {
    meta: 'liking',
  });

  return res.status(200).json({ data: null, errors: [] });
};

export default likeComment;
