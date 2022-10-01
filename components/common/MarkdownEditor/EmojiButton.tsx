import classNames from 'classnames';
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
}: EmojiButtonProps) => (
  <IconButton
    aria-label='insert emoji'
    className={classNames(
      s.emoji,
      'text-xxs text-gray-500 hover:text-gray-600',
      className
    )}
  >
    <Smile size={size} />

    <div
      className={classNames(
        s.emojiList,
        'absolute left-0 right-0 top-0 overflow-y-scroll bg-gray-50 p-3 text-left opacity-80 transition-all duration-300',
        emojiClassName
      )}
    >
      {EMOJIS.map(emoji => (
        <button
          type='button'
          aria-label='emoji'
          className='inline-block cursor-pointer rounded-sm py-1 px-2 text-xl hover:bg-gray-200'
          onClick={() => onInsertEmoji?.(emoji)}
          key={emoji}
        >
          {emoji}
        </button>
      ))}
    </div>
  </IconButton>
);

export default EmojiButton;
