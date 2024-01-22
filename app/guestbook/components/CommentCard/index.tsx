'use client';

import { likeComment } from '@/actions/comment';
import { getCommentElementId } from '@/constants/anchor';
import { Comment } from '@/types/comment';
import { StandardProps } from '@/types/common';
import { formatDate } from '@/utils/formatDate';
import { motion } from 'framer-motion';
import { Monitor, Smartphone, Smile } from 'lucide-react';
import { startTransition } from 'react';
import ReactMarkdown from 'react-markdown';
import markdownComponents from '../../../../components/markdown';
import CommentAvatar from '../CommentAvatar';
import EmojiPopover from '../EmojiPopover';
import CommentEmojis from './CommentEmojis';
import useOptimisticComment from './hooks/useOptimisticComment';
import { useToast } from '@/components/ui/use-toast';

interface CommentCardProps extends StandardProps {
  comment: Comment;
}

// interface CommentCardProps {
//   className?: string;
//   data: CommentTree;
//   children?: ReactNode;
// }

const commentVariant = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -100 },
};

const CommentCard = ({
  comment,
  className = '',
  children,
}: CommentCardProps) => {
  const [optimisticComment, addOptimisticComment] =
    useOptimisticComment(comment);
  const { toast } = useToast();
  const isMobile = optimisticComment.userAgent.device?.type === 'mobile';

  const handleEmojiClick = async (emoji: string) => {
    startTransition(() => {
      addOptimisticComment(emoji);
    });
    try {
      await likeComment(optimisticComment.id, emoji);
    } catch (err: any) {
      toast({
        title: '点赞失败',
        description: err.message,
      });
    }
  };

  const renderGeo = () => {
    if (optimisticComment.geo?.country && optimisticComment.geo?.province) {
      return (
        <>
          <span className="mr-1">{optimisticComment.geo.flag || ''}</span>
          {optimisticComment.geo?.country}
          <span className="mx-1">·</span>
          {optimisticComment.geo?.province}
        </>
      );
    }
    return '未知';
  };

  return (
    <motion.div
      className={`transition-all p-4 duration-500 ${className}`}
      id={getCommentElementId(optimisticComment.id)}
      key={optimisticComment.id}
      variants={commentVariant}
    >
      <div className="flex items-center h-10 ">
        <CommentAvatar avatar={optimisticComment.avatar} size={28} />
        <div className="ml-2 sm:ml-3 dark:text-zinc-100 text-sm flex-1 flex justify-between items-center">
          <div className="flex items-center text-xs text-zinc-500">
            <span className="text-sm text-zinc-900 font-semibold">
              {optimisticComment.nickname}
            </span>

            <span className="ml-2">{renderGeo()}</span>

            <span className="mx-2 sm:mx-3 flex items-center">
              {isMobile ? <Smartphone size={14} /> : <Monitor size={14} />}
              <span className="ml-1">
                {optimisticComment.userAgent.os.name}
              </span>
            </span>

            <span className="hidden sm:block">
              {formatDate(optimisticComment.createdAt, 'ago')}
            </span>
          </div>

          <EmojiPopover key="smile1" onEmojiClick={handleEmojiClick}>
            <Smile
              className="rounded-md p-1 bg-zinc-100 hover:bg-zinc-200"
              size={20}
            />
          </EmojiPopover>
        </div>
      </div>

      <ReactMarkdown
        className="text-sm text-zinc-800 mt-2"
        components={markdownComponents}
        // remarkPlugins={[[remarkGfm]]}
      >
        {optimisticComment.content}
      </ReactMarkdown>

      <CommentEmojis
        emoji={optimisticComment.emoji}
        onEmojiClick={handleEmojiClick}
      />

      <div className="block mt-2 sm:hidden text-xs text-zinc-500">
        <span>{formatDate(optimisticComment.createdAt, 'ago')}</span>
      </div>

      {children}
    </motion.div>
  );
};

export default CommentCard;
