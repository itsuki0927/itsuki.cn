"use client";

import classNames from "classnames";
import type { ReactNode } from "react";
import { Monitor, Plus, Smartphone, Smile } from "react-feather";
import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";
// import { useSWRConfig } from "swr";
import { UAParser } from "ua-parser-js";
import { getCommentElementId } from "@/constants/anchor";
import markdownComponents from "@/components/ui/mdx";
// import ToDate from "@/components/common/ToDate";
// import useLikeComment from "@/components/common/CommentUI/hooks/useLikeComment.ts";
// import type { CommentTree } from "../../util/convertToTreeData.ts";
import { Database } from "@/types_db";
import React from "react";
import CommentAvatar from "../CommentAvatar";
import EmojiPopover from "../EmojiPopover";
import { StandardProps } from "@/types/common";

interface CommentCardProps extends StandardProps {
  comment: Database["public"]["Tables"]["comment"]["Row"];
}

// interface CommentCardProps {
//   className?: string;
//   data: CommentTree;
//   children?: ReactNode;
// }
//
const commentVariant = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -100 },
};

const CommentCard = ({
  comment,
  className = "",
  children,
}: CommentCardProps) => {
  // const { likeComment, emojiMap, emojiTotal } = useLikeComment({
  //   emojiMap: comment.emojiMap,
  //   id: comment.id,
  // });

  const parser = new UAParser(comment.agent ?? "");
  const device = parser.getDevice();
  const isMobile = device.type === "mobile";

  // const { mutate } = useSWRConfig();

  const handleEmojiClick = async (emoji: string) => {
    // const result = await likeComment(emoji);
    // if (result) {
    //   void mutate(
    //     (key: string) => key === `/api/comment?blogId=${comment.blogId}`,
    //   );
    // }
  };

  const renderEmojis = () => {
    // const emojis = Object.keys(emojiMap ?? {});
    const emojis = Object.keys({});
    if (emojis.length === 0) {
      return null;
    }
  };

  return (
    <motion.div
      className={`transition-all p-4 duration-500 ${className}`}
      id={getCommentElementId(comment.id)}
      key={comment.id}
      variants={commentVariant}
    >
      <div className="flex items-center h-10 ">
        <CommentAvatar avatar={comment.avatar} size={28} />
        <div className="ml-2 sm:ml-3 dark:text-zinc-100 text-sm flex-1 flex justify-between items-center">
          <div className="flex items-center text-xs text-zinc-500">
            <span className="text-sm text-zinc-900 font-semibold">
              {comment.nickname}
            </span>
            <span className="ml-1">{comment.city || "未知"}</span>
            <span className="mx-1">·</span>
            {isMobile ? <Smartphone size={14} /> : <Monitor size={14} />}

            <span className="ml-1">
              {/* <ToDate date={comment.createAt} to="ago" /> */}
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

      {/* {comment.content} */}

      <ReactMarkdown
        className="text-sm text-zinc-800 mt-2"
        components={markdownComponents}
        // remarkPlugins={[[remarkGfm]]}
      >
        {comment.content}
      </ReactMarkdown>

      {renderEmojis()}

      {children}
    </motion.div>
  );
};

export default CommentCard;
