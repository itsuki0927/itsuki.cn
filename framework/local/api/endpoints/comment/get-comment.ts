/* eslint-disable import/no-cycle */
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

  setTimeout(() => {
    res.status(200).json({
      data,
    });
  }, 10000);
};

export default getComment;
