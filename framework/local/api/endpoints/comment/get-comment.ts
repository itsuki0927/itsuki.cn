import { Comment } from '@/entities/comment';
import { CommentEndpoint } from '.';

const getComment: CommentEndpoint['handlers']['getComment'] = async ({
  config,
  body: { articleId },
  res,
}) => {
  const { data } = await config.fetch<Comment[]>('GET', `/article/${articleId}/comments`);

  res.status(200).json({ data });
};

export default getComment;
