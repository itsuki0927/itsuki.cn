import { Comment } from '@/types/comment';
import { Button } from '@/components/ui/button';
import { CommentState } from '@/constants/comment';
import { Row } from '@tanstack/react-table';
import React from 'react';
import { updateCommentState } from '@/actions/comment';

interface AuditingButtonProps {
  row: Row<Comment>;
}

const AuditingButton = ({ row }: AuditingButtonProps) => {
  return (
    <Button
      variant="secondary"
      onClick={() => {
        updateCommentState(row.original.id, CommentState.Auditing);
      }}
    >
      退回草稿
    </Button>
  );
};

export default AuditingButton;
