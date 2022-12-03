'use client';

import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote';
import React, { ReactNode } from 'react';
import { StandardProps } from '@/types/common';
import { getBlogHeadingElementId } from '@/constants/anchor';
import styles from './style.module.scss';
import Code from '@/components/ui/Code';

interface BlogContentProps {
  source: MDXRemoteProps;
}

export const Heading = ({ children }: StandardProps) => {
  const id = getBlogHeadingElementId(String(children));
  return (
    <h2 id={id} className='relative mt-24 mb-8 text-2xl font-semibold'>
      {children}
    </h2>
  );
};

export const Subheading = ({ children }: StandardProps) => {
  const id = getBlogHeadingElementId(String(children));
  return (
    <h3 id={id} className='mt-8 mb-4 text-xl font-medium'>
      {children}
    </h3>
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

interface LinkProps {
  children?: ReactNode;
  href?: string;
}

export const Link = ({ href, children }: LinkProps) => {
  if (href?.startsWith('http') || href?.startsWith('https')) {
    return (
      <a
        className='text-primary no-underline transition-all hover:text-primary-hover hover:underline'
        href={href}
        target='_blank'
        rel='noreferrer'
      >
        {children}
      </a>
    );
  }
  return (
    <a
      className='text-primary no-underline transition-all hover:text-primary-hover hover:underline'
      href={href}
    >
      {children}
    </a>
  );
};

const components = {
  h2: Heading,
  h3: Subheading,
  ol: OrderedList,
  ul: OrderedList,
  p: Text,
  pre: Code,
  a: Link,
};

const BlogContent = ({ source }: BlogContentProps) => {
  return <MDXRemote {...source} components={components} />;
};

export default BlogContent;
