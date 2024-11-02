import type { MDXRemoteProps } from 'next-mdx-remote/rsc';
import { MDXRemote } from 'next-mdx-remote/rsc';
import markdownComponents from '../markdown';
import PageSection from '@/app/blog/[slug]/components/PageSection';

export const customMdxComponents = {
  // Image,
  PageSection,
  /* Sandbox, */
};

const MdxContent = ({ components, ...rest }: MDXRemoteProps) => {
  return (
    <MDXRemote
      {...rest}
      components={{
        ...markdownComponents,
        ...customMdxComponents,
        ...components,
      }}
    />
  );
};

export default MdxContent;
