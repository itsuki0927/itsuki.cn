import React, { ReactNode } from 'react';
import { StandardProps } from '@/types/common';
import { getBlogHeadingElementId } from '@/constants/anchor';
import styles from './style.module.scss';
import Code from './Code';
import Image from './Image';
import ExternalLink from '@/components/common/ExternalLink';
import InternalLink from '@/components/common/InternalLink';

export const H2 = ({ children }: StandardProps) => {
  const id = getBlogHeadingElementId(String(children));
  return (
    <h2 id={id} className='relative mt-24 mb-8 text-3xl font-semibold'>
      {children}
    </h2>
  );
};

export const H3 = ({ children }: StandardProps) => {
  const id = getBlogHeadingElementId(String(children));
  return (
    <h3 id={id} className='mt-11 mb-6 text-2xl font-semibold'>
      {children}
    </h3>
  );
};

export const H4 = ({ children }: StandardProps) => {
  const id = getBlogHeadingElementId(String(children));
  return (
    <h4 id={id} className='mt-8 mb-6 text-xl font-semibold'>
      {children}
    </h4>
  );
};

export const OrderedList = ({ children }: StandardProps) => {
  return (
    <ol className={styles.olWrapper}>
      {React.Children.toArray(children)
        .filter(Boolean)
        .map((child: any, index) =>
          child.props ? (
            // eslint-disable-next-line react/no-array-index-key
            <li className={styles.olItem} key={index}>
              <div>{child.props.children}</div>
            </li>
          ) : null
        )}
    </ol>
  );
};

export const Text = ({ children }: StandardProps) => {
  return <p className='mb-4 leading-8'>{children}</p>;
};

export const InlineCode = ({ children }: StandardProps) => {
  return <code className='mx-1 rounded-sm bg-gray-200 p-1 text-sm'>{children}</code>;
};

export const Blockquote = ({ children }: StandardProps) => {
  return <blockquote className={styles.blockquote}>{children}</blockquote>;
};

interface LinkProps {
  children?: ReactNode;
  href?: string;
}

export const Link = ({ href, children }: LinkProps) => {
  if (href?.startsWith('http') || href?.startsWith('https')) {
    return (
      <ExternalLink className={styles.externalLink} href={href}>
        {children}
      </ExternalLink>
    );
  }
  return (
    <InternalLink className={styles.internalLink} href={String(href)}>
      {children}
    </InternalLink>
  );
};

export { Code, Image };
