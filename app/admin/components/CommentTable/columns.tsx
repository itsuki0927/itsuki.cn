'use client';

import CommentAvatar from '@/app/guestbook/components/CommentAvatar';
import { Comment } from '@/types/comment';
import { ColumnDef } from '@tanstack/react-table';
import ReactMarkdown from 'react-markdown';
import CommentDrawer from './CommentDrawer';
import { Mail } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import DeleteCommentDialog from './DeleteCommentDialog';
import { CommentState, commentStateMap } from '@/constants/comment';
import SpamButton from './SpamButton';
import DeletedButton from './DeletedButton';
import PublishedButton from './PublishedButton';
import AuditingButton from './AuditingButton';
import { Checkbox } from '@/components/ui/checkbox';

export const columns: ColumnDef<Comment>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value: boolean) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'parentId',
    header: 'PID',
    cell: ({ row }) => row.getValue('parentId') || '-',
  },
  {
    accessorKey: 'blogId',
    header: 'BID',
  },
  {
    header: '个人信息',
    accessorKey: 'avatar',
    cell: ({ row }) => {
      return (
        <div className="flex-col flex gap-2">
          <div className="flex items-center gap-3">
            <CommentAvatar avatar={row.original.avatar} />
            <span>{row.original.nickname}</span>
          </div>
          <span className="flex items-center gap-1">
            <Mail size={14} />
            {row.original.email}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'content',
    header: 'Content',
    cell: ({ row }) => <ReactMarkdown>{row.original.content}</ReactMarkdown>,
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => (
      <div className="">
        <Badge
          variant={commentStateMap[row.original.state as CommentState].badge}
        >
          {commentStateMap[row.original.state as CommentState].label}
        </Badge>
        <p>{new Date(row.original.createdAt).toLocaleString()}</p>
      </div>
    ),
  },
  {
    id: 'actions',
    header: 'Actions',
    maxSize: 150,
    cell: ({ row }) => {
      const state = row.original.state;
      return (
        <div className="flex flex-col gap-2 items-start">
          <CommentDrawer />

          {state === CommentState.Published ? (
            <>
              <SpamButton row={row} />
              <DeletedButton row={row} />
            </>
          ) : null}

          {state === CommentState.Auditing ? (
            <>
              <PublishedButton row={row} />
              <SpamButton row={row} />
              <DeletedButton row={row} />
            </>
          ) : null}

          {state === CommentState.Spam || state === CommentState.Deleted ? (
            <AuditingButton row={row} />
          ) : null}

          {state === CommentState.Deleted ? (
            <DeleteCommentDialog row={row} />
          ) : null}
        </div>
      );
    },
  },
];
