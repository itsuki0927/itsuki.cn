"use client";

import clsx from "clsx";
import { Monitor, Plus, Smartphone, Smile } from "react-feather";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { UAParser } from "ua-parser-js";
import { getCommentElementId } from "@/constants/anchor";
import markdownComponents from "../../../../components/markdown";
import React, { startTransition } from "react";
import CommentAvatar from "../CommentAvatar";
import EmojiPopover from "../EmojiPopover";
import { StandardProps } from "@/types/common";
import { Comment } from "@/types/comment";
import useOptimisticComment from "./hooks/useOptimisticComment";
import { formatDate } from "@/utils/formatDate";
import { likeComment } from "@/actions/comment";

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
  const commentEmoji = optimisticComment.emoji || {};

  const parser = new UAParser(optimisticComment.agent ?? "");
  const device = parser.getDevice();
  const isMobile = device.type === "mobile";

  const handleEmojiClick = async (emoji: string) => {
    startTransition(() => {
      addOptimisticComment(emoji);
    });
    likeComment(optimisticComment.id, emoji);
  };

  const renderEmojis = () => {
    const emojis = Object.keys(commentEmoji);
    if (emojis.length !== 0) {
      return (
        <motion.ul className="relative flex flex-wrap items-center">
          {emojis.map((emoji) =>
            commentEmoji?.[emoji]?.length ? (
              <motion.li key={emoji}>
                <button
                  className={clsx(
                    "flex mr-1 sm:mr-2 mt-1 sm:mt-2 items-center h-6 text-xs rounded-lg bg-blue-100 border border-solid border-blue-100 py-[2px] pr-[6px] pl-1",
                  )}
                  onClick={() => handleEmojiClick(emoji)}
                  type="button"
                >
                  <span>{emoji}</span>
                  <span className="ml-1 text-gray-600">
                    {commentEmoji[emoji].length}
                  </span>
                </button>
              </motion.li>
            ) : null,
          )}
          <li key="comment-smile">
            <EmojiPopover key="smile1" onEmojiClick={handleEmojiClick}>
              <button
                className={clsx(
                  "flex mt-2 items-center h-6 text-xs rounded-lg bg-gray-100 border border-solid border-gray-100 py-[2px] pr-[6px] pl-1 hover:bg-white",
                )}
                type="button"
              >
                <Smile size={14} />
                <Plus className="ml-1" size={10} />
              </button>
            </EmojiPopover>
          </li>
        </motion.ul>
      );
    }
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

      {renderEmojis()}

      {children}
    </motion.div>
  );
};

export default CommentCard;
