import classNames from 'classnames';
import { ReactNode } from 'react';

type ExternalLinkProps = Omit<
  React.AreaHTMLAttributes<HTMLAnchorElement>,
  'href' | 'children'
> & {
  href: string;
  children: ReactNode;
};

const ExternalLink = ({ href, children, className = '', ...rest }: ExternalLinkProps) => (
  <a
    {...rest}
    className={classNames('text-gray-500 transition hover:text-gray-600', className)}
    target='_blank'
    rel='noopener noreferrer'
    href={href}
  >
    {children}
  </a>
);

export default ExternalLink;
