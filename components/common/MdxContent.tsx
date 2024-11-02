'use client';

import type { MDXRemoteProps } from 'next-mdx-remote';
import { MDXRemote } from 'next-mdx-remote';
import { Suspense } from 'react';
import markdownComponents from '../markdown';
import PageSection from '@/app/blog/[slug]/components/PageSection';

export const customMdxComponents = {
  // Image,
  PageSection,
  /* Sandbox, */
};

const MdxContent = ({ components, ...rest }: MDXRemoteProps) => {
  return (
    <Suspense fallback={<div className="w-28 h-60">Loading</div>}>
      <MDXRemote
        {...rest}
        components={{
          ...markdownComponents,
          ...customMdxComponents,
          ...components,
        }}
      />
    </Suspense>
  );
};

export default MdxContent;
