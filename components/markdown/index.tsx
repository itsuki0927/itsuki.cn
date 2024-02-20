import React from 'react';
import { getBlogHeadingElementId } from '@/constants/anchor';
import type { StandardProps } from '@/types/common';
import Code from './Code';
import styles from './style.module.scss';
import clsx from 'clsx';
import ExternalLink from '../common/ExternalLink';
import LegacyImage from './LegacyImage';

export const H1 = ({ children, className, ...rest }: StandardProps) => {
  const id = getBlogHeadingElementId(String(children));
  return (
    <h1
      className={clsx(
        'relative group mt-0 mb-10 text-4xl font-semibold',
        className,
      )}
      id={id}
      {...rest}
    >
      {children}
    </h1>
  );
};

export const H2 = ({ children, className, ...rest }: StandardProps) => {
  const id = getBlogHeadingElementId(String(children));
  return (
    <h2
      className={clsx(
        'relative group mt-16 mb-8 text-3xl font-semibold',
        className,
      )}
      id={id}
      {...rest}
    >
      {children}
    </h2>
  );
};

export const H3 = ({ children, className, ...rest }: StandardProps) => {
  const id = getBlogHeadingElementId(String(children));
  return (
    <h3
      className={clsx(
        'relative group mt-12 mb-6 text-2xl font-semibold',
        className,
      )}
      id={id}
      {...rest}
    >
      {children}
    </h3>
  );
};

export const H4 = ({ children, className, ...rest }: StandardProps) => {
  const id = getBlogHeadingElementId(String(children));
  return (
    <h4
      className={clsx(
        'relative group mt-8 mb-6 text-xl font-semibold',
        className,
      )}
      id={id}
      {...rest}
    >
      {children}
    </h4>
  );
};

export const OrderedList = ({
  children,
  className,
  ...rest
}: StandardProps) => {
  return (
    <ol className={clsx(styles.olWrapper, className)} {...rest}>
      {React.Children.toArray(children)
        .filter(Boolean)
        .map((child: any, index) =>
          child.props ? (
            // eslint-disable-next-line react/no-array-index-key
            <li className={`${styles.olItem} group`} key={index}>
              {child.props.children}
            </li>
          ) : null,
        )}
    </ol>
  );
};

export const UnOrderedList = ({
  children,
  className,
  ...rest
}: StandardProps) => {
  return (
    <ul className={clsx(styles.ulWrapper, className)} {...rest}>
      {React.Children.toArray(children)
        .filter(Boolean)
        .map((child: any, index) =>
          child.props ? (
            <li className={`${styles.ulItem} group`} key={index}>
              {child.props.children}
            </li>
          ) : null,
        )}
    </ul>
  );
};

export const Text = ({ children, className }: StandardProps) => {
  return (
    <div className={clsx('my-3 leading-8 group relative', className)}>
      {children}
    </div>
  );
};

export const InlineCode = ({ children, className, ...rest }: StandardProps) => {
  return (
    <code
      className={clsx('mx-1 rounded-sm bg-gray-200 p-1 text-sm', className)}
      {...rest}
    >
      {children}
    </code>
  );
};

export const Blockquote = ({ children, className, ...rest }: StandardProps) => {
  return (
    <blockquote
      className={clsx(styles.blockquote, 'group', className)}
      {...rest}
    >
      {children}
    </blockquote>
  );
};

interface LinkProps extends StandardProps {
  href?: string;
}

export const Link = ({
  href = '',
  children,
  className,
  ...rest
}: LinkProps) => {
  const isExternalLink = href.startsWith('http') || href.startsWith('https');

  if (isExternalLink) {
    return (
      <ExternalLink
        href={href}
        {...rest}
        className={clsx(styles.externalLink, className)}
      >
        {children}
      </ExternalLink>
    );
  }

  return (
    <Link
      href={href}
      className={clsx(styles.internalLink, className)}
      {...rest}
    >
      {children}
    </Link>
  );
};

export const Table = ({ children, className, ...rest }: StandardProps) => {
  return (
    <table className={clsx(styles.table, className)} {...rest}>
      {children}
    </table>
  );
};

export const markdownComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  ol: OrderedList,
  ul: UnOrderedList,
  p: Text,
  pre: Code,
  a: Link,
  code: InlineCode,
  blockquote: Blockquote,
  img: LegacyImage,
  table: Table,
};

export default markdownComponents;
