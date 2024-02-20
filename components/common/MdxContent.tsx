import type { MDXRemoteProps } from 'next-mdx-remote/rsc';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Suspense } from 'react';
import markdownComponents from '../markdown';

const MdxContent = ({ components, ...rest }: MDXRemoteProps) => {
  return (
    <Suspense fallback={<div className="w-28 h-60">Loading</div>}>
      <MDXRemote
        {...rest}
        components={{
          ...markdownComponents,
          ...components,
        }}
      />
    </Suspense>
  );
};

export default MdxContent;
