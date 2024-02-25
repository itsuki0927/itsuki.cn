'use client';

import clsx from 'clsx';
import { useRef, useState } from 'react';
import { Bold, Eye, Italic, Loader, Send, Smile } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import type { RichTextareaHandle } from 'rich-textarea';
import { useLocalStorage } from 'usehooks-ts';
import { motion } from 'framer-motion';
import markdownComponents from '@/components/markdown';
import CommentInput from '../CommentInput';
import EmojiPopover from '../EmojiPopover';
import { StandardProps } from '@/types/common';
import useGetUser from '@/app/blog/[slug]/hooks/useGetUser';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface IconButtonProps extends StandardProps {
  onClick?: () => void;
}

const IconButton = ({ children, onClick }: IconButtonProps) => {
  return (
    <button
      className="text-zinc-500 w-6 h-6 flex justify-center items-center rounded-md hover:bg-primary hover:text-white"
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

interface CommentSenderProps {
  className?: string;
  onSend: (content: string) => Promise<boolean>;
  isLoading: boolean;
  cacheContentKey?: string;
}

const opacityInitialAnimation = {
  opacity: 0,
};
const opacityActiveAnimation = {
  opacity: 1,
};

const CommentSender = ({
  className = '',
  onSend,
  isLoading,
  cacheContentKey = 'comment-sender',
}: CommentSenderProps) => {
  const [preview, setPreview] = useState(false);
  const [content, setContent] = useLocalStorage(cacheContentKey, '');
  const inputRef = useRef<RichTextareaHandle | null>(null);
  const { data: user } = useGetUser();

  const hasValue = Boolean(content);

  const handleItalic = () => {
    if (!inputRef.current) return;
    const start = inputRef.current.selectionStart;
    const end = inputRef.current.selectionEnd;
    inputRef.current.setRangeText(`*${content.slice(start, end)}*`, start, end);
  };

  const handleBold = () => {
    if (!inputRef.current) return;
    const start = inputRef.current.selectionStart;
    const end = inputRef.current.selectionEnd;
    inputRef.current.setRangeText(
      `**${content.slice(start, end)}**`,
      start,
      end,
    );
  };

  const handleEmoji = async (emoji: string) => {
    if (!inputRef.current) return;
    const start = inputRef.current.selectionStart;
    const end = inputRef.current.selectionEnd;
    inputRef.current.setRangeText(emoji, start, end);
  };

  const handlePreview = () => {
    setPreview((v) => !v);
  };

  return (
    <motion.div
      animate={opacityActiveAnimation}
      className={clsx('p-2 relative bg-white z-10', className)}
      exit={opacityInitialAnimation}
      initial={opacityInitialAnimation}
    >
      <div className="flex p-2">
        {user ? (
          <Avatar className="border border-solid bg-zinc-200 ring-2 ring-zinc-200">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback>{user?.nickname.at(0)}</AvatarFallback>
          </Avatar>
        ) : null}
        <CommentInput onChange={setContent} ref={inputRef} value={content} />
      </div>

      {preview ? (
        <motion.div
          animate={{
            opacity: 1,
          }}
          className="text-sm absolute left-0 rounded-xl right-0 top-0 cursor-not-allowed bg-zinc-50 overflow-y-auto p-2 sm:p-4 transition-all duration-300 z-10 bottom-[46px]"
          exit={{ opacity: 0 }}
          initial={{
            opacity: 0,
          }}
          layout
        >
          <ReactMarkdown components={markdownComponents}>
            {content}
          </ReactMarkdown>
        </motion.div>
      ) : null}

      <div className="py-1 px-2 flex gap-2 justify-between">
        <div className="flex gap-2 items-center">
          <EmojiPopover
            key="emoji"
            triggerClassName="text-zinc-500 w-6 h-6 flex justify-center items-center rounded-md hover:bg-primary hover:text-white"
            onEmojiClick={handleEmoji}
          >
            <Smile size={16} />
          </EmojiPopover>
          <IconButton key="bold" onClick={handleBold}>
            <Bold size={16} />
          </IconButton>
          <IconButton key="italic" onClick={handleItalic}>
            <Italic size={16} />
          </IconButton>
          <span className="h-2 w-[1px] bg-zinc-200" />
          <IconButton key="preview" onClick={handlePreview}>
            <Eye size={16} />
          </IconButton>
        </div>

        <button
          key="send"
          type="button"
          className={clsx(
            'px-4 h-6 flex justify-center items-center rounded transition-all',
            hasValue
              ? 'hover:bg-primary bg-primary text-white hover:text-white'
              : 'cursor-not-allowed text-zinc-500 hover:text-zinc-400',
          )}
          disabled={isLoading || !hasValue}
          onClick={async () => {
            onSend(content).then((result) => {
              if (result) {
                setContent('');
              }
            });
          }}
        >
          {isLoading ? (
            <Loader
              size={12}
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
            />
          ) : null}
          <Send size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default CommentSender;
