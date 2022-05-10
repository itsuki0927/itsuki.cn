import { Comment } from '@/entities/comment';

export type CommentTree = Comment & {
  children?: CommentTree[];
};

export function convertToCommentTreeData(comments: Comment[] = []) {
  // only keep 2 level tree
  const ids = comments.map(comment => comment.id);
  const roots = comments.filter(
    comment => +comment.parentId === 0 || !ids.includes(comment.parentId)
  );
  const children = comments.filter(
    comment => +comment.parentId !== 0 && ids.includes(comment.parentId)
  );
  const fullMap = new Map<number, Comment>(
    comments.map(comment => [comment.id, comment])
  );
  const treeMap = new Map<number, { comment: Comment; children: Array<Comment> }>(
    roots.map(comment => [comment.id, { comment, children: [] }])
  );

  const findRootParentID = (pid: number): number | void => {
    const target = fullMap.get(pid);
    if (!target) {
      return undefined;
    }
    return +target.parentId === 0 ? target.id : findRootParentID(target.parentId);
  };

  children.forEach(comment => {
    const rootPID = findRootParentID(comment.parentId);
    if (rootPID) {
      if (treeMap.has(rootPID)) {
        const target = treeMap.get(rootPID)!;
        treeMap.set(rootPID, {
          ...target,
          children: [comment, ...target.children],
        });
      }
    }
  });
  return Array.from(treeMap.values());
}

export const isEmail = (email: string) =>
  // eslint-disable-next-line no-control-regex
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
    email
  );
