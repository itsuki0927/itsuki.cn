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
    className={className}
    target='_blank'
    rel='noopener noreferrer'
    href={href}
  >
    {children}
  </a>
);

export default ExternalLink;
