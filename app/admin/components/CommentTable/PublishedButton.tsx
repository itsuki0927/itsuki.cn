import { Comment } from "@/types/comment";
import { Button } from "@/components/ui/button";
import { CommentState } from "@/constants/comment";
import { Row } from "@tanstack/react-table";
import React from "react";
import {updateCommentState} from "@/actions/comment";

interface PublishedButtonProps {
  row: Row<Comment>;
}

const PublishedButton = ({ row }: PublishedButtonProps) => {
  return (
    <Button
      onClick={() => {
        updateCommentState(row.original.id, CommentState.Published);
      }}
    >
      审核通过
    </Button>
  );
};

export default PublishedButton;
