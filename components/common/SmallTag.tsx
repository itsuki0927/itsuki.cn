import classNames from 'clsx';
import Link from 'next/link';
import type { StandardProps } from '@/types/common';
import { ReactNode } from 'react';

interface SmallTagProps extends Omit<StandardProps, 'children'> {
  href: string;
  children: ReactNode;
  isDark?: boolean;
}

const SmallTag = ({
  href,
  children,
  className = '',
  style,
  isDark = false,
}: SmallTagProps) => {
  return (
    <Link
      className={classNames(
        'transition-colors hover:text-white dark:hover:text-black duration-300 inline-flex px-2.5 py-1 rounded-md font-medium text-xs relative my-1 text-[10px] sm:text-xs',
        'text-zinc-800 bg-zinc-100 hover:bg-primary',
        className,
      )}
      href={href}
      style={style}
    >
      {children}
    </Link>
  );
};

export default SmallTag;
