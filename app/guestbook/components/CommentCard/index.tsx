"use client";

import { likeComment } from "@/actions/comment";
import { getCommentElementId } from "@/constants/anchor";
import { Comment } from "@/types/comment";
import { StandardProps } from "@/types/common";
import { formatDate } from "@/utils/formatDate";
import { motion } from "framer-motion";
import { Monitor, Smartphone, Smile } from "lucide-react";
import { startTransition } from "react";
import ReactMarkdown from "react-markdown";
import { UAParser } from "ua-parser-js";
import markdownComponents from "../../../../components/markdown";
import CommentAvatar from "../CommentAvatar";
import EmojiPopover from "../EmojiPopover";
import CommentEmojis from "./CommentEmojis";
import useOptimisticComment from "./hooks/useOptimisticComment";

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
  className = "",
  children,
}: CommentCardProps) => {
  const [optimisticComment, addOptimisticComment] =
    useOptimisticComment(comment);
  const parser = new UAParser(optimisticComment.agent ?? "");
  const device = parser.getDevice();
  const isMobile = device.type === "mobile";

  const handleEmojiClick = async (emoji: string) => {
    startTransition(() => {
      addOptimisticComment(emoji);
    });
    likeComment(optimisticComment.id, emoji);
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
            <span className="ml-1">{optimisticComment.city || "未知"}</span>
            <span className="mx-1">·</span>
            {isMobile ? <Smartphone size={14} /> : <Monitor size={14} />}

            <span className="ml-1">
              {formatDate(optimisticComment.createdAt, "ago")}
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

      {children}
    </motion.div>
  );
};

export default CommentCard;
