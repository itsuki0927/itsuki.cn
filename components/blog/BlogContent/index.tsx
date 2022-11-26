'use client';

import { MDXRemote } from 'next-mdx-remote';
import React from 'react';

interface BlogContentProps {
  source: any;
}

const components = {
  a: () => <a className='text-primary'>fdsfsdfs</a>,
};

const BlogContent = ({ source }: BlogContentProps) => {
  return <MDXRemote {...source} components={components} />;
};

export default BlogContent;
