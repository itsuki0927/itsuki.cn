import { Comment } from '@/entities/comment';

export type CommentTree = Comment & {
  children?: CommentTree[];
};

export function convertToCommentTreeData(state: { comments: Comment[] }) {
  // only keep 2 level tree
  const ids = state.comments.map(comment => comment.id);
  const roots = state.comments.filter(
    comment => comment.parentId === 0 || !ids.includes(comment.parentId)
  );
  const children = state.comments.filter(
    comment => comment.parentId !== 0 && ids.includes(comment.parentId)
  );
  const fullMap = new Map<number, Comment>(
    state.comments.map(comment => [comment.id, comment])
  );
  const treeMap = new Map<number, { comment: Comment; children: Array<Comment> }>(
    roots.map(comment => [comment.id, { comment, children: [] }])
  );

  const findRootParentID = (pid: number): number | void => {
    const target = fullMap.get(pid);
    if (!target) {
      return undefined;
    }
    return target.parentId === 0 ? target.id : findRootParentID(target.parentId);
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
