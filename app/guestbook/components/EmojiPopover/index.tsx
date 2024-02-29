import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { EMOJI_LIST } from './const';
import React, { ReactNode } from 'react';

interface EmojiPopoverProps {
  onEmojiClick: (emoji: string) => void;
  children: ReactNode;
  triggerClassName?: string;
}

const EmojiPopover = ({
  onEmojiClick,
  children,
  triggerClassName,
}: EmojiPopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger className={triggerClassName}>{children}</PopoverTrigger>
      <PopoverContent>
        <ul className="z-50 grid grid-cols-6 rounded-md text-sm bg-white p-2 w-64 h-60 overflow-y-auto">
          {EMOJI_LIST.map((emoji) => (
            <li key={emoji}>
              <button
                className="w-10 h-8 rounded-md m-auto transition-colors hover:bg-gray-100"
                onClick={() => onEmojiClick(emoji)}
                type="button"
              >
                {emoji}
              </button>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default EmojiPopover;
