import { Comment } from "@/types/comment";
import { motion } from "framer-motion";
import clsx from "clsx";
import React from "react";
import EmojiPopover from "../EmojiPopover";
import { Plus, Smile } from "lucide-react";

interface CommentEmojisProps {
  emoji: Comment["emoji"];
  onEmojiClick: (emoji: string) => void;
}

const CommentEmojis = ({ emoji, onEmojiClick }: CommentEmojisProps) => {
  const commentEmoji = emoji || {};
  const emojis = Object.keys(commentEmoji);
  if (emojis.length !== 0) {
    return (
      <motion.ul className="relative flex flex-wrap items-center">
        {emojis.map((emoji) =>
          commentEmoji?.[emoji]?.length ? (
            <motion.li key={emoji}>
              <button
                className={clsx(
                  "flex mr-1 sm:mr-2 mt-1 sm:mt-2 items-center h-6 text-xs rounded-md bg-blue-100 border border-solid border-blue-100 py-[2px] pr-[6px] pl-1",
                )}
                onClick={() => onEmojiClick(emoji)}
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
          <EmojiPopover key="smile1" onEmojiClick={onEmojiClick}>
            <button
              className={clsx(
                "flex mt-2 items-center h-6 text-xs rounded-md bg-gray-100 border border-solid border-gray-100 py-[2px] pr-[6px] pl-1 hover:bg-white",
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
  return null;
};

export default CommentEmojis;
