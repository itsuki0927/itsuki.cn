import clsx from 'clsx';
import type { AreaHTMLAttributes, ReactNode } from 'react';

type ExternalLinkProps = Omit<
  AreaHTMLAttributes<HTMLAnchorElement>,
  'href' | 'children'
> & {
  href: string;
  children: ReactNode;
};

const ExternalLink = ({
  href,
  children,
  className = '',
  ...rest
}: ExternalLinkProps) => (
  <a
    {...rest}
    className={clsx(
      'transition hover:text-zinc-800 hover:underline',
      className,
    )}
    href={href}
    rel="noopener noreferrer"
    target="_blank"
  >
    {children}
  </a>
);

export default ExternalLink;
