import classNames from 'clsx';
import Link from 'next/link';
import type { StandardProps } from '@/types/common';
import { genRandomColor } from '@/utils/color';
import { Tag } from '@/types/tag';

interface SmallTagProps extends Omit<StandardProps, 'children'> {
  tag: Tag;
  isDark?: boolean;
}

const SmallTag = ({
  tag,
  className = '',
  style,
  isDark = false,
}: SmallTagProps) => {
  const color = genRandomColor();
  return (
    <Link
      className={classNames(
        'transition-colors hover:text-white dark:hover:text-black duration-300 inline-flex px-2.5 py-1 rounded-full font-medium text-xs relative my-1 text-[10px] sm:text-xs',
        color,
        className,
      )}
      href={`/tag/${tag.slug}`}
      style={style}
    >
      {tag.title}
    </Link>
  );
};

export default SmallTag;
