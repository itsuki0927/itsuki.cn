'use client';

import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote';
import React from 'react';
import { StandardProps } from '@/types/common';
import { getBlogHeadingElementId } from '@/constants/anchor';

interface BlogContentProps {
  source: MDXRemoteProps;
}

export const Heading = ({ children }: StandardProps) => {
  const id = getBlogHeadingElementId(String(children));
  return (
    <h2 id={id} className='relative mt-24 mb-8 -scroll-mt-32 text-2xl font-medium'>
      {children}
    </h2>
  );
};

export const Subheading = ({ children }: StandardProps) => {
  const id = getBlogHeadingElementId(String(children));
  return (
    <h3 id={id} className='mt-8 mb-4 -scroll-mt-12 text-xl font-normal'>
      {children}
    </h3>
  );
};

const components = {
  h2: Heading,
  h3: Subheading,
};

const BlogContent = ({ source }: BlogContentProps) => {
  return <MDXRemote {...source} components={components} />;
};

export default BlogContent;
