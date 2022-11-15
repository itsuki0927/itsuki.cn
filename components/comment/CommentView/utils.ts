import { Comment } from '@/entities/comment';

export type CommentTree = Comment & {
  children?: CommentTree[];
};

export function convertToCommentTreeData(list: Comment[]) {
  const map = new Map<number, number>();
  const roots: CommentTree[] = [];

  const commentTreeList = list.map((comment, idx) => {
    map.set(Number(comment.id), idx);
    return {
      ...comment,
      children: [],
    } as CommentTree;
  });

  commentTreeList.forEach(comment => {
    if (Number(comment.parentId) !== 0) {
      const parentIdx = map.get(Number(comment.parentId));
      if (parentIdx && commentTreeList[parentIdx]) {
        commentTreeList[parentIdx].children?.push(comment);
      }
    } else {
      roots.push(comment);
    }
  });

  return roots;
}

export const isEmail = (email: string) =>
  // eslint-disable-next-line no-control-regex
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
    email
  );
