import { Comment } from '@/types/comment';
import { Button } from '@/components/ui/button';
import { CommentState } from '@/constants/comment';
import { Row } from '@tanstack/react-table';
import React from 'react';
import { updateCommentState } from '@/actions/comment';

interface DeletedButtonProps {
  row: Row<Comment>;
}

const DeletedButton = ({ row }: DeletedButtonProps) => {
  return (
    <Button
      variant="destructive"
      onClick={() => {
        updateCommentState(row.original.id, CommentState.Deleted);
      }}
    >
      移回收站
    </Button>
  );
};

export default DeletedButton;
