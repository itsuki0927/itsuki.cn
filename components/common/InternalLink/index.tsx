import classNames from 'classnames';
import Link, { LinkProps } from 'next/link';
import { StandardProps } from '@/types/common';

interface InternalLinkProps extends StandardProps, LinkProps {}

const InternalLink = ({
  children,
  href,
  className = 'text-gray-600 hover:text-gray-700',
  style,
  ...rest
}: InternalLinkProps) => (
  <Link
    className={classNames('cursor-pointer transition', className)}
    href={href}
    {...rest}
  >
    {children}
  </Link>
);

export default InternalLink;
