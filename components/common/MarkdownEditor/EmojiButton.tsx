import classNames from 'classnames';
import { Smile } from 'react-feather';
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
}

const EmojiButton = ({ onInsertEmoji, className }: EmojiButtonProps) => (
  <button
    type='button'
    aria-label='insert emoji'
    className={classNames(
      s.emoji,
      'px-3 text-xxs text-gray-500 hover:bg-gray-200 hover:text-gray-600',
      className
    )}
  >
    <Smile size={16} />

    <div
      className={classNames(
        s.emojiList,
        'absolute left-0 right-0 top-0 bottom-8 overflow-y-scroll bg-gray-50 p-3 text-left opacity-80 transition-all duration-300 '
      )}
    >
      {EMOJIS.map(emoji => (
        <button
          type='button'
          aria-label='emoji'
          className='inline-block cursor-pointer rounded-sm py-1 px-2 text-xl hover:bg-[#ccc]'
          onClick={() => onInsertEmoji?.(emoji)}
          key={emoji}
        >
          {emoji}
        </button>
      ))}
    </div>
  </button>
);

export default EmojiButton;
