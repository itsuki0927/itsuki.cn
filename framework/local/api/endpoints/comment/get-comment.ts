import { Comment } from '@/entities/comment';
import { CommentEndpoint, CommentPathPrefix } from '.';

const getComment: CommentEndpoint['handlers']['getComment'] = async ({
  config,
  body: { articleId },
  res,
}) => {
  const { data } = await config.fetch<Comment[]>(
    'GET',
    `${CommentPathPrefix}/${articleId}`
  );

  res.status(200).json({ data });
};

export default getComment;
