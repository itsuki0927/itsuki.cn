import { CommentState } from '@/types/comment';
import createEnumObject from '@/utils/createEnumObject';

export const GUESTBOOK = 10000;

export const commentState = createEnumObject<CommentState>({
  auditing: 'auditing',
  published: 'published',
  spam: 'spam',
  trash: 'trash',
  deleted: 'deleted',
});
