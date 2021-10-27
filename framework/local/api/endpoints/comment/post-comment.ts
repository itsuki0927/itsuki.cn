import { Comment } from '@/entities/comment';
import { FetcherError } from '@/framework/blog/utils/errors';
import { CommentEndpoint, CommentPathPrefix } from '.';

const postComment: CommentEndpoint['handlers']['postComment'] = async ({
  config,
  body,
  res,
}) => {
  try {
    const { data } = await config.fetch<Comment>('POST', `${CommentPathPrefix}`, body);
    res.status(200).json({ data });
  } catch (error) {
    if (error instanceof FetcherError) {
      res.status(400).json({ data: null, errors: [{ message: error.message }] });
    }
  }
};

export default postComment;
