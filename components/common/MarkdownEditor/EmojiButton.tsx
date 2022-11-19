'use client';

import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Smile } from 'react-feather';
import IconButton from './IconButton';
import s from './style.module.css';

export const EMOJIS = [
  ...['😃', '😂', '😅', '😉', '😌', '😔', '😓', '😢', '😍', '😘', '😜', '😡'],
  ...['😤', '😭', '😱', '😳', '😵', '🌚'],
  ...['🙏', '👆', '👇', '👌', '🤘', '👍', '👎', '💪', '👏'],
  ...['🌻', '🌹', '💊', '🐶', '❤️‍🔥', '💔', '💩', '👻', '🚩'],
];

interface EmojiButtonProps {
  onInsertEmoji?: (emoji: string) => void;
  className?: string;
  size?: number;
  emojiClassName?: string;
}

const EmojiButton = ({
  onInsertEmoji,
  className,
  emojiClassName = '',
  size = 16,
}: EmojiButtonProps) => {
  const [display, setDisplay] = useState(false);

  const handleInsertEmoji = (emoji: string) => {
    onInsertEmoji?.(emoji);
    setDisplay(v => !v);
  };

  useEffect(() => {
    const handleClick = () => {
      setDisplay(false);
    };
    if (display) {
      document.addEventListener('click', handleClick);
    }
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [display]);

  return (
    <IconButton
      aria-label='insert emoji'
      className={classNames(
        s.emoji,
        'text-xxs text-gray-500 hover:text-gray-600',
        className
      )}
      onClick={e => {
        e.stopPropagation();
        setDisplay(v => !v);
      }}
    >
      <Smile size={size} />

      <div
        className={classNames(
          'absolute left-0 right-0 top-0 overflow-y-scroll bg-gray-50 p-3 text-left opacity-80 transition-all duration-300',
          emojiClassName,
          display ? 'block' : 'hidden'
        )}
      >
        {EMOJIS.map(emoji => (
          <button
            key={emoji}
            type='button'
            aria-label='emoji'
            className='inline-block cursor-pointer rounded-sm py-1 px-2 text-xl hover:bg-gray-200'
            onClick={() => handleInsertEmoji(emoji)}
          >
            {emoji}
          </button>
        ))}
      </div>
    </IconButton>
  );
};

export default EmojiButton;
